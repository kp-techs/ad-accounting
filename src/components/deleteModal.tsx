import Modal from "react-modal";
import React, { FC } from "react";
import styled from "styled-components";
import { useSupabase } from "../hooks/useSupabase";
import { customStyles } from "../utils/constants";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  id: number;
  tableName: string;
  onSucess: () => void;
  message?: string;
};

const DeleteModal: FC<Props> = ({
  isOpen,
  onClose,
  id,
  tableName,
  onSucess,
  message
}) => {
  const { supabase } = useSupabase();

  async function deleteItem() {
    await supabase.from(tableName).delete().eq("id", id);
    onSucess();
    onClose();
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
          {message || `Este registro se eliminará permanentemente. Esta acción no se puede
          deshacer.`}
        </p>
        <div className="buttons-container">
          <button className="cancel" onClick={onClose}>
            Cancelar
          </button>
          <button onClick={deleteItem}>Confirmar</button>
        </div>
      </Wrapper>
    </Modal>
  );
};

const Wrapper = styled.div`
  width: 450px;
  text-align: center;
  margin: 10px;
  font-family: Poppins, Arial, Helvetica, sans-serif;
  
  h3 {
    margin: 5px;
    font-family: Poppins, Arial, Helvetica, sans-serif;
  }
  p {
    margin: 0;
    margin-bottom: 20px;
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
export default DeleteModal;
