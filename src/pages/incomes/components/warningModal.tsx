import Modal from "react-modal";
import { FC } from "react";
import { Income } from "../../../types/models";
import { useSupabase } from "../../../hooks/useSupabase";
import styled from "styled-components";
import { customStyles } from "../../../utils/constants";
import { incomeTypeID } from "../constants";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  income: Income;
  values: any;
};

const WarningModal: FC<Props> = ({ isOpen, onClose, income, values, onConfirm }) => {
  const { supabase } = useSupabase();

  async function handleSubmit() {
    await supabase.from('incomes').delete().eq('id', income.id);

    if (values.type !== incomeTypeID.tithe) values.memberID = null;

    await supabase.from('incomes').insert({ ...values, currentDebt: 0, paidAmount: 0, status: '', loanName: '' })

    onClose();
    onConfirm();
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
          Hay pagos asociados al préstamo <span>"{income.loanName}"</span>, al
          <br /> cambiar el tipo de ingreso, se borrará definitivamente
          <br /> todo pago relacionado con este préstamo.
          <br />
          ¿Está seguro de que desea continuar?
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
    font-family: Poppins, Arial, Helvetica, sans-serif;
    
  }
  p {
    font-size:15px;
    margin: 0;
    margin-bottom: 20px;
    font-family: Poppins, Arial, Helvetica, sans-serif;
  }
  span {
    font-style:italic;
    font-family: Poppins, Arial, Helvetica, sans-serif;
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
