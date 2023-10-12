import { useMemo } from "react";
import { Column } from "react-table";
import { TableIncome } from "../../../types/models";
import {
  formatTableDate,
  formatMoney,
  generateConcept,
} from "../../../utils/helper";

function useIncomeColumns() {
  const columns = useMemo<Column<TableIncome>[]>(
    () => [
      {
        Header: "Fecha",
        accessor: "date",
        // @ts-ignore
        Cell: ({ row }) => formatTableDate(row.original.date),
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
      {
        Header: 'Acciones',
        Cell: '',
        id: 'actions'
      }
    ],
    []
  );
  return columns;
}

export default useIncomeColumns;
