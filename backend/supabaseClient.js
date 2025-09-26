// backend/supabaseClient.js
import dotenv from "dotenv";
import path from "path";
dotenv.config({ path: path.resolve("./.env") }); // Ensure .env is loaded
import { createClient } from "@supabase/supabase-js";

// Use environment variables for security
const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
  throw new Error("Supabase URL or Service Key is missing. Make sure they're set in your .env file.");
}

export const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);