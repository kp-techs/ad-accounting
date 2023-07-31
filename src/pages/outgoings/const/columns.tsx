import { useMemo } from "react";
import { Column } from "react-table";
import { TableOutgoing } from "../../../types/models";
import {
  formatTableDate,
  captalize,
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
        //TO DO: Crear funcion de getBeneficiary para pasarle el ID 
        //y que devuelta el nombre capitalizado.
        // Cell: ({ row }) => getBeneficiary(row.original),

      },
      {
        Header: "Descripción",
        accessor: "description",
        // @ts-ignore
        //TO DO: Crear funcion para generar descripcion
        // Cell: ({ row }) => generateDescription(row.original),
      },
    ],
    []
  );
  return columns;
}

export default useColumns;