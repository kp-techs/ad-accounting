import { useMemo } from "react";
//este sera un ejemplo temporal para guardar los incomes values
function useRows() {
  const rows = useMemo(
    () => [
      {
        date: "01/01/23",
        concept: "Culto Dominical",
        amount: 500000,
      },
      {
        date: "01/01/23",
        concept: "Escuela Biblica",
        amount: 500000,
      },
      {
        date: "01/01/23",
        concept: "Culto de jovenes",
        amount: 500000,
      },
    ],
    []
  );
  return rows;
}

export default useRows;
