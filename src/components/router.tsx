import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Incomes from "../pages/incomes";
import Outgoings from "../pages/outgoings";
import ErrorPage from "../pages/error";
import App from "../App";
import Login from "../pages/login";
// import Home from "../pages/home";
import Reporte from "../pages/reportes";
import Configuration from "../pages/configuration";
import { createGlobalStyle } from "styled-components";

import CreateUser from "../pages/createUser";
import Home from "../pages/home";

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
        path: "/incomes",
        element: <Incomes />,
      },
      {
        path: "/outgoings",
        element: <Outgoings />,
      },
      {
        path: "/reportes",
        element: <Reporte />,
      },
      {
        path: "/configuration",
        element: <Configuration />,
      },
    ],
  },
  { path: "/login", element: <Login /> },
  { path: "/create-new_user", element: <CreateUser /> },
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
