# Supabase Backend Setup Guide — Annapurnabasecamp.org (Schema: `abc_org`)

This project is configured to use **Supabase** (PostgreSQL, Storage, and Edge Functions) targeting your custom database schema: **`abc_org`**.

---

## ⚡ Step 1: Run the Database Migration in `abc_org`

1. In your Supabase Dashboard, click the **SQL Editor** tab on the left navigation bar.
2. Click **New query**.
3. Open `supabase/schema.sql` from this codebase, copy all its contents, paste it into the editor, and click **Run**.
4. This script will:
   - Create schema `abc_org` (if it does not exist).
   - Grant table & sequence privileges on `abc_org` to `anon`, `authenticated`, and `service_role`.
   - Create `abc_org.bookings`, `abc_org.expedition_members`, and `abc_org.payments`.
   - Configure Row Level Security (RLS) policies on all `abc_org` tables.
   - Configure the `permit-documents` storage bucket for passport scans & insurance PDFs.

---

## ⚙️ Step 2: Expose `abc_org` in Supabase API Settings (CRITICAL)

Because Supabase defaults to exposing only the `public` schema over REST, you must enable `abc_org`:

1. In your Supabase Dashboard, navigate to:
   **Project Settings** (gear icon) -> **API** (or **Data API**).
2. Look for **"Exposed schemas"** (by default it shows `public`).
3. Add **`abc_org`** to the comma-separated list so it reads:
   ```
   public, abc_org
   ```
4. Click **Save**. PostgREST will automatically reload and allow client queries to `abc_org`.

---

## 🔑 Step 3: Connect to the Frontend

1. In your Supabase Dashboard, go to **Project Settings** -> **API**.
2. Copy your **Project URL** and **anon public Key**.
3. In the project root directory, create `.env.local`:
   ```env
   VITE_SUPABASE_URL=https://your-project-id.supabase.co
   VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   ```
4. Restart your Vite dev server (`npm run dev`).
   The frontend automatically connects to `abc_org` via the pre-configured `db: { schema: 'abc_org' }` client setting.

---

## 🚀 Step 4: Deploy Edge Functions (Optional for Stripe & Resend)

```bash
# 1. Login to Supabase CLI
npx supabase login

# 2. Link to your project
npx supabase link --project-ref <your-project-ref>

# 3. Set your production API secrets
npx supabase secrets set STRIPE_SECRET_KEY=sk_live_... RESEND_API_KEY=re_...

# 4. Deploy functions
npx supabase functions deploy create-checkout
npx supabase functions deploy dispatch-notification
```

---

## 🛡️ Privacy & Compliance
- Passports and travel insurance documents are stored in the dedicated `permit-documents` bucket under expedition reference hashes (`ABC-2026-XXXX`).
- Customer records are isolated within the `abc_org` schema and protected by Row Level Security.
