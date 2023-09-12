import { useMemo } from "react";
import { Column } from "react-table";
import { TableOutgoing } from "../../../types/models";
import {
  formatTableDate,
  getOutgoingDescription,
  getBeneficiaryName,
  formatMoney,
} from "../../../utils/helper";

function useColumns() {
  const columns = useMemo<Column<TableOutgoing>[]>(
    () => [
      {
        Header: "Date",
        accessor: "date",
        // @ts-ignore
        Cell: ({ row }) => formatTableDate(row.original.date),
      },
      {
        Header: "Check Number",
        accessor: "checkNumber",
      },
      {
        Header: "Beneficiary",
        accessor: "beneficiaryID",
        // @ts-ignore
        Cell: ({ row }) => getBeneficiaryName(row.original),
      },
      {
        Header: "Description",
        accessor: "description",
        // @ts-ignore
        Cell: ({ row }) => getOutgoingDescription(row.original),
      },
      {
        Header: "Amount",
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
