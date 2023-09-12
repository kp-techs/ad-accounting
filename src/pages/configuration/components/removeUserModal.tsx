import Modal from "react-modal";
import { FC } from "react";
import { User } from "../../../types/models";
import { useSupabase } from "../../../hooks/useSupabase";
import styled from "styled-components";
import useAppData from "../../../hooks/useAppData";
import { customStyles } from "../../../utils/constants";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  user?: User;
};

const DeleteUserModal: FC<Props> = ({ isOpen, onClose, user }) => {
  const { supabase } = useSupabase();
  const { loadUsers } = useAppData();

  async function deleteUser() {
    if (user) {
      await supabase.from("users").update({ active: false }).eq("id", user.id);
      await supabase.auth.admin.deleteUser(user.id);
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
        <h3>¿Seguro que desea eliminar a {user?.name || "este usuario"}?</h3>
        <p>
          Este usuario se eliminará permanentemente. Esta acción no se puede
          deshacer.
        </p>
        <div className="buttons-container">
          <button className="cancel" onClick={onClose}>
            Cancel
          </button>
          <button onClick={deleteUser}>Confirme</button>
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
  @media only screen and (max-width:700px){ 
    width: 80vw;

    button {
      font-size: 12px;
      width: 30px;
      height: 10px;
    }

    .fields-container {
      display: grid;
      grid-template-columns: 1fr;
      gap: 1rem;}
  }

  .selectType-container {
    display: grid;
    grid-template-columns: 1fr;
    box-sizing: border-box;
    margin:0;
    padding:0;
  }}
`;
export default DeleteUserModal;
