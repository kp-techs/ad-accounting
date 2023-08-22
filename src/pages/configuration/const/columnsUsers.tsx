import { Column } from "react-table";
import { User } from "../../../types/models";
import { capitalize, formatRelativeDate } from "../../../utils/helper";

const colsSchema: Column<User>[] = [
  {
    Header: "Nombre",
    accessor: "name",
    // @ts-ignore
    Cell: ({ row }) => capitalize(row.original.name),
  },
  {
    Header: "Correo",
    accessor: "email",
  },
  {
    Header: "Rol",
    accessor: "role",
    // @ts-ignore
    Cell: ({ row }) => capitalize(row.original.role),
  },
  {
    Header: "Última sesión",
    accessor: "last_sign_in_at",
    // @ts-ignore
    Cell: ({ row }) => formatRelativeDate(row.original.last_sign_in_at),
  },
];

export default colsSchema;
