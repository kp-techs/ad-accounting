import styled from "styled-components"
import EditProfileModal from "../pages/configuration/components/userOptionsModal";
import useToggle from "../hooks/useToggle";
import { Menu, MenuItem } from "@szhsin/react-menu";
import { FiEdit, FiMenu, FiSettings } from "react-icons/fi";
import UserInformation from "../pages/configuration/components/userInformation";
import { MdLogout } from "react-icons/md";
import { CiMenuBurger } from "react-icons/ci";
import { RiSettings3Line, RiSettings4Line } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { useSupabase } from "../hooks/useSupabase";
import { CAvatar } from "@coreui/react";
import useAppData from "../hooks/useAppData";
import { useEffect, useState } from "react";
import {
   getLAvatar
} from "../utils/helper";
import { SlMenu } from "react-icons/sl";

type Props = {
   togglePanel: () => void;
}


function Nav({ togglePanel }: Props) {
   const [isModalOpen, toggleModal] = useToggle();
   const navigate = useNavigate();
   const { supabase } = useSupabase();
   const { profile } = useAppData();
   const [avatar, setAvatarName] = useState('');

   useEffect(() => {
      togglePanel();
      setAvatarName(getLAvatar(profile?.name))
   }, [])

   return (
      <Wrapper>
         <EditProfileModal isOpen={isModalOpen} onClose={toggleModal} />
         <div className="header-toggle" onClick={togglePanel}>
            <CiMenuBurger size={25} />
         </div>
         <div className="header-options">
            <div className="profile-menu option">
               <Menu
                  menuButton={
                     <div className="button">
                        <CAvatar color="warning" textColor="white" >{avatar}</CAvatar>
                     </div>
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

         </div>
      </Wrapper>
   )
}

const Wrapper = styled.nav`
   display: grid;
   grid-template-columns: auto 1fr;
    width: 100%;
    height: 55px;
    box-sizing: border-box;
    background-color: #ffffff;
   border:1px solid #cdcdcd ;
   border-left:0 ;

   
   .header-toggle {
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
   .option {
      height: 100%;
      display: grid;
      place-content: center;
   }
   `

export default Nav;

