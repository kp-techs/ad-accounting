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
        Header: "Fecha",
        accessor: "date",
        // @ts-ignore
        Cell: ({ row }) => formatTableDate(row.original.date),
      },
      {
        Header: "Cheque",
        accessor: "checkNumber",
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

export default useColumns;
