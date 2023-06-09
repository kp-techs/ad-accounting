import { createClient } from "@supabase/supabase-js";
import { TableIncome } from "../types/models";
import { Database } from "../types/supabase";

export const supabase = createClient<Database>(
  process.env.REACT_APP_SUPABASE_URL || "",
  process.env.REACT_APP_SUPABASE_KEY || ""
);

export const useSupabase = () => {
  return { supabase };
};

export async function fetchIncomes() {
  const { data } = await supabase
    .from("incomes")
    .select(`*, incomeTypes(*), ministries(*),  tithing(*)`)
    .returns<TableIncome[]>();

  return data || [];
}
