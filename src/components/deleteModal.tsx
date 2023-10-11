import { FC } from "react";
import styled from "styled-components";
import { useSupabase } from "../hooks/useSupabase";
import { CButton, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle } from "@coreui/react";

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
    <CModal visible={isOpen} onClose={onClose}>
      <Wrapper>
        <CModalHeader>
          <CModalTitle>
            ¡CUIDADO!
          </CModalTitle>
        </CModalHeader>
        <CModalBody>
          <h1>¿Seguro que quieres eliminar este registro?</h1>
          {message ? (<p>
            {message}
          </p>) : (<>
            <p>
              Este registro se eliminará permanentemente.
              <br/>
              Esta acción no se puede
              deshacer.
            </p>
          </>)}
        </CModalBody>
        <CModalFooter>
          <div className="buttons-container">
            <CButton color="warning" size="sm" className="cancel" onClick={onClose}>
              Cancelar
            </CButton>
            <CButton color="secondary" size="sm" onClick={deleteItem}>Confirmar</CButton>
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
    font-size: 14px;
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

  @media only screen and (max-width:700px){  
    h1 {
      font-size: 14px;
    }

    p {
      font-size: 13px;
    }

    button {
      font-size: 13px;
    }
  }

`;
export default DeleteModal;
