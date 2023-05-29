import AppContext from "../contexts/app";
import { useContext } from "react";
import { fetchIncomes } from "../hooks/useSupabase";

function useAppData() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error(`useAppData must be used inside a AppProvider`);
  }
  const [incomes, setIncomes] = context;
  async function loadIncomes() {
    const data = await fetchIncomes();
    setIncomes(data);
  }

  return { incomes, loadIncomes };
}

export default useAppData;
