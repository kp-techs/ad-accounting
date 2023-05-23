import { useMemo } from "react";
import { Column } from "react-table";

interface Data {
  reference: string;
  date: string;
  concept: string;
  amount: number;
}

function useColumns() {
  const columns = useMemo<Column<Data>[]>(
    () => [
      {
        Header: "Referencia",
        accessor: "reference",
      },
      {
        Header: "Fecha",
        accessor: "date",
      },
      {
        Header: "Concepto",
        accessor: "concept",
      },
      {
        Header: "Monto",
        accessor: "amount",
      },
    ],
    []
  );
  return columns;
}

export default useColumns;
