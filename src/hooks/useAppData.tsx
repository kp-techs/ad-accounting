import AppContext from "../contexts/app";
import { useContext, useEffect, useCallback } from "react";
import {
  fetchIncomes,
  fetchOuts,
  fetchProfile,
  fetchUsers,
  useSupabase,
} from "../hooks/useSupabase";
import { filterInitialValues } from "../pages/incomes/constants";


function useAppData() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error(`useAppData must be used inside a AppProvider`);
  }

  const { session } = useSupabase();
  const { users, setUsers, profile, setProfile, incomes, setIncomes, outgoings, setOuts } = context;

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

  async function loadOuts(page: number = 1, size: number = 15) {
    const data = await fetchOuts(page, size);
    setOuts(data)
  }

  return {
    users,
    loadUsers,
    profile,
    incomes,
    loadIncomes,
    outgoings,
    loadOuts
  };
} 

export default useAppData;
