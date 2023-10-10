import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import useAppData from "../hooks/useAppData";
import { CSidebarNav } from '@coreui/react'
import navigation from '../_nav'
import { AppSidebarNav } from "./AppSidebarNav";
import SimpleBar from 'simplebar-react'
import useToggle from "../hooks/useToggle";


type Props = {
   isOpen: boolean
}
function Sidebar({ isOpen }: Props) {
   const location = useLocation();
   const [isLinksMenuOpen, toggleLinksMenu] = useToggle(); 
   

   useEffect(() => { 
   }, [location]);

   return (
      <Wrapper>
         <div className={`sidebar-${isOpen ? 'show' : 'hidden'}`}>
            <div className="sidebar-brand">
               <img src="assets/images/AD-logo.png" className="brand" />
               <img src="assets/images/logo-title.png" className="brand-name" />
            </div>
            <CSidebarNav>
               <SimpleBar>
                  <AppSidebarNav items={navigation} />
               </SimpleBar>
            </CSidebarNav>
         </div>
      </Wrapper>
   );
}

const Wrapper = styled.div`
   font-family: Poppins, Arial, Helvetica, sans-serif;
   border:1px solid #cdcdcd;
   background-color:#ffffff;
   
   .sidebar-show{
      width: 250px;
      display: block;
   }

   .sidebar-hidden {
      display: none;
      width: 0;
   } 

   .sidebar-brand {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 15px;
      padding: 5px;
      height: 55px;
      box-sizing: border-box;
   }
   .brand {
      width: 50px;
   }
   .brand-name {
      height: 32px;
   }

   .sidebar-nav-title {
      padding-top: 0.75rem;
      padding-left: 1rem;
      background-color: transparent;
      transition: .15s ease, color .15s ease;
      
      &:hover {
         background-color: #ffffffe6;
      }
   }

   ul.sidebar-nav {
      margin: 0px;
      position: relative;
      display: flex;
      flex: 1;
      flex-direction: column;
      padding: 0;
      margin-bottom: 0;
      overflow-y: hidden;
      overflow-x: hidden;
      list-style: none;
   }
   .nav-link {
         display: flex;
         gap: 10px;
      }
   .nav-item {
      background-color: transparent;
      box-sizing: border-box;
      list-style: none;
      display: flex;
      border-radius: 10px;
      margin:5px;
      
      &:hover{
      background-color: rgba(8, 10, 12, 0.125);
      }
   }

   .nav-group {
      margin: 5px;
   }




   a {
      color:rgb(44 56 74 / 95%);
      display: flex;
      align-items: center;
      text-decoration: none;
      transition: 0.15s ease, color 0.15s ease;;
   } 
`;

export default Sidebar;
