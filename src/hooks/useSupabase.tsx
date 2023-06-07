import { createClient } from "@supabase/supabase-js";
import { TableIncome } from "../types/models";
import { Database } from "../types/supabase";

const supabase = createClient<Database>(
  process.env.REACT_APP_SUPABASE_URL || "",
  process.env.REACT_APP_SUPABASE_KEY || ""
);

export const useSupabase = () => {
  return { supabase };
};

export async function fetchIncomes(page: number, size: number) {
  const from = (page - 1) * size;
  const to = from + size;

  const { data, count } = await supabase
    .from("incomes")
    .select(`*, incomeTypes(*), ministries(*),  tithing(*)`, { count: "exact" })
    .range(from, to)
    .returns<TableIncome[]>();
  return { data: data || [], count: count || 0 };
}
