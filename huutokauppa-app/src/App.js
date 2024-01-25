import logo from './logo.svg';
import './App.css';
import Header from './Komponentit/Header';
import Myynti from './sivut/myynti'
import Kotisivu from './sivut/kotisivu'
import {BrowserRouter, Routes, Route, Outlet} from 'react-router-dom'

//routet pitäisi laittaa omaan tiedostoonsa, esim komponentit/routes yms
//routet siis linkkejä, jotka toimivat importtaamalla sivu ja antamalla sille nimen
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
