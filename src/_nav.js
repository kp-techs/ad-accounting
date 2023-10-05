import { CNavGroup, CNavItem } from "@coreui/react";
import {RxHome} from 'react-icons/rx'
import {VscSettingsGear} from 'react-icons/vsc'
import {GoDot} from 'react-icons/go'
import { BsBank, BsBarChart, BsBoxArrowInDownLeft, BsBoxArrowUpRight } from "react-icons/bs";

const _nav = [
{
   component:CNavItem,
   name: 'Inicio',
   to:'/',
   icon:<RxHome size={21} color="rgb(44 56 74 / 95%)" />
},
{
   component:CNavItem,
   name: 'Ingresos',
   to:'/ingresos',
   icon:<BsBoxArrowInDownLeft size={20} color="rgb(44 56 74 / 95%)" />
},
{
   component:CNavItem,
   name: 'Egresos',
   to:'/egresos',
   icon: <BsBoxArrowUpRight size={20} color="rgb(44 56 74 / 95%)" />
},
{
   component:CNavItem,
   name: 'Préstamos',
   to:'/prestamos',
   icon: <BsBank size={20} color="rgb(44 56 74 / 95%)" />
},
{
   component:CNavItem,
   name: 'Reportes',
   to:'/reportes',
   icon: <BsBarChart size={20} color="rgb(44 56 74 / 95%)" />,
   badge:{
      color:'info',
      text:'NUEVO'
   }
},
{
   component:CNavGroup,
   name: 'Configuraciones',
   icon:<VscSettingsGear size={25} color="rgb(44 56 74 / 95%)" />,
   items:[
      {
         component:CNavItem,
         name:'Usuarios',
         to:'configuracion/usuarios',
         icon: <GoDot/>,
      },
      {
         component:CNavItem,
         name:'Miembros',
         icon: <GoDot/>,
         to:'configuracion/miembros',
      },
      {
         component:CNavItem,
         name:'Ministerios',
         icon: <GoDot/>,
         to:'configuracion/ministerios',
      },
      {
         component:CNavItem,
         name:'Tipos de ingreso',
         to:'configuracion/tipos-de-ingresos',
         icon: <GoDot/>,
      },
      {
         component:CNavItem,
         name:'Tipos de egresos',
         icon: <GoDot/>,
         to:'configuracion/tipos-de-egresos',
      },
   ]
},
]

export default _nav;