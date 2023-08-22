import { Column } from "react-table";
import { Options } from "../../../types/models";
import { capitalize } from "../../../utils/helper";

const colsSchema: Column<Options>[] = [
  {
    Header: "Nombre",
    accessor: "name",
    // @ts-ignore
    Cell: ({ row }) => capitalize(row.original.name),
  },
];

export default colsSchema;
