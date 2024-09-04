import { createContext, useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCorrectUser] = useState(
    JSON.parse(localStorage.getItem("user")) || JSON.parse(Cookies.get("user") || null)
  );

  const login = async (input) => {
    try {
      const res = await axios.post("auth/login", input);
      setCorrectUser(res.data);
      localStorage.setItem("user", JSON.stringify(res.data));
      Cookies.set("user", JSON.stringify(res.data), { expires: 1 }); // Store user data in cookies for 1 day
    } catch (err) {
      console.error("Login error:", err);
    }
  };

  const logout = async () => {
    try {
      await axios.post("auth/logout");
      setCorrectUser(null);
      localStorage.removeItem("user");
      Cookies.remove("user"); // Remove user data from cookies
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem("user", JSON.stringify(currentUser));
      Cookies.set("user", JSON.stringify(currentUser), { expires: 1 }); // Update cookie on user state change
    } else {
      localStorage.removeItem("user");
      Cookies.remove("user");
    }
  }, [currentUser]);

  return (
    <AuthContext.Provider value={{ currentUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
