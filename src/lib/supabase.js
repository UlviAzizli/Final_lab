import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://hjwlaqlowqbajbotdfxb.supabase.co";
const supabaseAnonkey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imhqd2xhcWxvd3FiYWpib3RkZnhiIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTMwNjE1NjQsImV4cCI6MjAwODYzNzU2NH0.ufbZi9bpU6Ekou7JXwjubImEThHRZdw4jvGugEn2RGY";

export default createClient(supabaseUrl, supabaseAnonkey);
