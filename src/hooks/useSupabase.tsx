import { createClient, Session } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import { TableIncome, TableOutgoing } from "../types/models";
import { Database } from "../types/supabase";
import { generateFilterString } from "../utils/helper";

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

export async function fetchIncomes(
	page: number,
	size: number,
	filters: IncomesFilters
) {
	const from = (page - 1) * size;
	const to = from + size;

	let query = supabase
		.from("incomes")
		.select(`*, incomeTypes(*), ministries(*),  tithing(*)`, { count: "exact" })
		.range(from, to);

	const mappedFilters = generateFilterString(filters);
	mappedFilters.forEach((filter) => {
		if (filter) {
			query = query.or(filter);
		}
	});

	const { data, count } = await query.returns<TableIncome[]>();

	return { data: data || [], count: count || 0 };
}

export async function fetchUsers() {
	const { data } = await supabase.from("users").select("*");
	return data;
}

export async function fetchProfile(id: string) {
	const { data } = await supabase
		.from("users")
		.select("*")
		.eq("id", id)
		.single();
	return data;
}

export async function fetchOuts(page: number, size: number) {
	// TO DO: poner filtros
	const from = (page - 1) * size;
	const to = from + size;

	let query = supabase
		.from("outgoings")
		.select(`*, outgoingTypes(*), beneficiaries(*), loans(*), creditors(*)`, {
			count: "exact"
		})
		.range(from, to);

	const { data, count } = await query.returns<TableOutgoing[]>();

	return { data: data || [], count: count || 0 };
}

export async function fetchOuts(page: number, size: number) {
  // TO DO: poner filtros
  const from = (page - 1) * size;
  const to = from + size;

  let query = supabase
    .from("outgoings")
    .select(`*, outgoingTypes(*), beneficiaries(*), loans(*), creditors(*)`, { count: "exact" })
    .range(from, to);
  
    const { data, count } = await query.returns<TableOutgoing[]>();

  return { data: data || [], count: count || 0 };
  
}
