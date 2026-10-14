import { useContext } from "react";
import { AuthContext } from "../auth.context.jsx";
import { login, register, getMe } from "../services/auth.api";
//This is the hook layer manages the api layer and the state
export function useAuth() {
  const context = useContext(AuthContext);

  const { user, setUser, loading, setLoading } = context;

  const handleLogin = async (username, password) => {
    setLoading(true);
    //store the response
    const response = await login(username, password);
    //set the response to the user
    setUser(response.user);

    setLoading(false);
  };
  //registering the user
  const handleRegister = async (username, email, password) => {
    setLoading(true);
    const response = await register(username, email, password);
    setUser(response.user);

    setLoading(false);
  };
  return {
    user,
    loading,
    handleLogin,
    handleRegister,
  };
}
