import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Incomes from "../pages/incomes";
import Outgoings from "../pages/outgoings";
import ErrorPage from "../pages/error";
import App from "../App";
import Logging from "../pages/logging";
import Home from "../pages/home";
import Reporte from "../pages/reportes";
import Configuration from "../pages/configuration";

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
  { path: "/login", element: <Logging /> },
]);

function Router() {
  return <RouterProvider router={router} />;
}

export default Router;
