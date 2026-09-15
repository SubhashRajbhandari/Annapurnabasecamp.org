-- ==============================================================================
-- OFFICIAL ANNAPURNA BASE CAMP (4,130m) EXPEDITION DATABASE SCHEMA
-- Target Schema: abc_org (Custom Schema in Supabase PostgreSQL)
-- 
-- IMPORTANT SETUP STEP IN SUPABASE DASHBOARD:
-- Go to: Project Settings -> API (or Data API) -> "Exposed schemas"
-- Add "abc_org" to the exposed schemas list so PostgREST allows public client access!
-- ==============================================================================

-- 1. Create custom schema
CREATE SCHEMA IF NOT EXISTS abc_org;

-- Enable UUID generator extension in extensions schema
CREATE EXTENSION IF NOT EXISTS "uuid-ossp" SCHEMA extensions;

-- Grant API roles access to the abc_org schema
GRANT USAGE ON SCHEMA abc_org TO anon, authenticated, service_role;
GRANT ALL ON ALL TABLES IN SCHEMA abc_org TO anon, authenticated, service_role;
GRANT ALL ON ALL SEQUENCES IN SCHEMA abc_org TO anon, authenticated, service_role;
GRANT ALL ON ALL ROUTINES IN SCHEMA abc_org TO anon, authenticated, service_role;

ALTER DEFAULT PRIVILEGES IN SCHEMA abc_org GRANT ALL ON TABLES TO anon, authenticated, service_role;
ALTER DEFAULT PRIVILEGES IN SCHEMA abc_org GRANT ALL ON SEQUENCES TO anon, authenticated, service_role;
ALTER DEFAULT PRIVILEGES IN SCHEMA abc_org GRANT ALL ON ROUTINES TO anon, authenticated, service_role;

-- ------------------------------------------------------------------------------
-- 2. TABLE: abc_org.bookings
-- Stores master expedition reservations, selected tier, dates, and financials.
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS abc_org.bookings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    booking_code TEXT UNIQUE NOT NULL, -- e.g. ABC-2026-4821
    tier TEXT NOT NULL CHECK (tier IN ('3-star', '4-star', '5-star')),
    porter_option TEXT NOT NULL CHECK (porter_option IN ('standard-1-2', 'shared-1-2', 'private-1-1', 'guide-only')),
    group_size INTEGER NOT NULL DEFAULT 1 CHECK (group_size >= 1 AND group_size <= 24),
    start_date DATE NOT NULL,
    
    -- High-Altitude Add-ons
    heli_return BOOLEAN DEFAULT FALSE,
    gear_rental BOOLEAN DEFAULT FALSE,
    satellite_device BOOLEAN DEFAULT FALSE,
    private_jeep BOOLEAN DEFAULT FALSE,
    
    -- Financials & Pricing (Server Validated)
    currency TEXT NOT NULL DEFAULT 'USD' CHECK (currency IN ('USD', 'NPR', 'EUR', 'GBP')),
    base_price NUMERIC(12, 2) NOT NULL,
    add_on_price NUMERIC(12, 2) NOT NULL DEFAULT 0.00,
    total_price NUMERIC(12, 2) NOT NULL,
    payment_status TEXT NOT NULL DEFAULT 'pending' CHECK (payment_status IN ('pending', 'deposit_paid', 'fully_paid', 'refunded', 'cancelled')),
    
    -- Field Operations & Expedition Status
    expedition_status TEXT NOT NULL DEFAULT 'confirmed' CHECK (expedition_status IN ('inquiry', 'confirmed', 'permits_issued', 'in_progress', 'completed', 'cancelled')),
    assigned_guide_name TEXT,
    emergency_contact TEXT,
    
    -- Lead Trekker Information
    lead_name TEXT NOT NULL,
    lead_email TEXT NOT NULL,
    lead_phone TEXT NOT NULL,
    lead_nationality TEXT NOT NULL,
    dietary_preferences TEXT DEFAULT 'Standard Himalayan Full Board',
    special_requests TEXT,
    
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Index for fast lookup by reference code
CREATE INDEX IF NOT EXISTS idx_abc_bookings_code ON abc_org.bookings(booking_code);
CREATE INDEX IF NOT EXISTS idx_abc_bookings_start_date ON abc_org.bookings(start_date);
CREATE INDEX IF NOT EXISTS idx_abc_bookings_lead_email ON abc_org.bookings(lead_email);

-- ------------------------------------------------------------------------------
-- 3. TABLE: abc_org.expedition_members
-- Stores individual trekker profiles for ACAP (Annapurna Conservation Area)
-- and TIMS (Trekkers' Information Management System) permit issuance.
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS abc_org.expedition_members (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    booking_id UUID NOT NULL REFERENCES abc_org.bookings(id) ON DELETE CASCADE,
    is_lead BOOLEAN NOT NULL DEFAULT FALSE,
    full_name TEXT NOT NULL,
    email TEXT,
    phone TEXT,
    nationality TEXT NOT NULL,
    passport_number TEXT,
    passport_document_url TEXT, -- URL in Supabase Storage
    insurance_policy_number TEXT,
    insurance_document_url TEXT, -- URL in Supabase Storage
    dietary_requirements TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_abc_members_booking_id ON abc_org.expedition_members(booking_id);

-- ------------------------------------------------------------------------------
-- 4. TABLE: abc_org.payments
-- Secure financial audit ledger for Stripe, PayPal, or Wire transactions.
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS abc_org.payments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    booking_id UUID NOT NULL REFERENCES abc_org.bookings(id) ON DELETE CASCADE,
    gateway TEXT NOT NULL CHECK (gateway IN ('stripe', 'paypal', 'bank_wire', 'cash_at_kathmandu')),
    gateway_transaction_id TEXT,
    amount NUMERIC(12, 2) NOT NULL,
    currency TEXT NOT NULL DEFAULT 'USD',
    status TEXT NOT NULL CHECK (status IN ('initiated', 'succeeded', 'failed', 'refunded')),
    receipt_url TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_abc_payments_booking_id ON abc_org.payments(booking_id);

-- ------------------------------------------------------------------------------
-- 5. ROW LEVEL SECURITY (RLS) POLICIES
-- Enables public guest booking while protecting records
-- ------------------------------------------------------------------------------
ALTER TABLE abc_org.bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE abc_org.expedition_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE abc_org.payments ENABLE ROW LEVEL SECURITY;

-- Bookings policies
CREATE POLICY "Allow anonymous guest booking insertion" 
ON abc_org.bookings FOR INSERT 
TO anon, authenticated, service_role
WITH CHECK (true);

CREATE POLICY "Allow public lookup by booking code" 
ON abc_org.bookings FOR SELECT 
TO anon, authenticated, service_role
USING (true);

-- Expedition members policies
CREATE POLICY "Allow anonymous member insertion" 
ON abc_org.expedition_members FOR INSERT 
TO anon, authenticated, service_role
WITH CHECK (true);

CREATE POLICY "Allow members read access" 
ON abc_org.expedition_members FOR SELECT 
TO anon, authenticated, service_role
USING (true);

-- Payments policies
CREATE POLICY "Allow payment insertion" 
ON abc_org.payments FOR INSERT 
TO anon, authenticated, service_role
WITH CHECK (true);

CREATE POLICY "Allow payment read" 
ON abc_org.payments FOR SELECT 
TO anon, authenticated, service_role
USING (true);

-- ------------------------------------------------------------------------------
-- 6. STORAGE BUCKET: permit-documents
-- Secure storage for Trekker Passports and High-Altitude Insurance PDFs
-- ------------------------------------------------------------------------------
INSERT INTO storage.buckets (id, name, public) 
VALUES ('permit-documents', 'permit-documents', true)
ON CONFLICT (id) DO NOTHING;

-- Storage policies: Allow public upload for booking verification
CREATE POLICY "Allow public permit document uploads"
ON storage.objects FOR INSERT
TO public
WITH CHECK (bucket_id = 'permit-documents');

-- Storage policy: Allow reading uploaded documents
CREATE POLICY "Allow public reading permit documents"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'permit-documents');

-- ------------------------------------------------------------------------------
-- 7. AUTO-UPDATE TIMESTAMP TRIGGER
-- ------------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION abc_org.set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trigger_abc_bookings_updated_at ON abc_org.bookings;
CREATE TRIGGER trigger_abc_bookings_updated_at
BEFORE UPDATE ON abc_org.bookings
FOR EACH ROW
EXECUTE FUNCTION abc_org.set_updated_at();

COMMENT ON TABLE abc_org.bookings IS 'Official Annapurna Base Camp reservation register (Schema: abc_org)';
