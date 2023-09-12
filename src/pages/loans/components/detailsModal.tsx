import Modal from "react-modal";
import { FC } from "react";
import styled from "styled-components";
import { FaRegUserCircle } from "react-icons/fa";
import { GrClose } from "react-icons/gr";
import {
  capitalize,
  formatDate,
  formatLongDate,
  formatMoney,
} from "../../../utils/helper";
import { customStyles } from "../../../utils/constants";
import { TableIncome } from "../../../types/models";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  income: TableIncome;
};

const DetailsModal: FC<Props> = ({ isOpen, onClose, income }) => {
  return (
    <Modal
      ariaHideApp={false}
      isOpen={isOpen}
      onRequestClose={onClose}
      style={customStyles}>
      <Wrapper>
        <div className="concept-container">
          <h3>{capitalize(income.loanName || "")}</h3>
        </div>

        <section className="side">
          <p className="title">Date</p>
          <p>{formatDate(income.date || "—")}</p>
        </section>

        <section className="side">
          <p className="title">Creditor</p>
          <p>{capitalize(income.people.name || "")}</p>
        </section>

        <section className="side">
          <p className="title">Initial Amount</p>
          <p>{formatMoney(income.amount || null)}</p>
        </section>

        <section className="side">
          <p className="title">Current Debt</p>
          <p>{formatMoney(income.currentDebt || null)}</p>
        </section>

        <section className="side">
          <p className="title">Paid Amount</p>
          <p>{formatMoney(income.paidAmount || null)}</p>
        </section>

        <section className="side">
          <p className="title">Created</p>
          <div className="user-info">
            <FaRegUserCircle size={30} />
            <p>
              {capitalize(income.createdBy || "")}.{" "}
              {formatLongDate(income.createdDate || null)}
            </p>
          </div>
        </section>
        {income.updatedDate !== null && (
          <section className="side">
            <p className="title">Last modification</p>
            <div className="user-info">
              <FaRegUserCircle size={30} />
              <p>
                {capitalize(income.updatedBy || "")}.{" "}
                {formatLongDate(income.updatedDate || null)}
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
