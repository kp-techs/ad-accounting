// import useSupabase from "../hooks/useSupabase";
// import { useEffect, useState } from "react";
// import * as models from "../types/models";

// const initialIncome = {
//   id: 0,
//   date: "",
//   concept: "",
//   amount: 0,
//   createdBy: "",
//   createdDate: "",
//   updatedBy: "",
//   updatedDate: "",
//   comment: "",
// };

// function useSupabase() {
//   const [incomes, setIncomes] = useState<models.Income[] | null>([]);
//   const [income, setIncome] = useState<models.Income>(initialIncome);
//   const {
//     date,
//     concept,
//     amount,
//     createdBy,
//     createdDate,
//     updatedBy,
//     updatedDate,
//   } = income;

//   useEffect(() => {
//     fetchIncomes();
//   }, []);

//   async function fetchIncomes() {
//     const { data } = await supabase.from("incomes").select();
//     setIncomes(data);
//     console.log("data: ", data);
//   }

//   async function createIncomes() {
//     await supabase.from("incomes").insert([
//       {
//         date,
//         concept,
//         amount,
//         createdBy,
//         createdDate,
//         updatedBy,
//         updatedDate,
//       },
//     ]);

//     setIncome(initialIncome);
//     fetchIncomes();
//   }
// }

// const test = "";
// export default test;
export const s = "";
