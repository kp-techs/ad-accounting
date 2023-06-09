import { createClient, Session } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import { TableIncome } from "../types/models";
import { Database } from "../types/supabase";

export const supabase = createClient<Database>(
  process.env.REACT_APP_SUPABASE_URL || "",
  process.env.REACT_APP_SUPABASE_KEY || ""
);

export const useSupabase = () => {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then((response) => {
      const { session } = response.data;
      setSession(session);
    });

    const { data } = supabase.auth.onAuthStateChange((_, session) => {
      setSession(session);
    });

    return () => data.subscription.unsubscribe();
  }, []);

  return { supabase, session };
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

export async function loadDetails(rowId: number) {
  const { data } = await supabase.from("incomes").select("*").eq("id", 48);

  return { data: data || [] };
}
