import Modal from "react-modal";
import  { FC } from "react";
import { useSupabase } from "../../../hooks/useSupabase";
import useAppData from "../../../hooks/useAppData";
import styled from "styled-components";
import { customStyles } from "../constants";
import { Outgoing } from "../../../types/models";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  outgoing?: Outgoing;
};

const DeleteModal: FC<Props> = ({ isOpen, onClose, outgoing }) => {
  const { supabase } = useSupabase();
  const { loadOuts } = useAppData();

  async function deleteIncome() {
    if (outgoing) {
      await supabase.from("outgoings").delete().eq("id", outgoing.id);
      onClose();
      loadOuts();
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
          <button onClick={deleteIncome}>Confirmar</button>
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
export default DeleteModal;