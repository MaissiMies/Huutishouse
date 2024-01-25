import React, { useState } from 'react';
import axios from "axios"

function Myynti(){

  const [nimi, setNimi] = useState('')
  const [lahtohinta, setLahtohinta] = useState('')
  const [hintavaraus, setHintavaraus] = useState('')
  const [kuva, setKuva] = useState('')

  
  const axiosPostData = async() =>{
    const postData={
      nimi:nimi,
      lahtohinta:lahtohinta,
      hintavaraus:hintavaraus,
      kuva:kuva
    }

    //tälle pitäisi koodata oikeat error ja response lauseet
    await axios.post('http://localhost:3001/myynti', postData)
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
}
  const handleSubmit = (e) => {
    e.preventDefault()
      
    axiosPostData()
    
  }

  //myynti sivun html
  return (
    <>
    <h1>Laita uusi tuote myynttin</h1>
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
        id="image"
        onChange={(e) => setKuva(e.target.files[0])}
        />
      </label>

      <button type="submit">Submit</button>
    </form>
    </>
  );
};

export default Myynti;
