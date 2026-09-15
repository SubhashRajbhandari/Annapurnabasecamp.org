import { createClient } from '@supabase/supabase-js';

export const SUPABASE_SCHEMA = 'abc_org';

const rawUrl = import.meta.env.VITE_SUPABASE_URL || '';
// Strip any trailing /rest/v1 or trailing slash
const supabaseUrl = rawUrl.replace(/\/rest\/v1\/?$/, '').replace(/\/+$/, '');
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY || '';

/**
 * Checks if Supabase credentials are provided and valid
 */
export const isSupabaseConfigured = Boolean(
  supabaseUrl &&
  supabaseAnonKey &&
  !supabaseUrl.includes('your-project-id') &&
  supabaseUrl.startsWith('https://')
);

/**
 * Supabase client singleton configured with custom schema 'abc_org'
 */
export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey, {
      db: {
        schema: SUPABASE_SCHEMA
      }
    })
  : createClient('https://placeholder.supabase.co', 'placeholder-anon-key', {
      db: {
        schema: SUPABASE_SCHEMA
      },
      auth: {
        persistSession: false,
        autoRefreshToken: false,
        detectSessionInUrl: false
      }
    });
