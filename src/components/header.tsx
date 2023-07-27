import { Menu, MenuItem } from "@szhsin/react-menu";
import styled from "styled-components";
import Nav from "./nav";
import { FaUserCircle } from "react-icons/fa";
import { FiEdit, FiMenu } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { useSupabase } from "../hooks/useSupabase";
import EditProfileModal from "../pages/configuration/components/userOptionsModal";
import useToggle from "../hooks/useToggle";
import "@szhsin/react-menu/dist/index.css";
import UserInformation from "../pages/configuration/components/userInformation";
import { MdLogout } from "react-icons/md";

function Header() {
  const navigate = useNavigate();
  const { supabase } = useSupabase();
  const [isModalOpen, toggleModal] = useToggle();

  return (
    <Wrapper>
      <EditProfileModal isOpen={isModalOpen} onClose={toggleModal} />
      <nav>
        <div className="logo button" onClick={() => navigate("/")}>
          <img
            alt="logo de las Asambleas de Dios"
            src="assets/images/AD-logo.png"
          />
        </div>
        <div className="links">
          <Menu
            menuButton={
              <button type="button" className="profile-menu">
                <div className="button">
                  <FiMenu size={30} />
                </div>
                <div className="button">
                  <FaUserCircle size={30} color="green" />
                </div>
              </button>
            }
          >
            <div className="profile-info">
              <UserInformation />
            </div>
            <MenuItem className="menu-item" onClick={toggleModal}>
              <FiEdit />
              <div>Editar perfil </div>
            </MenuItem>
            <MenuItem
              className="menu-item"
              onClick={() => supabase.auth.signOut()}
            >
              <MdLogout />
              <div> Cerrar sesión</div>
            </MenuItem>
          </Menu>
        </div>
      </nav>
      <Nav />
    </Wrapper>
  );
}

const Wrapper = styled.header`
  font-size: 16px;
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
  .profile-menu {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    border: 1px solid #47474759;
    padding: 3px 10px;
    border-radius: 20px;
    background-color: transparent;

    &:hover,
    &:active {
      box-shadow: "7px 13px 23px -2px rgba(0, 0, 0, 0.25)";
      border: 1px solid #47474776;
      transition: all;
    }
  }

  .profile-info {
    margin-bottom: 1px solid #00000060;
  }
  .menu-item {
    display: flex;
    gap: 5px;
  }
`;

export default Header;
