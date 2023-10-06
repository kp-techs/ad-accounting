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
type Props = {
	table: string
}
function Configuration({ table }: Props) {
	return (
		<Wrapper>
			<div className="configuration-title">
			<h6> 
			{table === 'users' ? 'USUARIOS' : 
			table === 'people' ? 'MIEMBROS' :
			table === 'ministries' ? 'MINISTERIOS' :
			table === 'incomeTypes' ? 'TIPOS DE INGRESOS' : 
			table === 'outgoingTypes' ? 'TIPOS DE EGRESOS' : ''}
			 </h6>
			</div>
			{table === 'users' ? <UsersTable /> :
				<OptionsTable name={table} />
			}
		</Wrapper>
	);
}

const Wrapper = styled.section`
	display: grid;
	box-sizing: border-box;
	border-radius: 8px;
	overflow: hidden;

	.configuration-title {
		border-bottom: 1px solid #000;
		margin-bottom: 20px;
	}
`;

export default Configuration;
