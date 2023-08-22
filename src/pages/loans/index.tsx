import styled from "styled-components";
import { useState } from "react";
import { FaFilter, FaPlus } from "react-icons/fa";
import FilterSection from "./components/loansFilter";
import { loansInitialFilterValues } from "./constant";
import { MdAttachMoney } from "react-icons/md";
import IncomesModal from "../incomes/components/incomeModal";
import OutsModal from "../outgoings/components/outsModal";
import useAppData from "../../hooks/useAppData";
import useColumns from "./const/columns";
import { useTable } from "react-table";
import Table from "../../components/table";
import { TableLoans } from "../../types/models";
import { BsEye } from "react-icons/bs";
import { FiEdit } from "react-icons/fi";
import { AiOutlineDelete } from "react-icons/ai";
import LoanPaymentsModal from "./components/paymentTableModal";
import { outgoingsInitialValues } from "../outgoings/constants";
import DeleteModal from "../../components/deleteModal";

type Action = "ADD" | "PAY" | "FILTER";

function Loans() {
  const [activeAction, setActiveAction] = useState<Action>();
  const [filters, setFilters] = useState<LoansFilters>(
    loansInitialFilterValues
  );
  const [activeLoan, setActiveLoan] = useState<TableLoans>();
  const [activeModal, setActiveModal] = useState<
    "SEE" | "EDIT/ADD" | "DELETE" | "PAY"
  >();

  function toggleAction(action: Action) {
    setActiveAction(action === activeAction ? undefined : action);
  }

  const { loans, loadLoans } = useAppData();
  const columns = useColumns();
  const table = useTable({ data: loans.data, columns });

  const [loanFilters] = useState<OutgoingsFilters>(outgoingsInitialValues);

  const actions = [
    {
      icon: BsEye,
      action: (loan: TableLoans) => {
        setActiveModal("SEE");
        setActiveLoan(loan);
      },
      iconSize: 19,
    },
    {
      icon: FiEdit,
      action: (loan: TableLoans) => {
        setActiveModal("EDIT/ADD");
        setActiveLoan(loan);
      },
      iconSize: 18,
    },
    {
      icon: AiOutlineDelete,
      action: (loan: TableLoans) => {
        setActiveModal("DELETE");
        setActiveLoan(loan);
      },
    },
  ];

  const closeModal = () => {
    setActiveModal(undefined);
    setActiveLoan(undefined);
  };

  function onSucess() {
    loadLoans();
  }

  return (
    <Wrapper>
      <nav>
        {!activeAction && (
          <div
            onClick={() => setActiveModal("EDIT/ADD")}
            className={"button nav-button"}
          >
            <span>Nuevo</span>
            <FaPlus size={18} />
          </div>
        )}
        {!activeAction && (
          <div
            onClick={() => setActiveModal("PAY")}
            className={"button nav-button"}
          >
            <span>Pagar</span>
            <MdAttachMoney size={22} />
          </div>
        )}
        {(activeAction === "FILTER" || !activeAction) && (
          <div
            onClick={() => toggleAction("FILTER")}
            className={"button nav-button"}
          >
            <FaFilter size={18} />
            <span>Filtrar </span>
          </div>
        )}
      </nav>
      {activeLoan && (
        <IncomesModal
          isOpen={activeModal === "EDIT/ADD"}
          onClose={closeModal}
          isLoanVersion={true}
          income={activeLoan.incomes}
        />
      )}

      <OutsModal
        isOpen={activeModal === "PAY"}
        onClose={closeModal}
        isLoanVersion={true}
      />

      <FilterSection
        isActive={activeAction === "FILTER"}
        onClose={() => setActiveAction(undefined)}
        filters={filters}
        setFilters={setFilters}
      />

      {activeLoan && (
        <DeleteModal
          isOpen={activeModal === "DELETE"}
          onClose={closeModal}
          id={activeLoan.incomes.id}
          tableName={"incomes"}
          onSucess={onSucess}
        />
      )}

      {activeLoan && (
        <LoanPaymentsModal
          isOpen={activeModal === "SEE"}
          onClose={closeModal}
          filters={loanFilters}
          loanName={""}
          loan={activeLoan}
        />
      )}

      <Table
        filters={filters}
        table={table}
        loadData={loadLoans}
        count={loans.count}
        actions={actions}
      />
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
