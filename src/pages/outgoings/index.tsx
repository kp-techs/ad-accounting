import styled from "styled-components";
import { useState } from "react";
import { FaPlus, FaFilter } from "react-icons/fa";
import { outgoingsInitialValues } from "./constants";
import OutsModal from "./components/outsModal";
import FilterSection from "./components/filterSeccion";
import OutgoingsTable from "./components/table";

type Action = "ADD" | "FILTER";

function Outgoings() {
  const [activeAction, setActiveAction] = useState<Action>();
  const [filters, setFilters] = useState(outgoingsInitialValues);

  function toggleAction(action: Action) {
    setActiveAction(action === activeAction ? undefined : action);
  }

  return (
    <Wrapper>
      <nav>
        {(activeAction === "ADD" || !activeAction) && (
          <div
            onClick={() => setActiveAction("ADD")}
            className={"button nav-button"}
          >
            <FaPlus size={20} />
            <span>Add</span>
          </div>
        )}
        {(activeAction === "FILTER" || !activeAction) && (
          <div
            onClick={() => toggleAction("FILTER")}
            className={"button nav-button"}
          >
            <FaFilter size={20} />
            <span>Filter </span>
          </div>
        )}
      </nav>

      <FilterSection
        isActive={activeAction === "FILTER"}
        onClose={() => setActiveAction(undefined)}
        filters={filters}
        setFilters={setFilters}
      />

      <OutsModal
        isOpen={activeAction === "ADD"}
        onClose={() => toggleAction("ADD")}
      />

      <div className="table-wrapper">
        <OutgoingsTable filters={filters} />
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

  .table-wrapper {
    overflow: hidden;
  }

  @media only screen and (max-width:700px){ 
    span {
      display:none;
    }
     nav {
      gap:5px;
      height:30px
     }
  }
`;

export default Outgoings;
