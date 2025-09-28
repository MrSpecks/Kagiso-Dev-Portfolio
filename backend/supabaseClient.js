import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";
dotenv.config();

// Read from environment variables
const { SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY } = process.env;

if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
  throw new Error(
    "❌ Supabase URL or Service Role Key is missing. Make sure they are set in your environment variables."
  );
}

export const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);
