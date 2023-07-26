import { Auth, ForgottenPassword } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useSupabase } from "../../hooks/useSupabase";
import { customVariables } from "./constants";
import RecoverPassword from "../recoverPassword";
import { useState } from "react";

function Login() {

  const { session, supabase } = useSupabase();
  const navigate = useNavigate();

if (session) navigate("/");
  const [forgottenPassword, setForgottenPassword] = useState(false);

  return (
    <Wrapper>
      <div className="logo-container">
        <img className="AD-logo" src="assets/images/LOGO.png" alt="Logo" />
      </div>
      <div className="log-container">
        <div className="log">
          {forgottenPassword ? 
            <RecoverPassword /> :
            <>
             <h1>INICIO</h1>
          <Auth
            supabaseClient={supabase}
            showLinks={false}
            providers={[]}
            localization={{
              variables: customVariables,
            }}
            appearance={{
              theme: ThemeSupa,
              className: { button: "button", input: "input" },
            }}
              />
              <p className="link" onClick={()=> setForgottenPassword(true)}>¿Olvidó su contraseña?</p>
                </>
        
        }
         
        </div>
      </div>
    </Wrapper>
  );
}

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
    height: 472.88px;
		width: 330px;
  }

  h1 {
    font-family: "Poppins-Bold", "Poppins";
    font-style: normal;
    font-size: 32px;
    line-height: 48px;
    letter-spacing: 0.175em;
    color: #ffffff;
    margin-top: 65px;
    margin-bottom: 0px;
  }
  .input {
    width: 255px;
    height: 50px;
    padding: 10px;
    background-color: rgba(255, 255, 255, 0.52);
    border-radius: 20px;
  }
  form div {
    align-items: center;
  }
  .button {
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

  .link {
    cursor: pointer;
   color: #ffffff;

  }
`;

export default Login;
