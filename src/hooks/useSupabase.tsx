import { createClient } from "@supabase/supabase-js";
import { Database } from "../types/supabase";

const supabase = createClient<Database>(
  process.env.REACT_APP_SUPABASE_URL || "",
  process.env.REACT_APP_SUPABASE_KEY || ""
);

export const useSupabase = () => {
  return { supabase };
};
