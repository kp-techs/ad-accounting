import styled from "styled-components";
import Tab from "../../components/tab";
import OptionsTable from "./components/optionsTable";
import UsersTable from "./components/usersTable";

const usersOption = [
	{
		id: "users",
		name: "Usuarios",
		content: <UsersTable />
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

function Configuration() {
	//to do: prevenir que se eliminen opciones que no deberian.
	return (
		<Wrapper>
			<Tab tabs={usersOption} />
		</Wrapper>
	);
}

const Wrapper = styled.section`
	display: grid;
	box-sizing: border-box;
	border-radius: 8px;
	overflow: hidden;
`;

export default Configuration;
