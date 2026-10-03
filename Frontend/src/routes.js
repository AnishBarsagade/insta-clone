import { BrowserRouter } from "react-router";
import Login from "./features/auth/pages/login";
import Register from "./features/auth/pages/register";

export const Routes = BrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/login",
    element: <Register />,
  },
]);
