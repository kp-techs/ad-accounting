import styled from "styled-components";
import { useNavigate } from "react-router-dom";

function Logging() {
  const navigate = useNavigate();

  const handleSubmit = (e: any) => {
    e.preventDefault();
    navigate("/");
  };

  return (
    <Wrapper>
      <h2>Iniciar Sección</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Usuario</label>
        <input id="username" type="text" placeholder="Jocelin Sanchez" />
        <label htmlFor="userPassword">Contraseña</label>
        <input id="userPassword" type="password" placeholder="******" />
        <input type="submit" />
      </form>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  border: 1px solid black;
`;

export default Logging;
