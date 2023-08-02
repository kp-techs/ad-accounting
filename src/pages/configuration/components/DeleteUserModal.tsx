import Modal from "react-modal";
import { FC } from "react";
import {  User } from "../../../types/models";
import { useSupabase } from "../../../hooks/useSupabase";
import styled from "styled-components";
import { customStyles } from "../../incomes/constants";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  user?: User;
};

const DeleteUserModal: FC<Props> = ({ isOpen, onClose, user }) => {
  const { supabase } = useSupabase();

  async function deleteUser() {
    if (user) {
      await supabase.from("users").update({ active: false }).eq("id", user.id);
      await supabase.auth.admin.deleteUser(user.id);
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
        <h3>¿Seguro que desea eliminar a { user?.name || 'este usuario'}?</h3>
        <p>
          Este usuario se eliminará permanentemente. Esta acción no se puede
          deshacer.
        </p>
        <div className="buttons-container">
          <button className="cancel" onClick={onClose}>
            Cancelar
          </button>
          <button onClick={deleteUser}>Confirmar</button>
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
export default DeleteUserModal;
