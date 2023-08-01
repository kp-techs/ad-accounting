import Modal from "react-modal";
import { FC } from "react";
import styled from "styled-components";
import { FaRegUserCircle } from "react-icons/fa";
import { GrClose } from "react-icons/gr";
import {
  formatDate,
  formatLongDate,
  formatMoney,
  generateConcept,
  generateDescription,
} from "../../../utils/helper";
import { TableOutgoing } from "../../../types/models";
import { customStyles, outgoingTypeID } from "../constants";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  outgoing?: TableOutgoing;
};

const DetailsModal: FC<Props> = ({ isOpen, onClose, outgoing }) => {
  let description = "";
  if (outgoing) {
    description = generateDescription(outgoing);
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
          <h3>{description}</h3>
        </div>
        <section className="side">
          <p className="title">Monto</p>
          <p>{formatMoney(outgoing?.amount || null)}</p>
        </section>
        <section className="side">
          <p className="title">Fecha</p>
          <p>{formatDate(outgoing?.date || null)}</p>
        </section>
        <section className="side">
          <p className="title">Tipo de ingreso</p>
          <p>{outgoing?.outgoingTypes.name}</p>
        </section>
        <section className="side">
          <p className="title">{outgoing?.type === outgoingTypeID.loan?'Acreedor':'Beneficiario'}</p>
          <p>{outgoing?.beneficiaries.name}</p>
        </section>
        {outgoing?.type === outgoingTypeID.loan ? (
          <>
          <section className="side">
            <p className="title">Deuda inicial</p>
              <p>{outgoing?.loans?.initialLoanAmount}</p>
          </section>
          <section className="side">
            <p className="title">Deuda restante</p>
              <p>{outgoing?.loans?.currentLoanAmount}</p>
            </section>
            <section className="side">
            <p className="title">Total abonado</p>
              <p>{outgoing?.loans?.paidAmount}</p>
            </section>
          </>
        ):null}

        <section className="side">
          <p className="title">Creación</p>
          <div className="user-info">
            <FaRegUserCircle size={30} />
            <p>
              {outgoing?.createdBy}. {formatLongDate(outgoing?.createdDate || null)}
            </p>
          </div>
        </section>
        {outgoing?.modifiedAt !== null && (
          <section className="side">
            <p className="title">Última modificación</p>
            <div className="user-info">
              <FaRegUserCircle size={30} />
              <p>
                {outgoing?.modifiedBy}.{" "}
                {formatLongDate(outgoing?.modifiedAt || null)}
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
`;
export default DetailsModal;
