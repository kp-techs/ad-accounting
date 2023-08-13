import styled from "styled-components";
import IncomeTable from "./components/table";
import React, { useState } from "react";
import IncomesModal from "./components/incomeModal";
import { FaPlus, FaFilter } from "react-icons/fa";
import FilterSection from "./components/incomesFilter";
import { filterInitialValues } from "./constants";

type Action = "ADD" | "FILTER" | "SEARCH";

function Incomes() {
  const [activeAction, setActiveAction] = useState<Action>();
  const [filters, setFilters] = useState<IncomesFilters>(filterInitialValues);

  return (
    <Wrapper>
      <nav>
        {(activeAction === "ADD" || !activeAction) && (
          <div
            onClick={() => {
              activeAction === "ADD"
                ? setActiveAction(undefined)
                : setActiveAction("ADD");
            }}
            className={"button nav-button"}
          >
            <FaPlus size={20} />
            <span>Agregar</span>
          </div>
        )}
        {(activeAction === "FILTER" || !activeAction) && (
          <div
            onClick={() => {
              activeAction === "FILTER"
                ? setActiveAction(undefined)
                : setActiveAction("FILTER");
            }}
            className={"button nav-button"}
          >
            <FaFilter size={20} />
            <span>Filtrar </span>
          </div>
        )}
      </nav>

      <IncomesModal
        isOpen={activeAction === "ADD"}
        onClose={() => setActiveAction(undefined)}
      />
      <FilterSection
        isActive={activeAction === "FILTER"}
        onClose={() => setActiveAction(undefined)}
        filters={filters}
        setFilters={setFilters}
      />

      <IncomeTable filters={filters} />
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

export default Incomes;
