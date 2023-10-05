import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Incomes from "../pages/incomes";
import Outgoings from "../pages/outgoings";
import ErrorPage from "../pages/error";
import App from "../App";
import Login from "../pages/login";
import Home from "../pages/home";
import Configuration from "../pages/configuration";
import Reporte from "../pages/reportes";
import CreateUser from "../pages/createUser";
import RecoverPassword from "../pages/recoverPassword";
import { createGlobalStyle } from "styled-components";
import Loans from "../pages/loans";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/ingresos",
        element: <Incomes />,
      },
      {
        path: "/egresos",
        element: <Outgoings />,
      },
      {
        path: "/reportes",
        element: <Reporte />,
      },
      {
        path: "/configuracion/usuarios",
        element: <Configuration table="users" />,
      },
      {
        path: "/configuracion/miembros",
        element: <Configuration table='people'/>,
      },
      {
        path: "/configuracion/ministerios",
        element: <Configuration table="ministries" />,
      },
      {
        path: "/configuracion/tipos-de-ingresos",
        element: <Configuration table="incomeTypes" />,
      },
      {
        path: "/configuracion/tipos-de-egresos",
        element: <Configuration table="outgoingTypes" />,
      },
      {
        path: "/prestamos",
        element: <Loans />,
      }
    ],
  },
  { path: "/login", element: <Login /> },
  { path: "/create-new_user", element: <CreateUser /> },
  {path:"/recover_password", element: <RecoverPassword /> },
]);

function Router() {
  return (
    <>
      <GlobalStyles />
      <RouterProvider router={router} />
    </>
  );
}

const GlobalStyles = createGlobalStyle`
  @font-face {
    font-family: "Poppins-Regular";
    src: local("Poppins-Regular") url('./fonst/Poppins/Poppins-Regular.ttf') format('truetype');
  }

  body {
    margin: 0;
    padding: 0;
  }
`;

export default Router;
