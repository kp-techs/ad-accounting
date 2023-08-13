import Modal from "react-modal";
import { FC } from "react";
import { useSupabase } from "../../../hooks/useSupabase";
import useAppData from "../../../hooks/useAppData";
import styled from "styled-components";
import { Loans } from "../../../types/models";
import { customStyles } from "../constant";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  loan?: Loans;
};

const DeleteLoanModal: FC<Props> = ({ isOpen, onClose, loan }) => {
  const { supabase } = useSupabase();
  const { loadIncomes, loadLoans, loadOuts } = useAppData();

  async function deleteLoan() {
    if (loan) {
      await supabase.from("outgoings").delete().eq("loanID", loan.id);
      await supabase.from("incomes").delete().eq("loanID", loan.id);
      await supabase.from("loans").delete().eq("id", loan.id);
      loadLoans();
      loadOuts();
      loadIncomes();
      onClose();
    }
  }

  return (
    <Modal
      ariaHideApp={false}
      isOpen={isOpen}
      onRequestClose={onClose}
      style={customStyles}
      contentLabel="Formulario para registrar ingresos"
    >
      <Wrapper>
        <h3>¿Seguro que quieres eliminar este registro?</h3>
        <p>
          Este registro se eliminará permanentemente. Esta acción no se puede
          deshacer.
        </p>
        <div className="buttons-container">
          <button className="cancel" onClick={onClose}>
            Cancelar
          </button>
          <button onClick={deleteLoan}>Confirmar</button>
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
export default DeleteLoanModal;
