import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";
import useAppData from "../hooks/useAppData";
import { CBadge, CNavGroup, CNavItem, CNavTitle, CSidebar, CSidebarBrand, CSidebarNav, CSidebarToggler } from '@coreui/react'
import navigation from '../_nav'
import { AppSidebarNav } from "./AppSidebarNav";
import SimpleBar from 'simplebar-react'
import useToggle from "../hooks/useToggle";


type Props = {
   isOpen: boolean
   toggle: () => void;

}
function Sidebar({ isOpen, toggle }: Props) {
   const { profile } = useAppData();
   const location = useLocation();


   useEffect(() => {
   }, [location]);


   function handleHide() {
      if (isOpen) toggle()
   }

   return (
      <Wrapper>
         <CSidebar visible={isOpen} onHide={handleHide}>
            <CSidebarBrand>
               <div className="sidebar-brand">
                  <img src="assets/images/AD-logo.png" className="brand" />
                  <img src="assets/images/logo-title.png" className="brand-name" />
               </div>
            </CSidebarBrand>
            <CSidebarNav>
               <AppSidebarNav items={navigation} />
            </CSidebarNav>
         </CSidebar>
      </Wrapper>
   );
}

const Wrapper = styled.div`
   font-family: Poppins, Arial, Helvetica, sans-serif;
   border:1px solid #cdcdcd;
   background-color:#ffffff;

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


   @media only screen and (max-width:700px) { 
      .sidebar-show {
         position: absolute;
         z-index:999;
         background-color: #ffffff;
         border:1px solid #cdcdcd;
         height: 100%;
      }
   }
`;

export default Sidebar;
