import logo from './logo.svg';
import './App.css';
import Header from './Komponentit/Header';
import Myynti from './sivut/myynti' //<---esim myynti
import Kotisivu from './sivut/kotisivu'
import {BrowserRouter, Routes, Route, Outlet} from 'react-router-dom'

//routet pitäisi laittaa omaan tiedostoonsa,myös frontendissä esim komponentit/routes yms
//routet käytännössä linkkejä, esim myynti haetaan hakemistosta, ja nimetään. käytetään sitten routessa elementtinä.
//<outletin /> alle <Footer /> kun tehty
function App() {
const Layout = () =>{
  return(
  <>
    <Header />
    <Outlet />
    
  </>
  )
}
  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Layout />}>
        
      <Route path="/" element={<Kotisivu />} />
      <Route path="myynti" element={<Myynti />} />

    </Route>

    </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
