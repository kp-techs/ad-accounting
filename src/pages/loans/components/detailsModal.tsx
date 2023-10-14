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
import { CModal, CModalBody, CModalHeader, CModalTitle } from "@coreui/react";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  income: TableIncome;
};

const DetailsModal: FC<Props> = ({ isOpen, onClose, income }) => {
  return (
    <CModal visible={isOpen} onClose={onClose}>
      <Wrapper>
        <CModalHeader>
          <CModalTitle>
          {capitalize(income.loanName || "")}
          </CModalTitle>
        </CModalHeader>
        <CModalBody>
        <section className="side">
          <p className="title">Fecha</p>
          <p>{formatDate(income.date || "—")}</p>
        </section>

        <section className="side">
          <p className="title">Acreedor</p>
          <p>{capitalize(income.people.name || "")}</p>
        </section>

        <section className="side">
          <p className="title">Deuda Inicial</p>
          <p>{formatMoney(income.amount || null)}</p>
        </section>

        <section className="side">
          <p className="title">Deuda Restante</p>
          <p>{formatMoney(income.currentDebt || null)}</p>
        </section>

        <section className="side">
          <p className="title">Total Pagado</p>
          <p>{formatMoney(income.paidAmount || null)}</p>
        </section>

        <section className="side">
          <p className="title">Creación</p>
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
            <p className="title">Última modificación</p>
            <div className="user-info">
              <FaRegUserCircle size={30} />
              <p>
                {capitalize(income.updatedBy || "")}.{" "}
                {formatLongDate(income.updatedDate || null)}
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

  button {
    top: 15px;
    right: 15px;
    position: absolute;
    background-color: transparent;
    border: 0px;
  }
`;
export default DetailsModal;
