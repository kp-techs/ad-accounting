import { createClient, Session } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import { TableIncome } from "../types/models";
import { Database } from "../types/supabase";

const supabase = createClient<Database>(
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

export async function fetchIncomes() {
  const { data } = await supabase
    .from("incomes")
    .select(`*, incomeTypes(*), ministries(*),  tithing(*)`)
    .returns<TableIncome[]>();

  return data || [];
}
