import styled from "styled-components";
import Nav from "./nav";
import { FaUserCircle } from "react-icons/fa";
import { FiMenu } from "react-icons/fi";
import useToggle from "../hooks/useToggle";
import UserOptionsModal from "./userOptionsModal";

function Header() {
  const [isModalOpen, toggleModal] = useToggle();

  return (
    <Wrapper>
      <nav>
        <div className="logo button">
          <img
            alt="logo de las Asambleas de Dios"
            src="assets/images/AD-logo.png"
          />
        </div>
        <div className="links">
          <div className="log-container" onClick={toggleModal}>
            <div className="button">
              <FiMenu size={30} />
            </div>
            <div className="button">
              <FaUserCircle size={30} color="green" />
            </div>
          </div>
          <UserOptionsModal isOpen={isModalOpen} onClose={toggleModal} />
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
    padding: 15px 15px 0;
    box-sizing: border-box;

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
    gap: 10px;
    border: 1px solid #47474759;
    padding: 3px 10px;
    border-radius: 20px;
  }
`;

export default Header;
