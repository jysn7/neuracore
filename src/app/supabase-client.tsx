import { createClient } from "@/app/lib/supabase/client";

// Create a single instance of the Supabase client for client components
export const supabase = createClient();

