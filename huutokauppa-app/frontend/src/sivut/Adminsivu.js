import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../Komponentit/kayttajacontext';
import '../App.css';
import { KategoriaUL } from '../Komponentit/kategoriatUL';
import { KayttajaUL } from '../Komponentit/KayttajaList';

function Adminsivu(){
const [access, setaccess] = useState(false)
const { user } = useAuth();


useEffect(() => {
    if (user.objectId === "temp") {
      setaccess(true);
      console.log(user.objectId,"1  2")
    } else {
      setaccess(false);
    }
  }, [user.objectId]);

 return(
  <KayttajaUL/>
 )
}
export default Adminsivu
