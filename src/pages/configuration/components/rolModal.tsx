import Modal from "react-modal";
import { FC } from "react";
import {  User } from "../../../types/models";
import { useSupabase } from "../../../hooks/useSupabase";
import styled from "styled-components";
import { customStyles } from "../../incomes/constants";
import useAppData from "../../../hooks/useAppData";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  user?: User;
  newValue?: string;
};

const RolModal: FC<Props> = ({ isOpen, onClose, user, newValue }) => {
  const { supabase } = useSupabase();
  const { loadUsers } = useAppData();

  async function switchRol() {
    if (user) {
      await supabase.from("users").update({ role: newValue }).eq("id", user.id);
      loadUsers();
      onClose();
    }
  }

  return (
    <Modal
      ariaHideApp={false}
      isOpen={isOpen}
      onRequestClose={onClose}
      style={customStyles}
    >
      <Wrapper>
        <h4>¿Seguro que desea convertir a {user?.name || 'esta persona'} en { newValue}?</h4>
        <p>
          El cambio de roles implica cambiar las restrincciones de acceso que esta persona posee.
        </p>
        <div className="buttons-container">
          <button className="cancel" onClick={onClose}>
            Cancelar
          </button>
          <button onClick={switchRol}>Confirmar</button>
        </div>
      </Wrapper>
    </Modal>
  );
};

const Wrapper = styled.div`
  width: 350px;
  text-align: center;
  margin: 10px;

  h4 {
    margin: 5px;

  }
  p {
    margin: 0;
    margin-bottom: 20px;
    font-size: 13px;
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
export default RolModal;
