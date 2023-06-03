import { useMemo } from "react";
import { Column } from "react-table";
import { Income } from "../../../types/models";
import { formatMoney, generateConcept } from "../../../utils/helper";

function useColumns() {
  const columns = useMemo<Column<Income>[]>(
    () => [
      {
        Header: "Fecha",
        accessor: "date",
      },
      {
        Header: "Concepto",
        accessor: "type",
        // @ts-ignore
        Cell: ({ row }) => generateConcept(row.original),
      },
      {
        Header: "Monto",
        accessor: "amount",
        // @ts-ignore
        Cell: ({ row }) => formatMoney(row.original.amount),
      },
    ],
    []
  );
  return columns;
}

export default useColumns;
