import { Field, Form, Formik } from "formik";
import { FC } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useSupabase } from "../../../hooks/useSupabase";
import { initialUser } from "../utils/constants";

type Props = {
  isActive: boolean;
  userInfo: UserData;
  setUserInfo: (userInfo: UserData) => void;
};
const CreateUserForm: FC<Props> = ({ isActive, userInfo, setUserInfo }) => {
  //TO DO: Crear ventana para recuperar contraseña
  // TO DO: estilizar ventana de cambiar contraseña
  // TO DO: agregar validacion en cambiar contrasena antes de ingresar al sistema
  const { supabase } = useSupabase();
  const navigate = useNavigate();

  return (
    <Wrapper>
      <div className="logo-container">
        <img className="AD-logo" src="assets/images/LOGO.png" alt="Logo" />
      </div>

      {isActive ? (
        <Formik
          initialValues={userInfo}
          onReset={() => setUserInfo(initialUser)}
          onSubmit={(values) => {
            supabase.auth.updateUser({
              password: values.password,
              data: { name: values.name },
            });
            navigate("/");
          }}
        >
          {({ values }) => (
            <Form>
              <div className="log-container">
                <div className="log">
                  <h1>NUEVO USUARIO</h1>
                  <Field type="text" placeholder="Nombre" name="name" />
                  <Field type="text" placeholder="Contraseña" name="password" />
                  <Field
                    type="text"
                    placeholder="Repetir contraseña"
                    name="password2"
                  />
                  <button>Guardar</button>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      ) : null}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  height: 100vh;
  width: 100vw;
  justify-content: center;
  align-items: center;
  gap: 250px;

  .linkLabel {
    font-weight: 400;
    font-size: 14px;
    line-height: 30px;
    letter-spacing: -0.005em;
    font-style: italic;
    text-decoration: none;
    font-family: "Poppins";
  }

  img {
    border-radius: 10px;
  }

  .log-container {
    width: 330px;
    height: 472.875px;
    background: #085690;
    box-shadow: -15px 0px 24px rgba(0, 0, 0, 0.25);
    border-radius: 40px;
    padding: 85px 45px;
  }
  .log {
    display: flex;
    flex-direction: column;
    align-items: center;
    background: rgba(0, 0, 0, 0.14);
    border-radius: 40px;
    backdrop-filter: blur(5.5px);
    width: 100%;
    height: 100%;
  }

  h1 {
    font-family: "Poppins-Bold", "Poppins";
    font-style: normal;
    font-size: 20px;
    line-height: 48px;
    letter-spacing: 0.175em;
    color: #ffffff;
    margin-top: 35px;
    margin-bottom: 0px;
  }
  input {
    width: 255px;
    height: 50px;
    padding: 10px;
    background-color: rgba(255, 255, 255, 0.52);
    border-radius: 20px;
  }
  form div {
    align-items: center;
  }
  button {
    background-color: #4e8fff;
    border-color: #4e8fff;
    border-radius: 10px;
    width: 200px;
    font-family: Poppins;
    font-style: normal;
    font-size: 14px;
    line-height: 30px;
    letter-spacing: 0.175em;
    color: #ffffff;
  }
  .button:hover {
    background-color: #82aefad0;
  }

  .input,
  .input::placeholder {
    font-family: "Poppins";
    font-style: italic;
    font-size: 16px;
    line-height: 36px;
    letter-spacing: -0.005em;
    color: #dadada;
  }
  .input {
    color: #ffffff;
  }
  .user-icon {
    background: url(assets/images/user-icon.svg) no-repeat 10px 10px;
    padding-left: 43px;
  }
  .password-icon {
    background: url(assets/images/pass-icon.svg) no-repeat 10px 10px;
    padding-left: 40px;
  }
`;

export default CreateUserForm;
