import styled from "styled-components";
import Table from "./components/table";
import React from "react";
import IncomesModal from "./components/incomeModal";
import { useSupabase } from "../../hooks/useSupabase";

function Incomes() {
  const [isModalOpen, setIsOpen] = React.useState(false);
  const { supabase } = useSupabase();

  console.log(supabase);

  function toggleModal() {
    setIsOpen(!isModalOpen);
  }

  return (
    <Wrapper>
      <nav>
        <button className="button--addIncome" onClick={toggleModal}>
          Agregar ingreso
        </button>
        <input type="text" />
        <button className="button--filter">
          <img alt="filter icon" src="assets/images/filter-icon.png" />
        </button>
      </nav>

      <IncomesModal isOpen={isModalOpen} onClose={toggleModal} />

      <Table />
    </Wrapper>
  );
}

const Wrapper = styled.section`
  box-sizing: border-box;
  display: grid;
  margin: 20px;
  border-radius: 8px;
  background-color: #ffffffc0;

  nav {
    height: 48px;
    display: flex;
    gap: 10px;
    padding: 20px 20px 5px;
    /* box-sizing: border-box; */
    border-bottom: 1px solid gray;
    margin: 5px;
  }
  input {
    width: 500px;
    border-radius: 20px;
  }
  img {
    object-fit: fill;
    width: 30px;
  }
  .button--addIncome {
    background-color: transparent;
    border-radius: 15px;
    font-size: 16px;
    font-family: Arial, Helvetica, sans-serif;
    cursor: pointer;
  }
  .button--filter {
    background-color: transparent;
    /* background-image: url(assets/images/filter-icon.png); */
    border-radius: 50%;
    width: 50px;
    cursor: pointer;
  }
  .button--filter:hover {
    background-color: #ffffff77;
  }
`;

export default Incomes;
