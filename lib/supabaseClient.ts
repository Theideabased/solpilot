import { createClient } from "@supabase/supabase-js";

// Lazy initialization to avoid errors during build time
let supabaseInstance: ReturnType<typeof createClient> | null = null;

function getSupabaseClient() {
  if (supabaseInstance) {
    return supabaseInstance;
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  // During build time, return a mock client
  if (!supabaseUrl || !supabaseAnonKey) {
    console.warn("Supabase environment variables not set - using mock client for build");
    return {
      from: () => ({
        select: () => Promise.resolve({ data: [], error: null }),
        insert: () => Promise.resolve({ data: [], error: null }),
        update: () => Promise.resolve({ data: [], error: null }),
        delete: () => Promise.resolve({ data: [], error: null }),
      }),
      auth: {
        getSession: () => Promise.resolve({ data: { session: null }, error: null }),
      },
    } as any;
  }

  supabaseInstance = createClient(supabaseUrl, supabaseAnonKey);
  return supabaseInstance;
}

export const supabase = getSupabaseClient();

