import { useMemo } from "react";
import { Column } from "react-table";
import { TableIncome } from "../../../types/models";
import {
  formatTableDate,
  formatMoney,
  capitalize,
} from "../../../utils/helper";

function useColumns() {
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
        accessor: "loans",
        // @ts-ignore
        Cell: ({ row }) => capitalize(row.original.loans?.name),
      },
      {
        Header: "Acreedor",
        accessor: "people",
        // @ts-ignore
        Cell: ({ row }) => capitalize(row.original.people?.name),
      },
      {
        Header: "Monto Inicial",
        accessor: "amount",
        // @ts-ignore
        Cell: ({ row }) => formatMoney(row.original.amount),
      },
      {
        Header: "Restante",
        accessor: "concept",
        // @ts-ignore
        Cell: ({ row }) => formatMoney(row.original.loans?.currentLoanAmount),
      },
      {
        Header: "Monto Pagado",
        accessor: "eventName",
        // @ts-ignore
        Cell: ({ row }) => formatMoney(row.original.loans?.paidAmount),
      },
      {
        Header: "Estado",
        accessor: "ministries",
        // @ts-ignore
        Cell: ({ row }) => capitalize(row.original.loans?.status),
      },
    ],
    []
  );
  return columns;
}

export default useColumns;
