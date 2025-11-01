// Initialize Supabase client
const SUPABASE_URL = "https://ccvoqovwmlavzwbnfcyf.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNjdm9xb3Z3bWxhdnp3Ym5mY3lmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjEzMzYwNDksImV4cCI6MjA3NjkxMjA0OX0.E361vz_2OhfWssiGHHQW9LlIUQu40y7ep2DyAEgvcVI";

const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
