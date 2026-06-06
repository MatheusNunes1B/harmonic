import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://vibyzyzqjldrnfewqokt.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZpYnl6eXpxamxkcm5mZXdxb2t0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODA0MTExMTQsImV4cCI6MjA5NTk4NzExNH0.m5L7buU6xe3gZ1zkGBQ4nC0bafC1R4s6743-JQ8hhkA';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
