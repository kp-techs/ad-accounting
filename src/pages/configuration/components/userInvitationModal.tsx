import { useSupabase } from "../../../hooks/useSupabase";
import Modal from "react-modal";
import { customStyles } from "../../incomes/constants";
import styled from "styled-components";
import { useId, useState } from "react";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};
const UserInvitationModal = ({ isOpen, onClose }: Props) => {
  //TO DO: enviar desde aqui la informacion de quien estaba logeado cuando hizo la invitacion, sino fue nadie, poner algo origen
  // TO DO: customizar mensaje de invitacion para nuevo usuario.
  const { supabase } = useSupabase();

  const [email, setEmail] = useState("");
  const [role, setRole] = useState("user");
  const [message, setMessage] = useState("");
  if (message) console.log(message);

  const password = useId().repeat(5);

  const handleInvitation = async (event: { preventDefault: () => void }) => {
    event.preventDefault();
    //TO DO: organizar este componente, se ve raro, quiza con un formik o algo.
    await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: "http://localhost:3000/create-new_user",
        data: { role },
      },
    });
  };

  return (
    <Modal
      ariaHideApp={false}
      isOpen={isOpen}
      onRequestClose={onClose}
      style={customStyles}
    >
      <Wrapper>
        <div>
          <form className="form-widget" onSubmit={handleInvitation}>
            <div className="head-modal">
              <h3>Invitar usuario</h3>
            </div>
            <section className="body-modal">
              <div className="form-field">
                <label htmlFor="email">Correo</label>
                <input
                  id="email"
                  type="email"
                  placeholder="Correo Electronico"
                  required={true}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="form-field">
                <label>Rol</label>
                <select
                  onChange={(e) => {
                    setRole(e.target.value);
                  }}
                >
                  <option value="user">Usuario</option>
                  <option value="admin">Administrador</option>
                </select>
              </div>
              <div className="form-field">
                <label>Mensaje</label>
                <textarea
                  placeholder="Personalizar mensaje de invitación"
                  onChange={(e) => setMessage(e.target.value)}
                />
              </div>
            </section>
            <div className="foo-modal">
              <button>Enviar</button>
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
    /* margin-bottom: 15px; */
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
export default UserInvitationModal;
