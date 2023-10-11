import Modal from "react-modal";
import { FC } from "react";
import { incomeTypeID } from "../constants";
import styled from "styled-components";
import { FaRegUserCircle } from "react-icons/fa";
import { GrClose } from "react-icons/gr";
import { TableIncome } from "../../../types/models";
import {
  capitalize,
  formatDate,
  formatLongDate,
  formatMoney,
  generateConcept,
} from "../../../utils/helper";
import { customStyles } from "../../../utils/constants";
import { CModal, CModalBody, CModalHeader, CModalTitle } from "@coreui/react";

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
    <CModal visible={isOpen} onClose={onClose}>
      <Wrapper>
        <CModalHeader>
          <CModalTitle className="sm">
            {concept}
          </CModalTitle>
        </CModalHeader>
        <CModalBody>
        <section className="side">
          <p className="title">Monto</p>
          <p>{formatMoney(income?.amount || null)}</p>
        </section>
        <section className="side">
          <p className="title">Fecha</p>
          <p>{formatDate(income?.date || null)}</p>
        </section>
        <section className="side">
          <p className="title">Tipo de ingreso</p>
          <p>{income?.incomeTypes.name}</p>
        </section>
        {income?.type === incomeTypeID.tithe ? (
          <section className="side">
            <p className="title">Diezmante</p>
            <p>{capitalize(income.people.name || "")}</p>
          </section>
        ) : income?.type === incomeTypeID.event ? (
          <>
            <section className="side">
              <p className="title">Ministerio</p>
              <p>{capitalize(income.ministries.name || "")}</p>
            </section>
            <section className="side">
              <p className="title">Actividad</p>
              <p>{capitalize(income?.eventName || "No especificado")}</p>
            </section>
          </>
        ) : income?.type === incomeTypeID.loan ? (
          <>
            <section className="side">
              <p className="title">Nombre</p>
              <p>{capitalize(income?.loanName || "")}</p>
            </section>
            <section className="side">
              <p className="title">Acreedor</p>
              <p>{capitalize(income?.people.name || "")}</p>
            </section>
          </>
        ) : null}
        {income?.comment && (
          <section className="side">
            <p className="title">Comentario</p>
            <p>{capitalize(income?.comment || "")}</p>
          </section>
        )}

        <section className="side">
          <p className="title">Creación</p>
          <div className="user-info">

            <p>
              {capitalize(income?.createdBy || "")}.{" "}
              {formatLongDate(income?.createdDate || null)}
            </p>
          </div>
        </section>
        {income?.updatedDate !== null && (
          <section className="side">
            <p className="title">Última modificación</p>
            <div className="user-info">

              <p>
                {capitalize(income?.updatedBy || "")}.{" "}
                {formatLongDate(income?.updatedDate || null)}
              </p>
            </div>
          </section>
        )}

        </CModalBody>
      </Wrapper>
    </CModal>
  );
};

const Wrapper = styled.div`
  font-family: Poppins;
  font-size: 14px;
  color: #000000b1;
  padding: 10px;
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
    grid-template-columns: 150px 1fr;
    gap: 5px;
  }

  .title {
    font-weight: 600;
  }

  .user-info {
    display: flex;
    gap: 5px;
    align-items: center;
  }

  .buttons-container {
    display: flex;
    height: 40px;
    justify-content: end;
  }

  @media only screen and (max-width:700px) { 
    font-size: 12px;

    .sm {
      font-size: 16px;
    }
  }
`;
export default DetailsModal;
