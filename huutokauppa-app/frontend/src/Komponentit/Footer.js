import React from 'react';
import './Footer.css';
import logo1 from '../assets/Huutis House-logos_white.png'; 
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer>
      <div className="logo1-container">
        <Link to="/">
          <img src={logo1} alt="Logo" className="logo"  onClick={() => window.scrollTo(0, 0)} /> 
        </Link>
      </div>
      <div className="links-container">
        <li><a href="/otayhteytta">Ota yhteyttä</a></li>
        <li><a href="/kayttoehdot">Käyttöehdot</a></li>
      </div>
    </footer>
  );
}

export default Footer;
