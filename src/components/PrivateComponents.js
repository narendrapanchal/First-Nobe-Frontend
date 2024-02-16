import React, { useContext, useEffect } from 'react'
import { AuthContext } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom';

function PrivateComponents({children}) {
    const {user}=useContext(AuthContext);
    const navigate=useNavigate();
    useEffect(()=>{
        if(!user.email){
            navigate("/login");
        }
    },[])
  return (
    <div>
        {children}
      
    </div>
  )
}

export default PrivateComponents
