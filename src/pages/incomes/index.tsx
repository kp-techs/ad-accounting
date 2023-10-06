import styled from "styled-components";
import { useEffect, useState } from "react";
import IncomesModal from "./components/incomeModal";
import DetailsModal from "./components/detailsModal";
import { FaPlus, FaFilter } from "react-icons/fa";
import FilterSection from "./components/incomesFilter";
import { filterInitialValues } from "./constants";
import Table from "../../components/table";
import useAppData from "../../hooks/useAppData";
import useColumns from "./const/columns";
import { useTable } from "react-table";
import { BsEye } from "react-icons/bs";
import { FiEdit } from "react-icons/fi";
import { TableIncome } from "../../types/models";
import { AiOutlineDelete } from "react-icons/ai";
import DeleteModal from "../../components/deleteModal";

type Action = "ADD" | "FILTER";

function Incomes() {
  const [activeAction, setActiveAction] = useState<Action>();
  const [filters, setFilters] = useState<IncomesFilters>(filterInitialValues);

  const [activeIncome, setActiveIncome] = useState<TableIncome>();
  const [activeModal, setActiveModal] = useState<
    "SEE" | "EDIT/ADD" | "DELETE"
  >();


  function toggleAction(action: Action) {
    setActiveAction(action === activeAction ? undefined : action);
  }

  const { incomes, loadIncomes } = useAppData();

  const columns = useColumns();
  const table = useTable({ data: incomes.data, columns });

  const actions = [
    {
      icon: BsEye,
      action: (income: TableIncome) => {
        setActiveModal("SEE");
        setActiveIncome(income);
      },
      iconSize: 19,
    },
    {
      icon: FiEdit,
      action: (income: TableIncome) => {
        setActiveModal("EDIT/ADD");
        setActiveIncome(income);
      },
      iconSize: 18,
    },
    {
      icon: AiOutlineDelete,
      action: (income: TableIncome) => {
        setActiveModal("DELETE");
        setActiveIncome(income);
      },
    },
  ];

  const closeModal = () => {
    setActiveModal(undefined);
    setActiveIncome(undefined);
  };

  return (
    <Wrapper>
      <h4>INGRESOS</h4>
      <nav>
        {!activeAction && (
          <div
            onClick={() => setActiveModal("EDIT/ADD")}
            className={"button nav-button"}
          >
            <FaPlus size={15} />
            <span>Agregar</span>
          </div>
        )}
        {(activeAction === "FILTER" || !activeAction) && (
          <div
            onClick={() => toggleAction("FILTER")}
            className={"button nav-button"}
          >
            <FaFilter size={15} />
            <span>Filtrar </span>
          </div>
        )}
      </nav>

      <FilterSection
        isActive={activeAction === "FILTER"}
        onClose={() => setActiveAction(undefined)}
        filters={filters}
        setFilters={setFilters}
      />

      <IncomesModal
        isOpen={activeModal === "EDIT/ADD"}
        onClose={closeModal}
        income={activeIncome}
      />

      <DetailsModal
        isOpen={activeModal === "SEE"}
        onClose={closeModal}
        income={activeIncome}
      />

      {activeIncome && (
        <DeleteModal
          isOpen={activeModal === "DELETE"}
          onClose={closeModal}
          id={activeIncome.id}
          tableName={"incomes"}
          onSucess={loadIncomes}
        />
      )}

      <div className="table-wrapper">
        <Table
          filters={filters}
          table={table}
          loadData={loadIncomes}
          count={incomes.count}
          actions={actions}
        />
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.section`
  display: grid;
  overflow: hidden;

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
`;

export default Incomes;
