import AppContext from "../contexts/app";
import { useContext, useEffect, useCallback } from "react";
import {
	fetchIncomes,
	fetchLoans,
	fetchOuts,
	fetchProfile,
	fetchUsers,
	useSupabase
} from "../hooks/useSupabase";
import { filterInitialValues } from "../pages/incomes/constants";
import { outgoingsInitialValues } from "../pages/outgoings/constants";
import { loansInitialFilterValues } from "../pages/loans/constant";


function useAppData() {
	const context = useContext(AppContext);
	if (!context) {
		throw new Error(`useAppData must be used inside a AppProvider`);
	}

	const { session } = useSupabase();
	const {
		users,
		setUsers,
		profile,
		setProfile,
		incomes,
		setIncomes,
		outgoings,
		setOuts,
		loans,
		setLoans 

	} = context;

	const loadProfile = useCallback(async () => {
		if (session) {
			const data = await fetchProfile(session.user.id);
			setProfile(data);
		} else {
			setProfile(null);
		}
	}, [session, setProfile]);

	useEffect(() => {
		loadProfile();
	}, [loadProfile]);

	async function loadIncomes(
		page: number = 1,
		size: number = 15,
		filters: IncomesFilters = filterInitialValues
	) {
		const data = await fetchIncomes(page, size, filters);
		setIncomes(data);
	}

	async function loadUsers() {
		const data = await fetchUsers();
		setUsers(data || []);
	}

	async function loadOuts(page: number = 1, size: number = 15, filters:OutgoingsFilters=outgoingsInitialValues) {
		const data = await fetchOuts(page, size,filters);
		setOuts(data);
	}

	async function loadLoans(page: number = 1, size: number = 15, filters:LoansFilters=loansInitialFilterValues) {
		const data = await fetchLoans(page, size,filters);
		setLoans(data);
	}

	return {
		users,
		loadUsers,
		incomes,
		loadIncomes,
		outgoings,
		loadOuts,
		loans,
		loadLoans, 
		profile,
	};
}

export default useAppData;
