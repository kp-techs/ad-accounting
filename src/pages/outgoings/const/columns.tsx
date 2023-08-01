import { useMemo } from "react";
import { Column } from "react-table";
import { TableOutgoing } from "../../../types/models";
import {
  formatTableDate,
  captalize,
  getOutgoingDescription,
  getBeneficiaryName,
} from "../../../utils/helper";

function useColumns() {
  const columns = useMemo<Column<TableOutgoing>[]>(
    () => [
      {
        Header: "Fecha",
        accessor: "date",
        // @ts-ignore
        Cell: ({ row }) => formatTableDate(row.original.date),
      }, {
        Header: "No. Cheque",
        accessor:"checkNumber",
      },
      {
        Header: "Beneficiario",
        accessor: "beneficiaryID",
        // @ts-ignore
        Cell: ({ row }) => getBeneficiaryName(row.original),

      },
      {
        Header: "Descripción",
        accessor: "description",
        // @ts-ignore
        Cell: ({ row }) => getOutgoingDescription(row.original),
      },
    ],
    []
  );
  return columns;
}

export default useColumns;