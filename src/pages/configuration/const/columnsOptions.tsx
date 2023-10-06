import { Column } from "react-table";
import { Option } from "../../../types/models";
import { capitalize } from "../../../utils/helper";

const colsSchema: Column<Option>[] = [
  {
    Header: "Nombre",
    accessor: "name",
    // @ts-ignore
    Cell: ({ row }) => capitalize(row.original.name),
  },
  {
    Header: 'Acciones',
    Cell: '',
    id: 'actions'
  }
];

export default colsSchema;
