import Modal from "react-modal";
import React, { FC } from "react";
import { Income } from "../../../types/models";
import { useSupabase } from "../../../hooks/useSupabase";
import useAppData from "../../../hooks/useAppData";
import styled from "styled-components";
import { customStyles } from "../../../utils/constants";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  income?: Income;
};

const WarningModal: FC<Props> = ({ isOpen, onClose, income }) => {
  function handleSubmit() {
    return ''
  }

  //TO DO: Terminar este modal de advertencia si intentan cambiar el tipo a un prestamo.
  return (
    <Modal
      ariaHideApp={false}
      isOpen={isOpen}
      onRequestClose={onClose}
      style={customStyles}
      contentLabel="Formulario para registrar ingresos"
    >
      <Wrapper>
        <h3>¡CUIDADO!</h3>
        <p>
          Hay pagos asociados a este préstamo, si cambias el tipo de ingreso, se borrará también todo pago relacionado con este préstamo.
          <br />
          ¿Esta seguro de que desea continuar?
        </p>
        <div className="buttons-container">
          <button className="cancel" onClick={onClose}>
            Cancelar
          </button>
          <button className="submit" onClick={handleSubmit}>
            Confirmar
          </button>

        </div>
      </Wrapper>
    </Modal>
  );
};

const Wrapper = styled.div`
  width: 450px;
  text-align: center;
  margin: 10px;

  h3 {
    margin: 5px;
  }
  p {
    margin: 0;
    margin-bottom: 20px;
  }

  .buttons-container {
    display: flex;
    justify-content: center;
    grid-area: right;
    gap: 15px;

    .cancel {
      background-color: #273b6c;
      color: #ffffff;
      &:active {
        color: #000000;
      }
    }
    button {
      width: 93px;
      height: 30px;
      text-align: center;
      justify-content: center;
      font-size: 14px;
      box-sizing: border-box;
      background-color: #eeeeee;
      border-radius: 5px;
      font-family: Poppins, Arial, Helvetica, sans-serif;
      border: 0;
      cursor: pointer;
      &:active {
        background-color: #f5f5f5ad;
      }
    }
  }
`;
export default WarningModal;
