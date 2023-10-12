import styled from "styled-components";
import { useRef, useState } from "react";
import { FaPlus, FaFilter } from "react-icons/fa";
import { outgoingsInitialValues } from "./constants";
import OutsModal from "./components/outsModal";
import FilterSection from "./components/filterSeccion";
import OutgoingsTable from "./components/table";
import { StyledCard } from "../../components/styledDiv";
import PrintButton from "../../components/printButton";

type Action = "ADD" | "FILTER";

function Outgoings() {
  const [activeAction, setActiveAction] = useState<Action>();
  const [filters, setFilters] = useState(outgoingsInitialValues);
  const [isModalActive, setActiveModal] = useState<'ADD'>();

  const myRef = useRef<HTMLDivElement | null>(null);

  function toggleAction(action: Action) {
    setActiveAction(action === activeAction ? undefined : action);
  }

  return (
    <Wrapper>
      <div className="title-wIcon">
        <h4>EGRESOS</h4>
        <PrintButton componentRef={myRef} />
      </div>
      <nav>
        {(activeAction === "ADD" || !activeAction) && (
          <div
            onClick={() => setActiveModal("ADD")}
            className={"button nav-button"}
          >
            <FaPlus size={20} />
            <span>Agregar</span>
          </div>
        )}
        {(activeAction === "FILTER" || !activeAction) && (
          <div
            onClick={() => toggleAction("FILTER")}
            className={"button nav-button"}
          >
            <FaFilter size={20} />
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

      <OutsModal
        isOpen={isModalActive === "ADD"}
        onClose={() => setActiveModal(undefined)}
      />

      <div ref={myRef} className="table-wrapper">
        <OutgoingsTable filters={filters} />
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

export default Outgoings;
