import { RouterProvider } from "react-router";
import { router } from "./AppRoutes.jsx";
import { AuthProvider } from "./features/auth/auth.context.jsx";
import "./features/shared/global.scss";
import { PostContextProvider } from "./features/post/post.context.jsx";

function App() {
  return (
    <AuthProvider>
      <PostContextProvider>
        <RouterProvider router={router} />
      </PostContextProvider>
    </AuthProvider>
  );
}

export default App;
