import { useMemo } from "react";
import { Column } from "react-table";
import { TableIncome } from "../../../types/models";
import {
  formatTableDate,
  formatMoney,
  capitalize,
  getCreditorName,
} from "../../../utils/helper";

function useColumns() {
  const columns = useMemo<Column<TableIncome>[]>(
    () => [
      {
        Header: "Date",
        accessor: "date",
        // @ts-ignore
        Cell: ({ row }) => formatTableDate(row.original.date),
      },
      {
        Header: "Loan Name",
        accessor: "loanName",
        // @ts-ignore
        Cell: ({ row }) => capitalize(row.original.loanName),
      },
      {
        Header: "Creditor",
        accessor: "memberID",
        // @ts-ignore
        Cell: ({ row }) => getCreditorName(row.original),
      },
      {
        Header: "Initial Amount",
        accessor: "amount",
        // @ts-ignore
        Cell: ({ row }) => formatMoney(row.original.amount),
      },
      {
        Header: "Current Debt",
        accessor: "currentDebt",
        // @ts-ignore
        Cell: ({ row }) => formatMoney(row.original.currentDebt),
      },
      {
        Header: "Paid Amount",
        accessor: "paidAmount",
        // @ts-ignore
        Cell: ({ row }) => formatMoney(row.original.paidAmount),
      },
      {
        Header: "Status",
        accessor: "status",
        // @ts-ignore
        Cell: ({ row }) => capitalize(row.original.status),
      },
    ],
    []
  );
  return columns;
}

export default useColumns;
