import styled from "styled-components";
import Table from "./components/table";
import React, { useState } from "react";
import IncomesModal from "./components/incomeModal";
import { FaPlus, FaFilter, FaSearch } from "react-icons/fa";
import FilterModal from "./components/filterModal";

type Action = "ADD" | "FILTER" | "SEARCH";

function Incomes() {
  const [activeAction, setActiveAction] = useState<Action>();

  return (
    <Wrapper>
      <nav>
        {(activeAction === "ADD" || !activeAction) && (
          <div
            onClick={() => setActiveAction("ADD")}
            className={`button nav-button ${
              activeAction === "ADD" ? "active" : ""
            }`}
          >
            <FaPlus size={20} />
            {activeAction === "ADD" && <span>Agregar</span>}
          </div>
        )}
        {(activeAction === "FILTER" || !activeAction) && (
          <div
            onClick={() => setActiveAction("FILTER")}
            className={`button nav-button ${
              activeAction === "FILTER" ? "active" : ""
            }`}
          >
            <FaFilter size={20} />
            {activeAction === "FILTER" && <span>Filtrar</span>}
          </div>
        )}
        {(activeAction === "SEARCH" || !activeAction) && (
          <div
            onClick={() => {
              activeAction === "SEARCH"
                ? setActiveAction(undefined)
                : setActiveAction("SEARCH");
            }}
            className={"button"}
          >
            <FaSearch size={20} />
            {activeAction === "SEARCH" && (
              <select>
                <option value="Consulta frecuente"></option>
                <option value="Consulta frecuente">Consulta frecuente</option>
              </select>
            )}
          </div>
        )}
      </nav>

      <IncomesModal
        isOpen={activeAction === "ADD"}
        onClose={() => setActiveAction(undefined)}
      />
      <FilterModal
        isOpen={activeAction === "FILTER"}
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
  .nav-button:active {
    background-color: #ffffff;
    border-radius: 5px;
  }
  span {
    font-family: "Poppins";
    font-size: 18px;
    text-align: center;
  }
`;

export default Incomes;
