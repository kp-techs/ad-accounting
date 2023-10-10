import styled from "styled-components"
import EditProfileModal from "../pages/configuration/components/userOptionsModal";
import useToggle from "../hooks/useToggle";
import { Menu, MenuItem } from "@szhsin/react-menu";
import { FiEdit } from "react-icons/fi";
import UserInformation from "../pages/configuration/components/userInformation";
import { MdLogout } from "react-icons/md";
import { IoClose } from "react-icons/io5";
import { CiMenuBurger } from "react-icons/ci";
import { useSupabase } from "../hooks/useSupabase";
import { CAvatar } from "@coreui/react";
import useAppData from "../hooks/useAppData";
import { useEffect, useState } from "react";
import {
   getLAvatar
} from "../utils/helper";
import { Link, useNavigate } from "react-router-dom";

type Props = {
   togglePanel: () => void;
   toggleLinks: () => void;
   isLinksMenuOpen: boolean;
   // isLinksMenuOpen:string | undefined;
}


function Nav({ togglePanel, toggleLinks, isLinksMenuOpen }: Props) {
   const navigate = useNavigate();
   const [isModalOpen, setModalOpen] = useState<"EDIT">();
   const { supabase } = useSupabase();
   const { profile } = useAppData();
   const [avatar, setAvatarName] = useState('');

   useEffect(() => {
      togglePanel();
      setAvatarName(getLAvatar(profile?.name))
   }, [])

   useEffect(() => {
      console.log(isLinksMenuOpen)},)

   return (
      <Wrapper>
         <EditProfileModal isOpen={isModalOpen === 'EDIT'} onClose={() => setModalOpen(undefined)} />
         <div className="header-toggle" onClick={toggleLinks}>
            {isLinksMenuOpen ? <IoClose size={30} /> : <CiMenuBurger size={30} />}
         </div>
          <div className="header-toggle-default" onClick={togglePanel}>
            <CiMenuBurger size={25} />
         </div>
        
         {!isLinksMenuOpen ?
            <div className="logo button" onClick={() => navigate("/")}>
               <img
                  src="assets/images/AD-logo.png"
               />
            </div>
            : null}

         {!isLinksMenuOpen ? (
            <div className="header-options">
               <div className="profile-menu option">
                  <Menu
                     menuButton={
                        <CAvatar className="avatar" color="warning" textColor="white">{avatar}</CAvatar>
                     }
                  >
                     <div className="profile-option-wrapper">
                        <div className="profile-info">
                           <UserInformation />
                        </div>
                        <MenuItem className="menu-item" onClick={() => setModalOpen('EDIT')
                        }>
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
                     </div>
                  </Menu>
               </div>

            </div>)
            : null}
         {isLinksMenuOpen ? 
         <section className="menu-links-container" style={!isLinksMenuOpen ? { maxHeight: '0px' } : { maxHeight: '100%' }}>
            <div className="link" onClick={toggleLinks}>
               <Link to={`/ingresos`}>INGRESOS</Link>
            </div>

            <div className="link" onClick={toggleLinks}>
               <Link to={`/egresos`}>EGRESOS</Link>
            </div>

            <div className="link" onClick={toggleLinks}>
               <Link to={`/prestamos`}>PRESTAMOS</Link>
            </div>
            
            <div className="link" onClick={toggleLinks}>
               <Link to={`/reportes`}>REPORTES</Link>
            </div>

            {profile?.role === "Admin" ? (
               <div className="link" onClick={toggleLinks}>
                  <Link to={`/configuracion`}>CONFIGURACIONES</Link>
               </div>
            ) : null}
         </section> : null}
      </Wrapper>
   )
}

const Wrapper = styled.nav`
   display: grid;
   grid-template-columns: auto 1fr;
   gap: 10px;
    width: 100%;
    height: 55px;
    box-sizing: border-box;
    background-color: #ffffff;
   border:1px solid #cdcdcd ;
   border-left:0 ;

   .logo {
      display: none;
      align-items: center;
   }

   img {
      width: 50px;
    }
   
 .avatar {
   cursor: pointer;
 }
   
   .header-toggle-default {
      display: grid;
      cursor: pointer;
      height: 100%;
      place-content: center;
      padding: 10px;
   }
.header-options {
   height: 100%;
   display: flex;
   justify-content: right;
   box-sizing: border-box;
   gap: 10px;
   margin: 0 25px;
}

.profile-option-wrapper {
 background-color: #ffffff ; 
box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.13);
 border-radius: 5px;
 padding: 5px;
}

.menu-item {
   text-decoration: none;
   display: flex;
   align-items: center;
   gap: 5px;
   padding: 3px;
}
   .option {
      height: 100%;
      display: grid;
      place-content: center;
   }

   .header-toggle {
      display: none;
   }

   @media only screen and (max-width:700px) { 
      grid-template-columns: auto auto 1fr;

      .logo {
         display: flex;
         align-items: center;
      }

    .menu-links-container {
      overflow:hidden;
      transition:0.5s;
      position:absolute;
      width:100%;
      height:100%;
      max-height:100%;
      background:#063970;
      top:60px;
      z-index:20;
      display:flex;
      flex-direction:column;
      gap:15px;
   } 

   .header-toggle {
      display: flex;
      cursor: pointer;
      height: 100%;
      align-items: center;
      padding: 10px;
     }

     .header-toggle-default {
      display: none;
     }
     .link {
       display:flex;
       justify-content: center;
       padding: 15px;
       
       a {
         text-decoration: none;
         color:white;
      }

      &:hover {
        background:#06397033;
      }

     }
}
   `

export default Nav;

