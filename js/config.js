// js/config.js
// ============================================================
// ENVIRONMENT VARIABLES
// For local dev: replace values below directly (don't commit!)
// For Vercel: add these in Vercel Dashboard → Project → Settings → Environment Variables
// ============================================================

const CONFIG = {
  SUPABASE_URL: window.ENV_SUPABASE_URL,
  SUPABASE_ANON_KEY: window.ENV_SUPABASE_ANON_KEY,
  ADMIN_EMAIL: window.ENV_ADMIN_EMAIL,

  // EmailJS (free tier) for sending book upload requests to admin
  // Sign up at emailjs.com and create a service + template
  EMAILJS_SERVICE_ID: window.ENV_EMAILJS_SERVICE_ID,
  EMAILJS_TEMPLATE_ID: window.ENV_EMAILJS_TEMPLATE_ID,
  EMAILJS_PUBLIC_KEY: window.ENV_EMAILJS_PUBLIC_KEY,
};

// Initialize Supabase client
const { createClient } = supabase;
const supabaseClient = createClient(CONFIG.SUPABASE_URL, CONFIG.SUPABASE_ANON_KEY);

export { CONFIG, supabaseClient };
