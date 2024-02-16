import React, { useContext, useState } from 'react';
import Register from './Register';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [registerUser,setRegisterUser]=useState(false);
  const navigate=useNavigate()
;  const {login} =useContext(AuthContext);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      email: email,
      password: password
    };
    try {
      const response = await fetch(`${process.env.REACT_APP_Backend_API_URL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });
      if (response.ok) {
        let data=await response.json();
        login(data);
        navigate("/")
      } else {
        console.error('Login failed:', response.statusText);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };


  return (registerUser?<Register setRegisterUser={setRegisterUser}/>:
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '50px' }}>
      <h2>Login</h2>
      <form onSubmit={handleSubmit} style={{ width: '300px' }}>
        <div style={{ marginBottom: '20px' }}>
          <label htmlFor="email" style={{ display: 'block', marginBottom: '5px' }}>Email:</label>
          <input
            type="text"
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
          Login
        </button>
      </form>
      <button style={{ textDecoration: 'none', color: '#007bff', padding: '10px 20px', backgroundColor: '#fff', borderRadius: '5px', cursor: 'pointer' }} onClick={()=>setRegisterUser(true)}>
      Go to Register
        </button>
    </div>
  );
};

export default Login;
