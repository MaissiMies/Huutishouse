import logo from './logo.svg';
import './App.css';
import Header from './Komponentit/Header';
import Tervetuloa from './sivut/myynti'
import Kotisivu from './sivut/kotisivu'
import {BrowserRouter, Routes, Route, Outlet} from 'react-router-dom'

//jostain syystä tervetuloa route ei vie tervetuloa sivulle
//routet pitäisi laittaa omaan tiedostoonsa, esim komponentit/routes yms
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
      <Route path="tervetuloa" element={<Tervetuloa />} />
    </Route>

    </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
