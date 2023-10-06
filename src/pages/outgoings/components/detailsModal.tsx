import Modal from "react-modal";
import { FC, useEffect, useState } from "react";
import styled from "styled-components";
import { FaRegUserCircle } from "react-icons/fa";
import { GrClose } from "react-icons/gr";
import {
  capitalize,
  formatDate,
  formatLongDate,
  formatMoney,
  getOutgoingDescription,
} from "../../../utils/helper";
import { TableOutgoing } from "../../../types/models";
import { outgoingTypeID } from "../constants";
import { customStyles } from "../../../utils/constants";
import { CModal, CModalBody, CModalHeader, CModalTitle } from "@coreui/react";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  outgoing?: TableOutgoing;
};

const DetailsModal: FC<Props> = ({ isOpen, onClose, outgoing }) => {
  let description = "";
  if (outgoing) {
    description = getOutgoingDescription(outgoing);
  }

  return (
    <CModal visible={isOpen} onClose={onClose}>
      <Wrapper>
        <CModalHeader>
          <CModalTitle>
            {description}
          </CModalTitle>
        </CModalHeader>
        <CModalBody>
          <section className="side">
            <p className="title">Monto</p>
            <p>{formatMoney(outgoing?.amount || null)}</p>
          </section>
          <section className="side">
            <p className="title">Fecha</p>
            <p>{formatDate(outgoing?.date || null)}</p>
          </section>
          <section className="side">
            <p className="title">Tipo de egreso</p>
            <p>{capitalize(outgoing?.outgoingTypes?.name || "")}</p>
          </section>
          <section className="side">
            <p className="title">
              {outgoing?.type === outgoingTypeID.loan
                ? "Acreedor"
                : "Beneficiario"}
            </p>
            <p>{capitalize(outgoing?.people?.name || "")}</p>
          </section>
          {outgoing?.type === outgoingTypeID.loan ? (
            <>
              <section className="side">
                <p className="title">Deuda inicial</p>
                <p>{formatMoney(outgoing?.incomes.amount || null)}</p>
              </section>
              <section className="side">
                <p className="title">Deuda restante</p>
                <p>{formatMoney(outgoing?.incomes.currentDebt || null)}</p>
              </section>
              <section className="side">
                <p className="title">Total abonado</p>
                <p>{formatMoney(outgoing?.incomes.paidAmount || null)}</p>
              </section>
            </>
          ) : null}

          {outgoing?.description && (
            <section className="side">
              <p className="title">Descripción</p>
              <p>{capitalize(outgoing?.description || '')}</p>
            </section>
          )}

          <section className="side">
            <p className="title">Creación</p>
            <div className="user-info">
              <p>
                {capitalize(outgoing?.createdBy || "")}.{" "}
                {formatLongDate(outgoing?.createdDate || null)}
              </p>
            </div>
          </section>
          {outgoing?.modifiedAt !== null && (
            <section className="side">
              <p className="title">Última modificación</p>
              <div className="user-info">
                <p>
                  {capitalize(outgoing?.modifiedBy || "")}.{" "}
                  {formatLongDate(outgoing?.modifiedAt || null)}
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
