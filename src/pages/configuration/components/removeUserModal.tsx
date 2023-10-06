import { FC } from "react";
import { User } from "../../../types/models";
import { useSupabase } from "../../../hooks/useSupabase";
import styled from "styled-components";
import useAppData from "../../../hooks/useAppData";
import { CButton, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle } from "@coreui/react";


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
    <CModal visible={isOpen} onClose={onClose}>
      <Wrapper>
        <CModalHeader>
          <CModalTitle>
            ¡CUIDADO!
          </CModalTitle>
        </CModalHeader>
        <CModalBody>
          <h1>¿Seguro que desea eliminar a {user?.name || "este usuario"}?</h1>
          <p>
            Este usuario se eliminaráaaa permanentemente. <br/> Esta acción no se puede
            deshacer.
          </p>
        </CModalBody>
        <CModalFooter>
          <div className="buttons-container">
            <CButton color="warning" size="sm" className="cancel" onClick={onClose}>
              Cancelar
            </CButton>
            <CButton color="secondary" size="sm" onClick={deleteUser}>Confirmar</CButton>
          </div>
        </CModalFooter>
      </Wrapper>
    </CModal>
  );
};

const Wrapper = styled.div`
  text-align: center;
  margin: 10px;
  font-family: Poppins, Arial, Helvetica, sans-serif;

  h1{
    font-size: 18px;
  }
  
  p {
    font-size: 15px;
    margin: 0;
    font-family: Poppins, Arial, Helvetica, sans-serif;
  }

  .buttons-container {
    display: flex;
    height: 40px;
    justify-content: end;
  }

  .cancel {
    margin-right: 8px;
  }
`;
export default DeleteUserModal;
