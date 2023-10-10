import styled from "styled-components"
import EditProfileModal from "../pages/configuration/components/userOptionsModal";
import useToggle from "../hooks/useToggle";
import { Menu, MenuItem } from "@szhsin/react-menu";
import { FiEdit } from "react-icons/fi";
import { HiChevronUp, HiChevronDown } from "react-icons/hi";
import UserInformation from "../pages/configuration/components/userInformation";
import { MdLogout } from "react-icons/md";
import { IoClose } from "react-icons/io5";
import { CiMenuBurger } from "react-icons/ci";
import { useSupabase } from "../hooks/useSupabase";
import { CAvatar, CDropdown, CDropdownItem, CDropdownMenu, CDropdownToggle } from "@coreui/react";
import useAppData from "../hooks/useAppData";
import { useEffect, useState } from "react";
import {
   getLAvatar
} from "../utils/helper";
import { Link, useNavigate } from "react-router-dom";

type Props = {
   togglePanel: () => void;
}


function Nav({ togglePanel }: Props) {
   const navigate = useNavigate();
   const [isModalOpen, setModalOpen] = useState<"EDIT">();
   const { supabase } = useSupabase();
   const { profile } = useAppData();
   const [avatar, setAvatarName] = useState('');

   useEffect(() => {
      togglePanel();
      setAvatarName(getLAvatar(profile?.name))
   }, [])


   return (
      <Wrapper>
         <EditProfileModal isOpen={isModalOpen === 'EDIT'} onClose={() => setModalOpen(undefined)} />
          <div className="header-toggle" onClick={togglePanel}>
            <CiMenuBurger size={25}/>
         </div>
        

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

            </div>

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
   border-left:0;
   
 .avatar {
   cursor: pointer;
 }
   
.header-toggle {
   display: grid;
   place-content: center;
   cursor: pointer;
   height: 100%;
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
   `

export default Nav;

