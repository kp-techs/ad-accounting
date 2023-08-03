import { TableLoans } from "../../../types/models";
import { useMemo } from "react";
import { Column } from "react-table";
import {
  formatTableDate,
  formatMoney,
  capitalize,
  getCreditorName,
} from "../../../utils/helper";


function useColumns() {
  const columns = useMemo<Column<TableLoans>[]>(
    () => [
      {
        Header: "Fecha",
        accessor: "date",
        // @ts-ignore
        Cell: ({ row }) => formatTableDate(row.original.date),
      }, 
      {
        Header: "Nombre",
        accessor: "name",
        // @ts-ignore
        Cell: ({ row }) => capitalize(row.original.name),
      },{
        Header: "Acreedor",
        accessor: "creditorID",
        // @ts-ignore
        Cell: ({ row }) => getCreditorName(row.original),
      }, {
        Header: "Monto Inicial",
        accessor: "initialLoanAmount",
        // @ts-ignore
        Cell: ({ row }) => formatMoney(row.original.initialLoanAmount),
      }, {
        Header: "Monto Adeudado",
        accessor: "currentLoanAmount",
        // @ts-ignore
        Cell: ({ row }) => formatMoney(row.original.currentLoanAmount),
      },
      {
        Header: "Monto Pagado",
        accessor: "paidAmount",
        // @ts-ignore
        Cell: ({ row }) => formatMoney(row.original.paidAmount),
      },
    ],
    []
  );
  return columns;
}

export default useColumns;