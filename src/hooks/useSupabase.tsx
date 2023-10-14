import { createClient, Session } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import { TableIncome, TableOutgoing } from "../types/models";
import { Database } from "../types/supabase";
import {
  getIncomeFilterString,
  getLoanFilterString,
  getMonth,
  getMonthAndYear,
  getOutgoingFilterString,
  getPaymentFilterString,
} from "../utils/helper";
import { incomeTypeID } from "../pages/incomes/constants";
import moment from "moment";

export const supabase = createClient<Database>(
  process.env.REACT_APP_SUPABASE_URL || "",
  process.env.REACT_APP_SUPABASE_KEY || ""
);

export const useSupabase = () => {
  const [session, setSession] = useState<Session | null | undefined>(undefined);

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

export async function fetchIncomes(
  page: number,
  size: number,
  filters: IncomesFilters
) {
  const from = (page - 1) * size;
  const to = from + size;

  let query = supabase
    .from("incomes")
    .select(`*, incomeTypes(*), ministries(*),  people(*)`, {
      count: "exact",
    })
    .order("date", { ascending: false })
    .range(from, to);

  const mappedFilters = getIncomeFilterString(filters);
  mappedFilters.forEach((filter) => {
    if (filter) {
      query = query.or(filter);
    }
  });

  const { data, count } = await query.returns<TableIncome[]>();

  return { data: data || [], count: count || 0 };
}

export async function fetchUsers() {
  const { data, count } = await supabase
    .from("users")
    .select("*", { count: "exact" })
    .eq("active", true)
    .order("last_sign_in_at", { ascending: false });
  return { data, count };
}

export async function fetchProfile(id: string) {
  const { data } = await supabase
    .from("users")
    .select("*")
    .eq("id", id)
    .single();
  return data;
}

export async function fetchOuts(
  page: number,
  size: number,
  filters: OutgoingsFilters
) {
  const from = (page - 1) * size;
  const to = from + size;

  let query = supabase
    .from("outgoings")
    .select(`*, outgoingTypes(*), people(*), incomes(*)`, {
      count: "exact",
    })
    .order("date", { ascending: false })
    .range(from, to);

  const mappedFilters = getOutgoingFilterString(filters);
  mappedFilters.forEach((filter) => {
    if (filter) {
      query = query.or(filter);
    }
  });

  const { data, count } = await query.returns<TableOutgoing[]>();

  return { data: data || [], count: count || 0 };
}

export async function fetchLoans(
  page: number,
  size: number,
  filters: LoansFilters
) {
  const from = (page - 1) * size;
  const to = from + size;

  let query = supabase
    .from("incomes")
    .select("*, people(*)", {
      count: "exact",
    })
    .range(from, to)
    .eq("type", incomeTypeID.loan);

  const mappedFilters = getLoanFilterString(filters);
  mappedFilters.forEach((filter) => {
    if (filter) {
      query = query.or(filter);
    }
  });

  const { data, count } = await query.returns<TableIncome[]>();

  return { data: data || [], count: count || 0 };
}

export async function fetchPayments(
  page: number,
  size: number,
  filters: PaymentsFilters,
  loanID: number
) {
  const from = (page - 1) * size;
  const to = from + size;

  let query = supabase
    .from("outgoings")
    .select("*", {
      count: "exact",
    })
    .range(from, to)
    .eq("type", incomeTypeID.loan);

  const mappedFilters = getPaymentFilterString(filters);
  mappedFilters.forEach((filter) => {
    if (filter) {
      query = query.or(filter);
    }
  });

  const { data, count } = await query.returns<TableOutgoing[]>();

  return { data: data || [], count: count || 0 };
}

export async function getTotalAmount(
  table: string,
  columnName: string = "amount",
  initialDate?: string,
  endDate?: string
) {
  const { data } = await supabase.rpc("total_amount", {
    table_name: table,
    column_name: columnName,
    start_date: initialDate,
    end_date: endDate,
  });
  return data;
}

export async function getTotalByMonth(table: string) {
  const { data } = await supabase.rpc("total_by_month", { table_name: table });
  return data || [];
}

export async function getHistoricChart(tables: ChartConfig[]) {
  const tablesData: AmoutHistory[][] = await Promise.all(
    tables.map((item) => getTotalByMonth(item.table))
  );


  const allMonths = Array.from(
    new Set(
      tablesData.flatMap((data) => data.map((item: AmoutHistory) => item.month))
    )
  ).sort((a, b) => +new Date(a) - +new Date(b));
  const labels = allMonths.map((month) => getMonthAndYear(new Date(month)));
  const datasets = tablesData.map((data, index) => {
    return {
      ...tables[index],
      data: allMonths.map((month) => {
        const monthData = data.find((item) => item.month === month);
        return monthData?.amount || 0;
      }),
    };
  });

  return { labels, datasets };
}
