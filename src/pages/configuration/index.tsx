import styled from "styled-components";
import OptionsTable from "./components/optionsTable";
import UsersTable from "./components/usersTable";
import { StyledCard } from "../../components/styledComponents";

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

const Wrapper = styled(StyledCard)`
	display: grid;
	box-sizing: border-box;
	border-radius: 8px;
	overflow: hidden;

	.configuration-title {
		border-bottom: 1px solid #000;
	}
`;

export default Configuration;
