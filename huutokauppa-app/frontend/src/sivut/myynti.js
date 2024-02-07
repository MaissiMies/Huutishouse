import React, { useState } from 'react';
import axios from "axios"

function Myynti(){

  const [nimi, setNimi] = useState('')
  const [lahtohinta, setLahtohinta] = useState('')
  const [hintavaraus, setHintavaraus] = useState('')
  const [kuva, setKuva] = useState('')
    
    //tälle pitäisi koodata oikeat error ja response lauseet
    const axiosPostData = async () => {
      const formData = new FormData();
      formData.append('nimi', nimi);
      formData.append('lahtohinta', lahtohinta);
      formData.append('hintavaraus', hintavaraus);
      formData.append('kuva', kuva);
    
      try {
        const response = await axios.post('http://localhost:3001/myynti', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
    
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    };
    
  //formi ajaa tämän submit painikkeen jälkeen
  const handleSubmit = (e) => {
    e.preventDefault()      
    axiosPostData()
    
  }

  //myynti sivun html
  return (
    <>
    <h1>Laita uusi tuote myyntiin</h1>
      <form onSubmit={handleSubmit} method="post" encType="multipart/form-data">

      <label>
        Nimi:
        <input
          type="text"
          id="nimi"
          name="nimi"
          value={nimi}
          onChange={(e) => setNimi(e.target.value)}
        />
      </label>

      <label>
        Lähtöhinta:
        <input
          type="number"
          id="lahtohinta"
          name="lahtohinta"
          value={lahtohinta}
          onChange={(e) => setLahtohinta(e.target.value)}
        />
      </label>

      <label>
        Hintavaraus:
        <input
          type="number"
          id="hintavaraus"
          name="hintavaraus"
          value={hintavaraus}
          onChange={(e) => setHintavaraus(e.target.value)}
        />
      </label>

      <label>
        Kuva:
        <input
        type="file"
        accept="image/*"
        id="kuva"
        onChange={(e) => setKuva(e.target.files[0])}
        />
      </label>

      <button type="submit">Submit</button>
    </form>
    </>
  );
};

export default Myynti;
