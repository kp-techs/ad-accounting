import OptionsTable from "../pages/configuration/components/optionsTable";
import UsersTable from "../pages/configuration/components/usersTable";

export const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    background: "#fff",
    boxShadow: "7px 13px 23px -2px rgba(0, 0, 0, 0.25)",
    borderRadius: "10px",
    fontFamily: "Poppins",
  },
};

export const usersOption = [
	{
		id: "users",
		name: "Usuarios",
		content: <UsersTable/>
	},
	{
		id: "members",
		name: "Miembros",
		content: <OptionsTable name="people" />
	},
	{
		id: "ministries",
		name: "Ministerios",
		content: <OptionsTable name="ministries" />
	},
	{
		id: "incomeTypes",
		name: "Tipos de ingresos",
		content: <OptionsTable name="incomeTypes" />
	},
	{
		id: "outgoingTypes",
		name: "Tipo de egresos",
		content: <OptionsTable name="outgoingTypes" />
	}
];