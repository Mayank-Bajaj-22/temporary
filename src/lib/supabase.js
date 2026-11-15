import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const isSupabaseConfigured = () => {
  return Boolean(
    supabaseUrl &&
    supabaseAnonKey &&
    !supabaseUrl.includes('your-project-id') &&
    !supabaseAnonKey.includes('your-supabase-anon-key')
  );
};

if (!isSupabaseConfigured()) {
  console.info(
    'ℹ️ Supabase credentials not found or using placeholders. ' +
    'The application is running in hybrid mode with local fallback data. ' +
    'Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to .env to connect your database.'
  );
}

// Fallback dummy URL to prevent createClient from throwing if unconfigured during initial dev
const validUrl = isSupabaseConfigured() ? supabaseUrl : 'https://placeholder-project.supabase.co';
const validKey = isSupabaseConfigured() ? supabaseAnonKey : 'placeholder-anon-key';

export const supabase = createClient(validUrl, validKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
  },
});
