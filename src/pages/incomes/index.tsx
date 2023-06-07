import styled from "styled-components";
import Table from "./components/table";
import React, { useState } from "react";
import IncomesModal from "./components/incomeModal";
import { FaPlus, FaFilter, FaSearch } from "react-icons/fa";

type Action = "ADD" | "FILTER" | "SEARCH";
function Incomes() {
  const [activeAction, setActiveAction] = useState<Action>();

  return (
    <Wrapper>
      <nav>
        {(activeAction === "ADD" || !activeAction) && (
          <div
            onClick={() => setActiveAction("ADD")}
            className={`nav-button ${activeAction === "ADD" ? "active" : ""}`}
          >
            <FaPlus size={20} />
            {activeAction === "ADD" && <span>Agregar</span>}
          </div>
        )}
        {(activeAction === "FILTER" || !activeAction) && (
          <div
            onClick={() => setActiveAction("FILTER")}
            className={`nav-button ${
              activeAction === "FILTER" ? "active" : ""
            }`}
          >
            <FaFilter size={20} />
            {activeAction === "FILTER" && <span>Filtrar</span>}
          </div>
        )}
        {(activeAction === "SEARCH" || !activeAction) && (
          <div
            onClick={() => setActiveAction("SEARCH")}
            className={`nav-button ${
              activeAction === "SEARCH" ? "active" : ""
            }`}
          >
            <FaSearch size={20} />
            {activeAction === "SEARCH" && <input type="text" />}
          </div>
        )}
      </nav>

      <IncomesModal
        isOpen={activeAction === "ADD"}
        onClose={() => setActiveAction(undefined)}
      />
      <Table />
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
  input {
    width: 500px;
    border-radius: 20px;
    background: #ffffff;
    height: 20px;
    margin-left: 10px;
  }
  .nav-button {
    display: flex;
    gap: 9px;
    align-items: center;
    &:hover {
      cursor: pointer;
      color: #5a5a5a;
    }
    &.active {
      background-color: #ffffff;
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
