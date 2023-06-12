import Modal from "react-modal";
import React, { FC } from "react";
import { customStyles } from "../constants";
import styled from "styled-components";
import { FaRegUserCircle } from "react-icons/fa";
import { GrClose } from "react-icons/gr";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

const DetailsModal: FC<Props> = ({ isOpen, onClose }) => {
  return (
    <Modal
      ariaHideApp={false}
      isOpen={true}
      onRequestClose={onClose}
      style={customStyles}
      contentLabel="Modal para ver detalles"
    >
      <Wrapper>
        <section className="side">
          <FaRegUserCircle size={50} />
          <h4>Admin</h4>
        </section>
        <section className="side">
          <p>Diezmo: Rocio Aybar</p>
          <p>Lorem Ipsum description.</p>
        </section>
        <section className="side">
          <div>
            <p className="title">Creador:</p>
            <p>fulano@dominio.com</p>
          </div>
          <div>
            <p className="title">Fecha:</p>
            <p>21 de Mayo, 2023</p>
          </div>
        </section>
        <section className="side">
          <div>
            <p className="title">Actualizado:</p>
            <p>fulano@dominio.com</p>
          </div>
          <div>
            <p className="title">Fecha:</p>
            <p>21 de Mayo, 2023</p>
          </div>
        </section>
        <section className="side">
          <section>
            <h4 className="h-amount">Monto</h4>
            <p id="p-amount">RD $ 6,000.00</p>
          </section>
        </section>

        <button onClick={onClose}>
          <GrClose />
        </button>
      </Wrapper>
    </Modal>
  );
};

const Wrapper = styled.div`
  font-family: Poppins;
  display: grid;
  grid-template-columns: auto 1fr 1fr 1fr 1fr;
  width: 1225px;
  gap: 25px;
  align-items: center;

  div {
    display: flex;
    gap: 5px;
  }

  .title {
    width: 100px;
    text-align: right;
  }

  .h-amount {
    color: #273b6c;
  }
  .p-amount {
    font-style: italic;
  }

  button {
    top: 10px;
    right: 10px;
    position: absolute;
    background-color: transparent;
    border: 0px;
  }
`;
export default DetailsModal;
