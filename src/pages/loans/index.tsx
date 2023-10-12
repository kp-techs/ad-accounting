import styled from "styled-components";
import { useEffect, useRef, useState } from "react";
import { FaFilter, FaPlus } from "react-icons/fa";
import FilterSection from "./components/loansFilter";
import { MdAttachMoney } from "react-icons/md";
import IncomesModal from "../incomes/components/incomeModal";
import OutsModal from "../outgoings/components/outsModal";
import useAppData from "../../hooks/useAppData";
import useLoansColumns from "./const/columns";
import { useTable } from "react-table";
import Table from "../../components/table";
import { BsEye } from "react-icons/bs";
import { FiEdit } from "react-icons/fi";
import { AiOutlineDelete } from "react-icons/ai";
import LoanPaymentsModal from "./components/paymentTableModal";
import DeleteModal from "../../components/deleteModal";
import { TableIncome } from "../../types/models";
import { loansInitialFilterValues } from "./constant";
import { StyledCard } from "../../components/styledDiv";
import PrintButton from "../../components/printButton";

type Action = "ADD" | "PAY" | "FILTER";

function Loans() {
  const [activeAction, setActiveAction] = useState<Action>();
  const [filters, setFilters] = useState(loansInitialFilterValues);
  const [activeLoan, setActiveLoan] = useState<TableIncome>();
  const [activeModal, setActiveModal] = useState<
    "SEE" | "EDIT/ADD" | "DELETE" | "PAY"
  >();

  const myRef = useRef<HTMLDivElement | null>(null);
  
  function toggleAction(action: Action) {
    setActiveAction(action === activeAction ? undefined : action);
  }

  const { loadLoans, loans } = useAppData();
  const columns = useLoansColumns();
  const table = useTable({ data: loans.data, columns });

  const actions = [
    {
      icon: BsEye,
      action: (loan: TableIncome) => {
        setActiveModal("SEE");
        setActiveLoan(loan);
      },
      iconSize: 19,
    },
    {
      icon: FiEdit,
      action: (loan: TableIncome) => {
        setActiveModal("EDIT/ADD");
        setActiveLoan(loan);
      },
      iconSize: 18,
    },
    {
      icon: AiOutlineDelete,
      action: (loan: TableIncome) => {
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
      <div className="title-wIcon">
        <h4>PRESTAMOS</h4>
        <PrintButton componentRef={myRef} />
      </div>
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

      <IncomesModal
        isOpen={activeModal === "EDIT/ADD"}
        onClose={closeModal}
        isLoanVersion={true}
        income={activeLoan}
      />

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
          id={activeLoan.id}
          tableName={"incomes"}
          onSucess={onSucess}
          message="Este préstamo se eliminará permanentemente, y consigo, todo pago que pueda existir asociado al mismo. Esta acción no se puede deshacer."
        />
      )}

      {activeLoan && (
        <LoanPaymentsModal
          isOpen={activeModal === "SEE"}
          onClose={closeModal}
          income={activeLoan}
        />
      )}

      <div ref={myRef} className="table-wrapper">
        <Table
          table={table}
          filters={filters}
          loadData={loadLoans}
          count={loans.count}
          actions={actions}
        />
      </div>
    </Wrapper>
  );
}

const Wrapper = styled(StyledCard)`
  display: grid;
  overflow: hidden;
  .title-wIcon {
    display: flex;
    justify-content: space-between;
  }
  nav {
    height: 48px;
    display: flex;
    gap: 30px;
    border-bottom:1px solid #000;
    margin-bottom: 15px;
  }
  span {
    font-family: "Poppins";
    font-size: 15px;
    text-align: center;
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


  .table-wrapper {
    overflow: hidden;
  }

  @media only screen and (max-width:700px){  
    h4 {
      font-size: 16px;
    }
    span {font-size: 13px;}
  } 
  
`;

export default Loans;
