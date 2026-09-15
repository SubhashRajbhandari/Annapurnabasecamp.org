import { supabase, isSupabaseConfigured } from '../lib/supabase';
import type { PackageTier, PorterOption } from '../types/trek';

export interface CreateBookingInput {
  tier: PackageTier;
  porterOption: PorterOption;
  groupSize: number;
  startDate: string;
  heliReturn: boolean;
  gearRental: boolean;
  satelliteDevice: boolean;
  privateJeep: boolean;
  currency: 'USD' | 'NPR';
  basePrice: number;
  addOnPrice: number;
  totalPrice: number;
  
  // Lead Trekker Details
  fullName: string;
  email: string;
  phone: string;
  nationality: string;
  dietary?: string;
  specialRequests?: string;
  
  // Documents
  passportFile?: File | null;
  insuranceFile?: File | null;
}

export interface BookingResult {
  success: boolean;
  bookingCode: string;
  bookingId?: string;
  error?: string;
  isMock: boolean;
  passportUrl?: string | null;
  insuranceUrl?: string | null;
}

/**
 * Uploads a permit document (passport or insurance scan) to Supabase Storage
 */
export async function uploadPermitDocument(
  file: File,
  bookingCode: string,
  docType: 'passport' | 'insurance'
): Promise<{ url: string | null; error: string | null }> {
  if (!isSupabaseConfigured) {
    // In mock mode, simulate a storage URL
    const mockUrl = `https://mock-storage.annapurnabasecamp.org/permit-documents/${bookingCode}/${docType}-${file.name}`;
    return { url: mockUrl, error: null };
  }

  try {
    const fileExt = file.name.split('.').pop() || 'jpg';
    const filePath = `${bookingCode}/${docType}_${Date.now()}.${fileExt}`;

    const { error: uploadError } = await supabase.storage
      .from('permit-documents')
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: true
      });

    if (uploadError) {
      console.warn(`[Supabase Storage] Document upload error:`, uploadError);
      return { url: null, error: uploadError.message };
    }

    const { data: urlData } = supabase.storage
      .from('permit-documents')
      .getPublicUrl(filePath);

    return { url: urlData.publicUrl, error: null };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Upload failed';
    return { url: null, error: message };
  }
}

/**
 * Creates an expedition reservation and registers lead trekker in Supabase
 */
export async function createBooking(input: CreateBookingInput): Promise<BookingResult> {
  const year = new Date().getFullYear();
  const randomSuffix = Math.floor(1000 + Math.random() * 9000);
  const bookingCode = `ABC-${year}-${randomSuffix}`;

  // 1. Handle Document Uploads if attached
  let passportUrl: string | null = null;
  let insuranceUrl: string | null = null;

  if (input.passportFile) {
    const { url } = await uploadPermitDocument(input.passportFile, bookingCode, 'passport');
    passportUrl = url;
  }

  if (input.insuranceFile) {
    const { url } = await uploadPermitDocument(input.insuranceFile, bookingCode, 'insurance');
    insuranceUrl = url;
  }

  // 2. Real Supabase Insertion Mode
  if (isSupabaseConfigured) {
    try {
      // Map frontend 'shared-1-2' to database constraint 'standard-1-2'
      const porterDbValue = (input.porterOption as string) === 'shared-1-2' ? 'standard-1-2' : input.porterOption;

      // Insert Booking
      const { data: bookingData, error: bookingError } = await supabase
        .from('bookings')
        .insert([
          {
            booking_code: bookingCode,
            tier: input.tier,
            porter_option: porterDbValue,
            group_size: input.groupSize,
            start_date: input.startDate,
            heli_return: input.heliReturn,
            gear_rental: input.gearRental,
            satellite_device: input.satelliteDevice,
            private_jeep: input.privateJeep,
            currency: input.currency,
            base_price: input.basePrice,
            add_on_price: input.addOnPrice,
            total_price: input.totalPrice,
            payment_status: 'pending',
            expedition_status: 'confirmed',
            lead_name: input.fullName,
            lead_email: input.email,
            lead_phone: input.phone,
            lead_nationality: input.nationality,
            dietary_preferences: input.dietary || 'Standard Himalayan Full Board',
            special_requests: input.specialRequests || ''
          }
        ])
        .select()
        .single();

      if (bookingError) {
        console.error('[Supabase DB] Error inserting booking:', bookingError);
        return {
          success: false,
          bookingCode,
          error: bookingError.message,
          isMock: false
        };
      }

      // Insert Lead Expedition Member
      const { error: memberError } = await supabase
        .from('expedition_members')
        .insert([
          {
            booking_id: bookingData.id,
            is_lead: true,
            full_name: input.fullName,
            email: input.email,
            phone: input.phone,
            nationality: input.nationality,
            passport_document_url: passportUrl,
            insurance_document_url: insuranceUrl,
            dietary_requirements: input.dietary || 'Standard Himalayan Full Board'
          }
        ]);

      if (memberError) {
        console.warn('[Supabase DB] Member insertion warning:', memberError);
      }

      return {
        success: true,
        bookingCode,
        bookingId: bookingData.id,
        isMock: false,
        passportUrl,
        insuranceUrl
      };
    } catch (err: unknown) {
      console.error('[Supabase DB] Unexpected exception:', err);
      const msg = err instanceof Error ? err.message : 'Database communication failure';
      return {
        success: false,
        bookingCode,
        error: msg,
        isMock: false
      };
    }
  }

  // 3. Graceful Mock Fallback Mode (Runs when no API keys are present yet)
  await new Promise((resolve) => setTimeout(resolve, 800)); // Simulate realistic network round-trip

  const mockPayload = {
    bookingCode,
    ...input,
    passportUrl,
    insuranceUrl,
    createdAt: new Date().toISOString()
  };

  try {
    localStorage.setItem('annapurna_latest_booking', JSON.stringify(mockPayload));
  } catch {
    // safe storage ignore
  }

  return {
    success: true,
    bookingCode,
    isMock: true,
    passportUrl,
    insuranceUrl
  };
}

/**
 * Fetches an existing booking by its unique booking reference code
 */
export async function fetchBookingByCode(bookingCode: string) {
  if (!isSupabaseConfigured) {
    try {
      const stored = localStorage.getItem('annapurna_latest_booking');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed.bookingCode === bookingCode) {
          return { data: parsed, error: null };
        }
      }
    } catch {
      // fallback
    }
    return { data: null, error: 'Booking not found in local mock state' };
  }

  const { data, error } = await supabase
    .from('bookings')
    .select(`
      *,
      expedition_members (*)
    `)
    .eq('booking_code', bookingCode)
    .single();

  return { data, error: error?.message || null };
}
