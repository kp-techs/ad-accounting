import { useMemo } from "react";
import { Column } from "react-table";
import { Income } from "../../../types/models";
import {
  formatDate,
  formatMoney,
  generateConcept,
} from "../../../utils/helper";

function useColumns() {
  const columns = useMemo<Column<Income>[]>(
    () => [
      {
        Header: "Fecha",
        accessor: "date",
        // @ts-ignore
        Cell: ({ row }) => formatDate(row.original.date),
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
