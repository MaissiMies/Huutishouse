import React from 'react'; 
import { Link } from 'react-router-dom';
import './Header.css';
import logo from '../assets/Huutis House-logos.jpeg';

function Header(){
  return (
    <header>
      <div className="logo-container">
        <Link to="/">
          <img src={logo} alt="Logo" className="logo" onClick={() => window.scrollTo(0, 0)}  />
        </Link>
        <h1 className="site-name">Huutis House</h1>
      </div>
    </header>
  );
}

export default Header;
