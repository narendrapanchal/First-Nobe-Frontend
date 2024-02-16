import React, { createContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
export const AuthContext=createContext();
function AuthContextProvider({children}) {
    const navigate=useNavigate();
    const [user,setUser]=useState({});
    const login=(userData)=>{
        setUser(userData);
    }
    const logout=()=>{
        setUser({});
        // navigate("/login")

    }

  return (
    <AuthContext.Provider value={{user,login,logout}}>
      {children}
    </AuthContext.Provider >
  )
}

export default AuthContextProvider
