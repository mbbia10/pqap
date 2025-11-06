import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://hozjiergtcnfefwhlmsc.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhvemppZXJndGNuZmVmd2hsbXNjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI0NDU1MzUsImV4cCI6MjA3ODAyMTUzNX0.3OnepGfr5xeAa7i5ty7a9sJFmnXnlN2UGHueExezZOY';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
