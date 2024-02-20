import React from 'react';
import './Header.css';
import logo from '../assets/Huutis House-logos.jpeg';

function Header(){
  return (
    <header>
        <div className="logo-container">
        <img src={logo} alt="Logo" className="logo" />
        <h1 className="site-name">Huutis House</h1>
      </div>
    </header>
  );
}

export default Header;
