import styled from "styled-components";
import { useState } from "react";
import { FaFilter } from "react-icons/fa";
import useToggle from "../../hooks/useToggle";
import FilterSection from "./components/loansFilter";
import { loansInitialValues } from "./constant";
import Table from "./components/table";

function Loans() {
	const [filters, setFilters] = useState<LoansFilters>(loansInitialValues);
	const [isActive, toggleActive] = useToggle();

	return (
		<Wrapper>
			<nav>
				<div onClick={toggleActive} className={`button nav-button`}>
					<span>Filtrar</span>
					<FaFilter size={20} />
				</div>
			</nav>

			<FilterSection isActive={isActive} onClose={toggleActive} filters={filters} setFilters={setFilters} />

			<Table filters={filters} />
		</Wrapper>
	);
}

const Wrapper = styled.section`
	box-sizing: border-box;
	border-radius: 8px;
	gap: 15px;
	display: flex;
	flex-direction: column;
	height: 100%;

	nav {
		height: 48px;
		display: flex;
		gap: 30px;
	}
	select {
		width: 500px;
		border-radius: 20px;
		background: #ffffff;
		height: 25px;
		margin-left: 10px;
		padding-left: 20px;
		padding-right: 20px;
	}
	.button {
		display: flex;
		gap: 9px;
		align-items: center;
		&:hover {
			cursor: pointer;
			color: #5a5a5a;
		}
	}
	.nav-button {
		padding: 5px;

		&:active {
			background-color: #ffffff3a;
			border-radius: 5px;
		}
	}
	span {
		font-family: "Poppins";
		font-size: 18px;
		text-align: center;
	}
`;

export default Loans;
