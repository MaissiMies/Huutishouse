
import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import './Header.css';
import logo from '../assets/Huutis House-logos.jpeg';
import axios from "axios"
import { useAuth } from './kayttajacontext';

function Header(){
  const { user, login, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [nimi, setUsername] = useState('');
  const [salasana, setPassword] = useState('');
  const [userData, setUserData] = useState([])

  const handleLogin = async () => {
    try {
      const response = await axios.post('/api/login', { nimi, salasana });
      console.log('Login successful');
      setUserData(response.data)
      setUserData(prevData =>({
        ...prevData, // Spread existing JSON data
      nimi: nimi
      }))
      login(userData);
      console.log(userData)
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };
 


  return (
    <header>
      <div className="logo-container">
        <Link to="/">
          <img src={logo} alt="Logo" className="logo" onClick={() => window.scrollTo(0, 0)}  />
        </Link>
        <h1 className="site-name">Huutis House</h1>
        <div className="drop-popout-login" >
          <button className="login-button" onClick={() => setIsOpen(!isOpen)}>
            Login
          </button>
          {isOpen && (
            <div className="popout">
              <input
                type="text"
                placeholder="Username"
                value={nimi}
                onChange={(e) => setUsername(e.target.value)}
              />
              <input
                type="password"
                placeholder="Password"
                value={salasana}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button className="login-submit" onClick={handleLogin}>
                Submit
              </button>
            </div>
          )}
        </div>
        <p className='loggedintext'>tervetuloa {userData.nimi}</p>
      </div>
    </header>
  );
}

export default Header;