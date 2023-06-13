import Modal from "react-modal";
import { FC } from "react";
import { customStyles, incomeTypeID } from "../constants";
import styled from "styled-components";
import { FaRegUserCircle } from "react-icons/fa";
import { GrClose } from "react-icons/gr";
import { TableIncome } from "../../../types/models";
import {
  formatLongDate,
  formatMoney,
  formatRelativeDate,
  generateConcept,
} from "../../../utils/helper";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  income?: TableIncome;
};

const DetailsModal: FC<Props> = ({ isOpen, onClose, income }) => {
  let concept = "";
  if (income) {
    concept = generateConcept(income);
  }

  return (
    <Modal
      ariaHideApp={false}
      isOpen={isOpen}
      onRequestClose={onClose}
      style={customStyles}
      contentLabel="Modal para ver detalles"
    >
      <Wrapper>
        <div className="concept-container">
          <h3>{concept}</h3>
        </div>
        <section className="side">
          <p className="title">Creación</p>
          <div className="user-info">
            <FaRegUserCircle size={30} />
            <p>{income?.createdBy}</p>
          </div>
        </section>
        <section className="side">
          <p className="title">Fecha</p>
          <p>{formatLongDate(income?.createdDate || null)}</p>
        </section>
        <section className="side">
          <p className="title">Tipo de ingreso</p>
          <p>{income?.incomeTypes.name}</p>
        </section>
        {income?.type === incomeTypeID.tithe ? (
          <section className="side">
            <p className="title">Diezmante</p>
            <p>{income.tithing.name}</p>
          </section>
        ) : income?.type === incomeTypeID.event ? (
          <>
            <section className="side">
              <p className="title">Ministerio</p>
              <p>{income.ministries.name}</p>
            </section>
            <section className="side">
              <p className="title">Actividad</p>
              <p>{income?.eventName || "No especificado"}</p>
            </section>
          </>
        ) : null}
        <section className="side">
          <p className="title">Monto</p>
          <p>{formatMoney(income?.amount || null)}</p>
        </section>

        {income?.updatedDate !== null && (
          <section className="side">
            <p className="title">Última modificación</p>
            <div>
              <p>
                {income?.updatedBy},{" "}
                {formatRelativeDate(income?.updatedDate || null)}
              </p>
            </div>
          </section>
        )}

        <button onClick={onClose}>
          <GrClose />
        </button>
      </Wrapper>
    </Modal>
  );
};

const Wrapper = styled.div`
  font-family: Poppins;
  font-size: 14px;
  color: #000000b1;
  padding: 10px;
  width: 300px;
  display: grid;
  gap: 10px;

  .concept-container {
    border-bottom: 1px solid black;
    padding-bottom: 5px;
    h3 {
      margin: 0;
    }
  }
  .side {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 7px;
    height: 40px;
  }

  .title {
    font-weight: 600;
  }

  .user-info {
    display: flex;
    gap: 5px;
    align-items: center;
  }

  button {
    top: 15px;
    right: 15px;
    position: absolute;
    background-color: transparent;
    border: 0px;
  }
`;
export default DetailsModal;
