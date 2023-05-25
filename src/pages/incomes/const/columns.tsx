import { useMemo } from "react";
import { Column } from "react-table";
import { Income } from "../../../types/models";

function useColumns() {
  const columns = useMemo<Column<Income>[]>(
    () => [
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
