import React, { useContext } from 'react';
import '../styles/header.css'
import {Link} from "react-router-dom";
import { AuthContext } from '../context/AuthContext';
const Header = () => {
  const {user}=useContext(AuthContext);
  return (
    <header className="header">
      <h1 className="logo">My Website</h1>
      <nav className="nav">
        <ul className="nav-list">
          <li className="nav-item"><Link to="/" className="nav-link">Home</Link></li>
          {user.email&&<li className="nav-item"><Link to="/add-photos" className="nav-link">Add Photos</Link></li>}
          <li className="nav-item"><Link to="/login" className="nav-link">Login</Link></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
