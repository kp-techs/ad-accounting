import { Menu, MenuItem } from "@szhsin/react-menu";
import styled from "styled-components";
import Nav from "./nav";
import { HiOutlineUserCircle } from "react-icons/hi";
import { FiEdit, FiMenu } from "react-icons/fi";
import { IoClose } from "react-icons/io5";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSupabase } from "../hooks/useSupabase";
import EditProfileModal from "../pages/configuration/components/userOptionsModal";
import useToggle from "../hooks/useToggle";
import "@szhsin/react-menu/dist/index.css";
import UserInformation from "../pages/configuration/components/userInformation";
import { MdHeight, MdLogout } from "react-icons/md";
import useAppData from "../hooks/useAppData";
import { useEffect } from "react";

function Header() {
  const navigate = useNavigate();
  const { supabase } = useSupabase();
  const [isModalOpen, toggleModal] = useToggle();
  const [isLinksMenuOpen, toggleLinksMenu] = useToggle();

  const location = useLocation();
  const { profile } = useAppData();
  useEffect(() => { }, [location]);



  return (
    <Wrapper>
      <EditProfileModal isOpen={isModalOpen} onClose={toggleModal} />
      <nav>
        <div className="menu-container">
          <div className="button menu-button" onClick={toggleLinksMenu}>
            {isLinksMenuOpen?<IoClose size={30} />:<FiMenu size={30} />}
          </div>
          {!isLinksMenuOpen?
          <div className="logo button" onClick={() => navigate("/")}>
            <img
              src="assets/images/AD-logo.png"
            />
          </div>
          :null}
          <nav className="links-container">
            <div className="link">
              <Link to={`/incomes`}>INCOMES</Link>
            </div>

            <div className="link">
              <Link to={`/outgoings`}>OUTGOINGS</Link>
            </div>

            <div className="link">
              <Link to={`/loans`}>LOANS</Link>
            </div>

            {profile?.role === "Admin" ? (
              <div className="link">
                <Link to={`/configuration`}>SETTINGS</Link>
              </div>
            ) : null}
          </nav>

        </div>
        {!isLinksMenuOpen?
        <div className="profile">
          <Menu
            menuButton={
              <button type="button" className="profile-menu">
                <a>
                  ACCOUNT
                </a>
                <div className="button">
                  <HiOutlineUserCircle size={30} />
                </div>
              </button>
            }
          >
            <div className="profile-info">
              <UserInformation />
            </div>
            <MenuItem className="menu-item" onClick={toggleModal}>
              <FiEdit />
              <div>Edit profile </div>
            </MenuItem>
            <MenuItem
              className="menu-item"
              onClick={() => supabase.auth.signOut()}
            >
              <MdLogout />
              <div>Log out</div>
            </MenuItem>
          </Menu>
        </div>:null}
      </nav>
      {isLinksMenuOpen ? <section className="menu-links-container" style={!isLinksMenuOpen?{maxHeight:'0px'}:{maxHeight:'100%'}}>
        <div className="link" onClick={toggleLinksMenu}>
          <Link to={`/incomes`}>INCOMES</Link>
        </div>
      
        <div className="link" onClick={toggleLinksMenu}>
          <Link to={`/outgoings`}>OUTGOINGS</Link>
        </div>
      
        <div className="link" onClick={toggleLinksMenu}>
          <Link to={`/loans`}>LOANS</Link>
        </div>
      
        {profile?.role === "Admin" ? (
          <div className="link" onClick={toggleLinksMenu}>
            <Link to={`/configuration`}>SETTINGS</Link>
          </div>
        ) : null}
      </section> : null}

    </Wrapper>
  );
}

const Wrapper = styled.header`
font-size: 14px;
font-family: Poppins;
  grid-area: header;
  margin: 0;
  margin-bottom:10px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;

  .button {
    display: flex;
    cursor: pointer;
  }

  .menu-container{
    display:flex;
    align-items: center;
    gap: 15px;


    
  }

  nav {
    display: flex;
    padding: 15px 15px 0;
    box-sizing: border-box;
    justify-content:space-between;


    img {
      width: 50px;
    }
  }
  .links-container {
    display:flex;
    height:100%

  }
  .links {
    display: flex;
    align-items: center;
  }
  a {
    text-decoration: none;
    padding: 10px;
    font-size: 15px;
    font-family: "Poppins";
    color: #000000;
  }
  .profile-menu {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    border: 0;
    padding: 3px 10px;
    border-radius: 20px;
    background-color: transparent;
    cursor:pointer;
  }

  .profile-info {
    margin-bottom: 1px solid #00000060;
  }
  .menu-item {
    display: flex;
    gap: 5px;
  }
  .menu-button{
    display:none;
  }

  @media only screen and (max-width:700px){
    .menu-button{
      display:block;
    }

    .links-container{
      display:none;
    }

    .menu-links-container {
      overflow:hidden;
      transition:0.5s;
      position:absolute;
      width:100%;
      height:100%;
      max-height:100%;
      background:#145369;
     top:60px;
     z-index:20;
     display:flex;
     flex-direction:column;
     gap:15px;
 
     
     .link {
       display:flex;
       justify-content: center;

       
       a {color:white;}

      &:hover {
        background:rgb(37, 150, 190);
      }
     }

    }


  }
`;

export default Header;
