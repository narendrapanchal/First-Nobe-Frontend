import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Login from '../pages/Login';
import NotFound from '../pages/NotFound';
import Header from './Header';
import EditPhoto from '../pages/EditPhoto';
import AuthContextProvider from '../context/AuthContext';
import AddPhoto from '../pages/AddPhoto';
import PrivateComponents from './PrivateComponents';
function AllRoutes() {
  return (
      <Router>
        <AuthContextProvider>
        <Header/>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/edit/:uuid" element={<PrivateComponents><EditPhoto /></PrivateComponents>} />
          <Route path="/add-photos" element={<PrivateComponents><AddPhoto /></PrivateComponents>} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        </AuthContextProvider>
      </Router>
  );
}

export default AllRoutes
