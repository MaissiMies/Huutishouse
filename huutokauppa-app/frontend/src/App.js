
import './App.css';
import Header from './Komponentit/Header';
import Footer from './Komponentit/Footer';
import Myynti from './sivut/myynti' //<---esim myynti
import Kotisivu from './sivut/kotisivu'
import Eiloyda from './sivut/eiloyda_sivu'
import Register from './sivut/rekistrointisivu';
import { BrowserRouter as Router, Route, Switch, Routes } from 'react-router-dom';
import { Otayhteytta } from './sivut/otayhteyytta';
import { Kayttoehdot } from './sivut/kayttoehdot';
import { KategoriaUL } from './Komponentit/kategoriatUL';
import { UserProvider,useAuth } from './Komponentit/kayttajacontext';
import UserPage from'./sivut/kayttajasivu';
import React, { useState, useEffect } from 'react';
import HuudotList from './Komponentit/HuutoUL';
import axios from "axios"
import ProductPage from './sivut/tuotesivu';
import Viestit from './Komponentit/Viestit';
import Tuoteetsivu from'./sivut/tuotteetsivu';


//routet pitäisi laittaa omaan tiedostoonsa,myös frontendissä esim komponentit/routes yms
//routet käytännössä linkkejä, esim myynti haetaan hakemistosta, ja nimetään. käytetään sitten routessa elementtinä.
//<outletin /> alle <Footer /> kun tehty
function App() {

  



const Layout = ({ children }) => {

  const [access, setaccess] = useState(false);
const { user } = useAuth();

useEffect(() => {
  if (user.objectId === "66029af4b6e195fa450ce67c") {
    setaccess(true);
    console.log(user.objectId,"1  2")
  } else {
    setaccess(false);
  }
}, [user.objectId]);

  return (
    <div className="layout">
      <Header />
      
      <div className="container">
        <div className="sidebar">
          {/* Sidebar content goes here */}
          <ul>
            <li><a href="/">Kotisivu</a></li>
            <li><a href="/myynti">Myynti</a></li>
            <li><a href="/Viestit">Viestit  </a></li>
            <li><a href='/rekisteröidy'>Rekisteröidy</a></li>
            {access ? (
        <p><li><a href='/admin'>admin</a></li></p>
      ) : (
        <p></p>
      )}
            
            
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
      <UserProvider> {/* Wrap the entire app with UserContextProvider */}
        <Layout>
          <Routes>
            <Route path="/" element={<Kotisivu />} />
            <Route path="/myynti" element={<Myynti />} />
            <Route path="/otayhteytta" element={<Otayhteytta />} />
            <Route path="/kayttoehdot" element={<Kayttoehdot />} />
            <Route path="/users/:_id" element={<UserPage />} />
            <Route path="/tuotteet/:productId" element={<ProductPage />}/>
            <Route path="/tuotteet/kategoria/:kategoria" element={<Tuoteetsivu />}/>
            <Route path="*" element={<Eiloyda />} />
            <Route path="/Viestit" element={<Viestit />} />
            <Route path="/rekisteröidy" element={<Register />} />
          </Routes>
        </Layout>
      </UserProvider>
    </Router>
  );
}







export default App;
