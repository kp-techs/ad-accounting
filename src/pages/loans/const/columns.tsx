import { useMemo } from "react";
import { Column } from "react-table";
import { TableIncome } from "../../../types/models";
import {
  formatTableDate,
  formatMoney,
  capitalize,
  getCreditorName,
} from "../../../utils/helper";

function useLoansColumns() {
  const columns = useMemo<Column<TableIncome>[]>(
    () => [
      {
        Header: "Fecha",
        accessor: "date",
        // @ts-ignore
        Cell: ({ row }) => formatTableDate(row.original.date),
      },
      {
        Header: "Nombre",
        accessor: "loanName",
        // @ts-ignore
        Cell: ({ row }) => capitalize(row.original.loanName),
      },
      {
        Header: "Acreedor",
        accessor: "memberID",
        // @ts-ignore
        Cell: ({ row }) => getCreditorName(row.original),
      },
      {
        Header: "Monto Inicial",
        accessor: "amount",
        // @ts-ignore
        Cell: ({ row }) => formatMoney(row.original.amount),
      },
      {
        Header: "Restante",
        accessor: "currentDebt",
        // @ts-ignore
        Cell: ({ row }) => formatMoney(row.original.currentDebt),
      },
      {
        Header: "Monto Pagado",
        accessor: "paidAmount",
        // @ts-ignore
        Cell: ({ row }) => formatMoney(row.original.paidAmount),
      },
      {
        Header: "Estado",
        accessor: "status",
        // @ts-ignore
        Cell: ({ row }) => capitalize(row.original.status),
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

export default useLoansColumns;
