import { RouterProvider } from "react-router";
import { router } from "./AppRoutes.jsx";
import { AuthProvider } from "./features/auth/auth.context.jsx";
import "./features/shared/global.scss";

function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default App;
