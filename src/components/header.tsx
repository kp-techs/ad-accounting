import { Link } from "react-router-dom";
import styled from "styled-components";
import Nav from "./nav";

function Header() {
  return (
    <Wrapper>
      <nav>
        <div className="logo">
          <img
            alt="logo de las Asambleas de Dios"
            src="assets/images/AD-logo.png"
          />
        </div>
        <div className="links">
          <Link to={`/`}>Inicio</Link>
          <Link to={`/configuration`}>Configuración</Link>
          <Link to={`/login`}>Salir</Link>
        </div>
      </nav>
      <Nav />
    </Wrapper>
  );
}

const Wrapper = styled.header`
  grid-area: header;
  margin: 0;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;

  padding: 15px 30px;
  background: linear-gradient(
    180.78deg,
    #ffffff 25%,
    rgba(255, 255, 255, 0) 75%
  );

  nav {
    display: flex;
    width: 100%;
    justify-content: space-between;
    img {
      width: 60px;
    }
  }

  .links {
    display: flex;
    align-items: center;
  }
  a {
    text-decoration: none;
    padding: 10px;
    font-size: 20px;

    font-family: "Poppins";
    color: #000000;
  }
`;

export default Header;
