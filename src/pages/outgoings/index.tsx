import styled from "styled-components";
import { useState } from "react";
import { FaPlus, FaFilter } from "react-icons/fa";
import { outgoingsInitialValues } from "./constants";
import OutsModal from "./components/outsModal";
import Table from "./components/table";
import FilterSeccion from "./components/filterSeccion";


type Action = "ADD" | "FILTER" | "SEARCH";

function Outgoings() {
  const [activeAction, setActiveAction] = useState<Action>();
  const [filters, setFilters] = useState<OutgoingsFilters>(outgoingsInitialValues);
  
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
          {activeAction === "FILTER" && <span>Filtrar </span>}
        </div>
      )}
    </nav>

    <OutsModal
      isOpen={activeAction === "ADD"}
      onClose={() => setActiveAction(undefined)}
      />

    <FilterSeccion
      isActive={activeAction === "FILTER"}
      onClose={() => setActiveAction(undefined)}
      filters={filters}
      setFilters={setFilters}
    />

    <Table filters={filters}/>
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

export default Outgoings;
