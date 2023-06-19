import AppContext from "../contexts/app";
import { useContext } from "react";
import { fetchIncomes } from "../hooks/useSupabase";
import { filterInitialValues } from "../pages/incomes/constants";

function useAppData() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error(`useAppData must be used inside a AppProvider`);
  }
  const [incomes, setIncomes] = context;
  async function loadIncomes(
    page: number = 1,
    size: number = 18,
    filters: Filters = filterInitialValues
  ) {
    const data = await fetchIncomes(page, size, filters);
    setIncomes(data);
  }

  return { incomes, loadIncomes };
}

export default useAppData;
