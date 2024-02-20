import React from 'react';
import './Footer.css';
import logo1 from '../assets/Huutis House-logos_white.png'; 

function Footer() {
  return (
    <footer>
      <div className="logo1-container">
        <img src={logo1} alt="Logo" className="logo" /> {/* Lisää logo-komponentti */}
      </div>
    </footer>
  );
}

export default Footer;
