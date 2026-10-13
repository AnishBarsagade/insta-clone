import { createContext, useState, useEffect } from "react";
import { login, register, getMe } from "./services/auth.api.js";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setloading] = useState(false);

  const handleLogin = async (username, password) => {
    setloading(true);
    try {
      const response = await login(username, password);
      setUser(response.user);
    } catch (err) {
      console.log(err);
    } finally {
      setloading(false);
    }
  };

  const handleRegister = async (username, password) => {
    setloading(true);
    try {
      const response = await register(username, email, password);
      setUser(response.user);
    } catch (err) {
      console.log(err);
    } finally {
      setloading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, loading, handleLogin, handleRegister }}
    >
      {children}
    </AuthContext.Provider>
  );
}
