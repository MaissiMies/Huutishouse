
import './App.css';
import Header from './Komponentit/Header';
import Footer from './Komponentit/Footer';
import Myynti from './sivut/myynti' //<---esim myynti
import Kotisivu from './sivut/kotisivu'
import { BrowserRouter as Router, Route, Switch, Routes } from 'react-router-dom';
import { Otayhteytta } from './sivut/otayhteyytta';
import { Kayttoehdot } from './sivut/kayttoehdot';
import { KategoriaUL } from './Komponentit/kategoriatUL';
import UserPage from'./sivut/kayttajasivu';
import React, { useState, useEffect } from 'react';
import axios from "axios"
import ProductPage from './sivut/tuotesivu';

//routet pitäisi laittaa omaan tiedostoonsa,myös frontendissä esim komponentit/routes yms
//routet käytännössä linkkejä, esim myynti haetaan hakemistosta, ja nimetään. käytetään sitten routessa elementtinä.
//<outletin /> alle <Footer /> kun tehty
function App() {
  
const Layout = ({ children }) => {
  return (
    <div className="layout">
      <Header />
      
      <div className="container">
        <div className="sidebar">
          {/* Sidebar content goes here */}
          <ul>
            <li><a href="/">Kotisivu</a></li>
            <li><a href="/myynti">Myynti</a></li>
            
            </ul>
           <KategoriaUL/>
        </div>
        <main className="main-content">{children}</main>
      </div>
      
      <Footer />
    </div>
  );
};

return (
  <Router>
    <Layout>      
    <Routes>
    <Route path="/" element={<Kotisivu />} />
    <Route path="/myynti" element={<Myynti />} />
    <Route path="/otayhteytta" element={<Otayhteytta />} />
    <Route path="/kayttoehdot" element={<Kayttoehdot />} />
    <Route path="/users/:id" element={<UserPage />}/>
    <Route path="/tuotteet/:productId" element={<ProductPage />}/>    
    </Routes>  
      </Layout>
  </Router>
);
};






export default App;
