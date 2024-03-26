import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../Komponentit/kayttajacontext';
import '../App.css';

function adminsivu(){
const [access, setaccess] = useState(false);
const { user } = useAuth();


useEffect(() => {
    if (user.objectId === _id || user.objectId === "temp") {
      setaccess(true);
      console.log(user.objectId,"1  2",_id)
    } else {
      setaccess(false);
    }
  }, [user.objectId, _id]);

  {condition ? (
    <p>This will render if the condition is true.</p>
  ) : (
    <p>This will render if the condition is false.</p>
  )}
}
