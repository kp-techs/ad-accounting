import styled from "styled-components";
import { useState } from "react";
import { FaFilter, FaPlus } from "react-icons/fa";
import useToggle from "../../hooks/useToggle";
import FilterSection from "./components/loansFilter";
import { loansInitialValues } from "./constant";
import Table from "./components/table";
import { MdAttachMoney } from "react-icons/md";
import IncomesModal from "../incomes/components/incomeModal";
import OutsModal from "../outgoings/components/outsModal";

function Loans() {
	const [filters, setFilters] = useState<LoansFilters>(loansInitialValues);
	const [isFilterActive, toggleFilter] = useToggle();
	const [isAddModalActive, toggleAddModal] = useToggle();
	const [isPayModalActive, togglePayModal] = useToggle();


	return (
		<Wrapper>
			<nav>
			<div onClick={toggleAddModal} className={`button nav-button`}>
					<span>Nuevo</span>
					<FaPlus size={18} />
				</div>
				<div onClick={togglePayModal} className={`button nav-button`}>
					<span>Pagar</span>
					<MdAttachMoney size={22} />
				</div>
				<div onClick={toggleFilter} className={`button nav-button`}>
					<span>Filtrar</span>
					<FaFilter size={18} />
				</div>
			</nav>

			<FilterSection isActive={isFilterActive} onClose={toggleFilter} filters={filters} setFilters={setFilters} />
			<IncomesModal isOpen={isAddModalActive} onClose={toggleAddModal} isLoanVersion={true} />
			<OutsModal isOpen={isPayModalActive} onClose={togglePayModal} isLoanVersion={true}/>
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
