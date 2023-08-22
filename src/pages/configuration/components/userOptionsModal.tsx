import Modal from "react-modal";
import { FC, useState } from "react";
import styled from "styled-components";
import { useSupabase } from "../../../hooks/useSupabase";
import useAppData from "../../../hooks/useAppData";
import { customStyles } from "../../../utils/constants";

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
    <Modal
      ariaHideApp={false}
      isOpen={isOpen}
      onRequestClose={onClose}
      style={customStyles}
    >
      <Wrapper>
        <div>
          <form
            className="form-widget"
            onSubmit={async () => {
              email && (await supabase.auth.updateUser({ email }));
              name &&
                (await supabase.auth.updateUser({ data: { name: name } }));
            }}
          >
            <div className="head-modal">
              <h3>Modificar usuario</h3>
            </div>
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
            <div className="foo-modal">
              <button type="submit">Enviar</button>
              <button>Cancelar</button>
            </div>
          </form>
        </div>
      </Wrapper>
    </Modal>
  );
};
const Wrapper = styled.div`
  form {
    display: flex;
    flex-direction: column;
    gap: 10px;
    width: 400px;
    color: #eeeeee;
    font-family: Poppins, Arial, Helvetica, sans-serif;
  }
  .head-modal {
    border-bottom: 1px gray solid;
  }
  h3 {
    color: #eeeeee;
    margin: 0;
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
  .foo-modal {
    display: flex;
    justify-content: right;
    gap: 10px;
  }
  button {
    padding: 0px 10px;
    color: #000;
    border-radius: 20px;
    width: 93px;
    height: 30px;
    text-align: center;
    justify-content: center;
    font-size: 16px;
    box-sizing: border-box;
    background-color: #eeeeee;
    border-radius: 5px;
    font-family: Poppins, Arial, Helvetica, sans-serif;
    border: 0;
    cursor: pointer;

    .unactive {
      cursor: default;
    }
  }
`;

export default EditProfileModal;
