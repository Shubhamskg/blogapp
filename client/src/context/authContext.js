import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();


export const AuthContextProvider = ({ children }) => {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );
 
  const login = async (inputs) => {
    const res = await axios.post("https://blogapp-ma64.onrender.com/api/auth/login", inputs);
    console.log(res.data)
    setCurrentUser(res.data);
  };
  const update = async (inputs) => {
    const res = await axios.put("https://blogapp-ma64.onrender.com/api/users", inputs);
    console.log(res.data)
    setCurrentUser(res.data);
  };
  const deleted = async () => {
    await axios.delete("https://blogapp-ma64.onrender.com/api/users");
    setCurrentUser(null);
  };



  const logout = async (inputs) => {
    await axios.post("https://blogapp-ma64.onrender.com/api/auth/logout");
    setCurrentUser(null);
    navigate("/");
  };

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(currentUser));
  }, [currentUser]);

  return (
    <AuthContext.Provider value={{ currentUser, login, logout,update,deleted}}>
      {children}
    </AuthContext.Provider>
  );
};
