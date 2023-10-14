import Modal from "react-modal";
import { FC, useState } from "react";
import styled from "styled-components";
import { useSupabase } from "../../../hooks/useSupabase";
import useAppData from "../../../hooks/useAppData";
import { CButton, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle } from "@coreui/react";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

const EditProfileModal: FC<Props> = ({ isOpen, onClose }) => {
  const { profile } = useAppData();
  const { supabase } = useSupabase();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  return (
    <CModal visible={isOpen} onClose={onClose}>
      <Wrapper>
        <CModalHeader>
          <CModalTitle>
            MODIFICAR USUARIO
          </CModalTitle>
        </CModalHeader>
        <CModalBody>
            <div>
          <form
            className="form-widget"
            onSubmit={async () => {
              email && (await supabase.auth.updateUser({ email }));
              name &&
                (await supabase.auth.updateUser({ data: { name: name } }));
            }}
          >

            <section className="body-modal">
              <div className="form-field">
                <label htmlFor="name">Nombre</label>
                <input
                  id="name"
                  type="text"
                  placeholder={profile?.name || name}
                  onFocus={(e) => (e.target.value = "")}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="form-field">
                <label htmlFor="email">Correo</label>
                <input
                  id="email"
                  type="email"
                  placeholder={profile?.email || email}
                  onFocus={(e) => (e.target.value = "")}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </section>
            <CModalFooter>
							<CButton size='sm' color='secondary'>Cancelar</CButton>
							<CButton size='sm' color='warning' className="send">Enviar</CButton>
						</CModalFooter>
          </form>
        </div>
        </CModalBody>
     
      </Wrapper>
    </CModal>
  );
};
const Wrapper = styled.div`
  form {
    display: flex;
    flex-direction: column;
    gap: 10px;
    color: #000000;
    font-family: Poppins, Arial, Helvetica, sans-serif;
  }
  .head-modal {
    border-bottom: 1px gray solid;
  }
  input,
  select,
  textarea {
    font-family: Poppins, Arial, Helvetica, sans-serif;
    font-size: 14px;
    width: 100%;
    background-color: hsl(0, 0%, 100%);
    border-radius: 4px;
    border: 1px;
    border-color: hsl(0, 0%, 80%);
    border-style: solid;
    outline: 0;
    padding: 2px 8px;
    box-sizing: border-box;
    color: #2f2f2f;
  }

  input,
  select {
    height: 30px;
  }

  .form-field {
    margin-bottom: 10px;
  }

	.buttons-container {
    display: flex;
    height: 40px;
    justify-content: end;
  }
  .send {
	padding: 4px 19.06px;
  }
`;

export default EditProfileModal;
