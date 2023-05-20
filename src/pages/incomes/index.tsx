import styled from "styled-components";
import Table from "../../components/table";
import React from "react";
import Modal from "react-modal";
import FormIncomesModal from "./components/formModal";

function Incomes() {
  // const tabs = [
  //   {
  //     id: "new-income",
  //     name: "Historial",
  //     content: <Table />,
  //   },
  //   {
  //     id: "form",
  //     name: "Agregar ingreso",
  //     content: (
  //       <form>
  //         <label> Formulario para agregar ingresos</label>
  //       </form>
  //     ),
  //   },
  // ];
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
  };

  const [modalIsOpen, setIsOpen] = React.useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <Wrapper>
      {/* <Tab tabs={tabs} /> */}
      <nav>
        <button className="button--addIncome" onClick={openModal}>
          Agregar ingreso
        </button>
        <input type="text" />
        <button className="button--filter">
          <img alt="filter icon" src="assets/images/filter-icon.png" />
        </button>
      </nav>
      <Modal
        isOpen={modalIsOpen}
        // onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Experimentacion con React Modal"
      >
        <FormIncomesModal closeModal={closeModal} />
        {/* <button onClick={closeModal}>Cerrar</button> */}
      </Modal>

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
