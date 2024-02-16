import React, { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Register = ({setRegisterUser}) => {
  const [email, setEmail] = useState('');
  const navigate=useNavigate();
  const [password, setPassword] = useState('');
  const {login}=useContext(AuthContext);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      email: email,
      password: password
    };
    try {
      const response = await fetch(`${process.env.REACT_APP_Backend_API_URL}/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });
      if (response.ok) {
        console.log('Register successful!');
       let data=await response.json();
       login(data);
       navigate("/")
      } else {
        console.error('Register failed:', response.statusText);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '50px' }}>
      <h2>Register</h2>
      <form onSubmit={handleSubmit} style={{ width: '300px' }}>
        <div style={{ marginBottom: '20px' }}>
          <label htmlFor="email" style={{ display: 'block', marginBottom: '5px' }}>Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ width: '100%', padding: '8px', fontSize: '16px' }}
          />
        </div>
        <div style={{ marginBottom: '20px' }}>
          <label htmlFor="password" style={{ display: 'block', marginBottom: '5px' }}>Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ width: '100%', padding: '8px', fontSize: '16px' }}
          />
        </div>
        <button type="submit" style={{ padding: '10px 20px', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
          Register
        </button>
      </form>
      <button style={{ textDecoration: 'none', color: '#007bff', padding: '10px 20px', backgroundColor: '#fff', borderRadius: '5px', cursor: 'pointer' }} onClick={()=>setRegisterUser(false)}>
          Go to Login
        </button>
    </div>
  );
};

export default Register;
