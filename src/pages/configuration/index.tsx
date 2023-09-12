import styled from "styled-components";
import Tab from "../../components/tab";
import OptionsTable from "./components/optionsTable";
import UsersTable from "./components/usersTable";

const usersOption = [
	{
		id: "users",
		name: "Users",
		content: <UsersTable />
	},
	{
		id: "members",
		name: "Members",
		content: <OptionsTable name="people" />
	},
	{
		id: "ministries",
		name: "Ministries",
		content: <OptionsTable name="ministries" />
	},
	{
		id: "incomeTypes",
		name: "Income Types",
		content: <OptionsTable name="incomeTypes" />
	},
	{
		id: "outgoingTypes",
		name: "Types of Outgoings",
		content: <OptionsTable name="outgoingTypes" />
	}
];

function Configuration() {
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
