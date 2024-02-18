import logo from './logo.svg';
import './App.css';
import Header from './Komponentit/Header';
import Myynti from './sivut/myynti' //<---esim myynti
import Kotisivu from './sivut/kotisivu'
import { BrowserRouter as Router, Route, Switch, Routes } from 'react-router-dom';
import { Otayhteytta } from './sivut/otayhteyytta';
import { Kayttoehdot } from './sivut/kayttoehdot';

//routet pitäisi laittaa omaan tiedostoonsa,myös frontendissä esim komponentit/routes yms
//routet käytännössä linkkejä, esim myynti haetaan hakemistosta, ja nimetään. käytetään sitten routessa elementtinä.
//<outletin /> alle <Footer /> kun tehty
function App() {
const Layout = ({ children }) => {
  return (
    <div className="layout">
      <header />
      <div className="container">
        <div className="sidebar">
          {/* Sidebar content goes here */}
          <ul>
            <li><a href="/myynti">Myynti</a></li>
            <li><a href="/">Kotisivu</a></li>
            <li><a href="/otayhteytta">Ota yhteyttä</a></li>
            <li><a href="/kayttoehdot">Käyttöehdot</a></li>
          </ul>
        </div>
        <main className="main-content">{children}</main>
      </div>
      <footer />
    </div>
  );
};

return (
  <Router>
    <Routes>
    <Route path="/" element={<Layout><Kotisivu /></Layout>} />
    <Route path="/myynti" element={<Layout><Myynti /></Layout>} />
    <Route path="/otayhteytta" element={<Layout><Otayhteytta /></Layout>} />
    <Route path="/kayttoehdot" element={<Layout><Kayttoehdot /></Layout>} />
     
    </Routes>
  </Router>
);
};


export default App;
