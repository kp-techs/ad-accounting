import { Link } from "react-router-dom";
import styled from "styled-components";
import Nav from "./nav";
// import { MdSettings } from "react-icons/md";
import { FaUserCircle } from "react-icons/fa";
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
          {/* <Link to={`/`}>Inicio</Link> */}
          {/* <Link to={`/configuration`}>
            <div className="button">
              <MdSettings size={30} />
            </div>
          </Link> */}
          <div className="log-container">
            <Link to={`/login`}>
              <div className="button">
                <FaUserCircle size={30} color="green" />
              </div>
            </Link>
            <div className="button logout">Salir</div>
          </div>
        </div>
      </nav>
      <Nav />
    </Wrapper>
  );
}

const Wrapper = styled.header`
  font-size: 20px;
  font-family: Poppins;
  grid-area: header;
  margin: 0;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  padding: 15px 30px 0;
  background: linear-gradient(
    180.78deg,
    #ffffff 25%,
    rgba(255, 255, 255, 0) 75%
  );
  .button {
    display: flex;
    cursor: pointer;
  }

  .logout {
    padding: 0px 20px;
    background-color: #273b6c;
    color: #ffffff;
    border-radius: 20px;
  }
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
  .log-container {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

export default Header;
