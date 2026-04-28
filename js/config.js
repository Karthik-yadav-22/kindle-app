// js/config.js
// ============================================================
// ENVIRONMENT VARIABLES
// For local dev: replace placeholder values below (don't commit with real values!)
// For Vercel: add these in Vercel Dashboard → Project → Settings → Environment Variables
// ============================================================

// Fallback values for local development (replace with your actual values)
const FALLBACK_CONFIG = {
  SUPABASE_URL: 'https://your-project.supabase.co',
  SUPABASE_ANON_KEY: 'your-anon-key-here',
  ADMIN_EMAIL: 'admin@example.com',
  EMAILJS_SERVICE_ID: 'your-service-id',
  EMAILJS_TEMPLATE_ID: 'your-template-id',
  EMAILJS_PUBLIC_KEY: 'your-public-key'
};

// Get config from window.ENV (set by Vercel) or use fallback
const getEnvVar = (key, fallback) => {
  if (typeof window !== 'undefined' && window.ENV && window.ENV[key] !== undefined) {
    return window.ENV[key];
  }
  return fallback;
};

const CONFIG = {
  SUPABASE_URL: getEnvVar('SUPABASE_URL', FALLBACK_CONFIG.SUPABASE_URL),
  SUPABASE_ANON_KEY: getEnvVar('SUPABASE_ANON_KEY', FALLBACK_CONFIG.SUPABASE_ANON_KEY),
  ADMIN_EMAIL: getEnvVar('ADMIN_EMAIL', FALLBACK_CONFIG.ADMIN_EMAIL),
  EMAILJS_SERVICE_ID: getEnvVar('EMAILJS_SERVICE_ID', FALLBACK_CONFIG.EMAILJS_SERVICE_ID),
  EMAILJS_TEMPLATE_ID: getEnvVar('EMAILJS_TEMPLATE_ID', FALLBACK_CONFIG.EMAILJS_TEMPLATE_ID),
  EMAILJS_PUBLIC_KEY: getEnvVar('EMAILJS_PUBLIC_KEY', FALLBACK_CONFIG.EMAILJS_PUBLIC_KEY),
};

// Validate config
if (CONFIG.SUPABASE_URL.includes('your-project') || CONFIG.SUPABASE_ANON_KEY.includes('your-')) {
  console.warn('⚠️ Please configure your Supabase credentials in js/config.js or Vercel environment variables');
}

// Initialize Supabase client
const { createClient } = supabase;
const supabaseClient = createClient(CONFIG.SUPABASE_URL, CONFIG.SUPABASE_ANON_KEY);

export { CONFIG, supabaseClient };
