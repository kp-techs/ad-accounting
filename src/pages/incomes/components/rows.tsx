import { useMemo } from "react";
//este sera un ejemplo temporal para guardar los incomes values
function useRows() {
  const rows = useMemo(
    () => [
      {
        reference: "A000",
        date: "01/01/23",
        concept: "Culto Dominical",
        amount: 500000,
      },
      {
        reference: "A000",
        date: "01/01/23",
        concept: "Escuela Biblica",
        amount: 500000,
      },
      {
        reference: "A000",
        date: "01/01/23",
        concept: "Culto de jovenes",
        amount: 500000,
      },
      {
        reference: "A000",
        date: "01/01/23",
        concept: "Culto de Damas",
        amount: 500000,
      },
      {
        reference: "A000",
        date: "01/01/23",
        concept: "Evangelismo",
        amount: 500000,
      },
      {
        reference: "A000",
        date: "01/01/23",
        concept: "Culto especial: Misiones",
        amount: 500000,
      },
      {
        reference: "A000",
        date: "01/01/23",
        concept: "Campamento de Jóvenes",
        amount: 500000,
      },
      {
        reference: "A000",
        date: "01/01/23",
        concept: "Colegio Enmanuel",
        amount: 500000,
      },
      {
        reference: "A000",
        date: "01/01/23",
        concept: "Culto Dominical",
        amount: 500000,
      },
      {
        reference: "A000",
        date: "01/01/23",
        concept: "Escuela Biblica",
        amount: 500000,
      },
      {
        reference: "A000",
        date: "01/01/23",
        concept: "Culto de jovenes",
        amount: 500000,
      },
      {
        reference: "A000",
        date: "01/01/23",
        concept: "Escuela Biblica",
        amount: 500000,
      },
      {
        reference: "A000",
        date: "01/01/23",
        concept: "Culto de jovenes",
        amount: 500000,
      },
      {
        reference: "A000",
        date: "01/01/23",
        concept: "Culto de Damas",
        amount: 500000,
      },
      {
        reference: "A000",
        date: "01/01/23",
        concept: "Evangelismo",
        amount: 500000,
      },
      {
        reference: "A000",
        date: "01/01/23",
        concept: "Culto especial: Misiones",
        amount: 500000,
      },
      {
        reference: "A000",
        date: "01/01/23",
        concept: "Campamento de Jóvenes",
        amount: 500000,
      },
      {
        reference: "A000",
        date: "01/01/23",
        concept: "Colegio Enmanuel",
        amount: 500000,
      },
    ],
    []
  );
  return rows;
}

export default useRows;
