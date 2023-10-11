import Modal from "react-modal";
import { FC } from "react";
import { User } from "../../../types/models";
import { useSupabase } from "../../../hooks/useSupabase";
import styled from "styled-components";
import useAppData from "../../../hooks/useAppData";
import { customStyles } from "../../../utils/constants";
import { CButton, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle } from "@coreui/react";

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
    <CModal size="lg" visible={isOpen} onClose={onClose}>
      <Wrapper>
        <CModalHeader>
          <CModalTitle>
            ¡CUIDADO!
          </CModalTitle>
        </CModalHeader>
        <CModalBody>
          <h1>
            ¿Seguro que desea convertir a {user?.name || "esta persona"} en{" "}
            {newValue}?
          </h1>
          <p>
            El cambio de roles implica cambiar las restrincciones de acceso que
            esta persona posee.
          </p>
          <CModalFooter>

            <div className="buttons-container">
              <CButton size="sm" color="warning" className="cancel" onClick={onClose}>
                Cancelar
              </CButton>
              <CButton size="sm" color="secondary" onClick={switchRol}>Confirmar</CButton>
            </div>
          </CModalFooter>
        </CModalBody>
      </Wrapper>
    </CModal>
  );
};

const Wrapper = styled.div`
  text-align: center;
  margin: 10px;
  font-family: Poppins, Arial, Helvetica, sans-serif;

  h1{
    font-size: 17px;
  }
  
  p {
    font-size: 15px;
    margin: 0;
    font-family: Poppins, Arial, Helvetica, sans-serif;
    margin-bottom: 10px;
  }

  .buttons-container {
    display: flex;
    height: 40px;
    justify-content: end;
  }

  .cancel {
    margin-right: 8px;
  }

  @media only screen and (max-width:700px){  
    h1 {
      font-size: 14px;
    }

    p {
      font-size: 12px;
    }

    button {
      font-size: 11px;
    }
  }
`;
export default RolModal;
