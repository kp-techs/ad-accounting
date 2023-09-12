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
          <p className="title">Amount</p>
          <p>{formatMoney(income?.amount || null)}</p>
        </section>
        <section className="side">
          <p className="title">Date</p>
          <p>{formatDate(income?.date || null)}</p>
        </section>
        <section className="side">
          <p className="title">Tipo de ingreso</p>
          <p>{income?.incomeTypes.name}</p>
        </section>
        {income?.type === incomeTypeID.tithe ? (
          <section className="side">
            <p className="title">Tithing</p>
            <p>{capitalize(income.people.name || "")}</p>
          </section>
        ) : income?.type === incomeTypeID.event ? (
          <>
            <section className="side">
              <p className="title">Ministry</p>
              <p>{capitalize(income.ministries.name || "")}</p>
            </section>
            <section className="side">
              <p className="title">Event Name</p>
              <p>{capitalize(income?.eventName || "")}</p>
            </section>
          </>
        ) : income?.type === incomeTypeID.loan ? (
          <>
            <section className="side">
              <p className="title">Name</p>
              <p>{capitalize(income?.loanName || "")}</p>
            </section>
            <section className="side">
              <p className="title">Creditor</p>
              <p>{capitalize(income?.people.name || "")}</p>
            </section>
          </>
        ) : null}
        {income?.comment && (
          <section className="side">
            <p className="title">Comment</p>
            <p>{capitalize(income?.comment || "")}</p>
          </section>
        )}

        <section className="side">
          <p className="title">Created</p>
          <div className="user-info">

            <p>
              {capitalize(income?.createdBy || "")}.{" "}
              {formatLongDate(income?.createdDate || null)}
            </p>
          </div>
        </section>
        {income?.updatedDate !== null && (
          <section className="side">
            <p className="title">Last modification</p>
            <div className="user-info">

              <p>
                {capitalize(income?.updatedBy || "")}.{" "}
                {formatLongDate(income?.updatedDate || null)}
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

  button {
    top: 15px;
    right: 15px;
    position: absolute;
    background-color: transparent;
    border: 0px;
  }
  @media only screen and (max-width:700px){ 
    width: 80vw;

    button {
      font-size: 12px;
      width: 30px;
      height: 10px;
    }

    .fields-container {
      display: grid;
      grid-template-columns: 1fr;
      gap: 1rem;}
  }

  .selectType-container {
    display: grid;
    grid-template-columns: 1fr;
    box-sizing: border-box;
    margin:0;
    padding:0;
  }}
`;
export default DetailsModal;
