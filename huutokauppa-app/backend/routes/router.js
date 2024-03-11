const express = require('express')
const router = express.Router()
const schemat = require('../models/schemas')
const fs = require('fs');
const path = require('path');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' }); // Specify the directory where you want to save the files


// //-> post ( /uusikayttaja )
// router.post('/uusikayttaja'), async(req, res) => {
// const {nimi,puhelinnro,sposti,kayttajatuunnus,adminoikeudet} = req.body
// const kayttajatData = {nimi:nimi,puhelinnro:puhelinnro,sposti:sposti,kayttajatuunnus:kayttajatuunnus,adminoikeudet:adminoikeudet}

// const uusikayttaja = new schemat.Kayttajat(kayttajatData)
// const tallennaKayttaja = await uusikayttaja.save()
// if(tallennaKayttaja){
//   res.send('vastaanotto onnistui')
// }
// res.end()
// }

//ottaa vastaan myynti sivun sumbitit, ja lähettää databaseen
router.post('/myynti', upload.single('kuva'), async (req, res) => {
  const { nimi, lahtohinta, hintavaraus } = req.body;

  try {
    const kuvaPath = req.file.path;

    const newTuote = new schemat.Tuote({
      nimi,
      lahtohinta,
      hintavaraus,
      kuva: kuvaPath,
    });

    await newTuote.save();
    console.log(newTuote);
    res.send('vastaanotto onnistui');
  } catch (error) {
    console.error('virhe', error);
    res.status(500).send('Internal Server Error');
  }
});

router.get('/tuotteet', async (req, res) => {
  try {
    const tuotteet = schemat.Tuote
    const products = await tuotteet.find();
    console.log(products);
    res.json(products);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
router.get('/kategoriat', async (req, res) => {
  try {
    const kategoriat = schemat.Kategoria
    const Kategoria = await kategoriat.find();
    console.log(Kategoria);
    res.json(Kategoria);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
router.get('/kayttajat', async (req, res) => {
  try {
    const kayttajat = schemat.Kayttaja
    const Kayttaja = await kayttajat.find();
    console.log(Kayttaja);
    res.json(Kayttaja);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//haku function
router.get(' ', (req, res) => {
    const userData = 
    [
        {
          "id": 1,
          "name": "Leanne Graham",
          "username": "Bret",
          "email": "Sincere@april.biz",
          "address": {
            "street": "Kulas Light",
            "suite": "Apt. 556",
            "city": "Gwenborough",
            "zipcode": "92998-3874",
            "geo": {
              "lat": "-37.3159",
              "lng": "81.1496"
            }
          },
          "phone": "1-770-736-8031 x56442",
          "website": "hildegard.org",
          "company": {
            "name": "Romaguera-Crona",
            "catchPhrase": "Multi-layered client-server neural-net",
            "bs": "harness real-time e-markets"
          }
        },
        {
          "id": 2,
          "name": "Ervin Howell",
          "username": "Antonette",
          "email": "Shanna@melissa.tv",
          "address": {
            "street": "Victor Plains",
            "suite": "Suite 879",
            "city": "Wisokyburgh",
            "zipcode": "90566-7771",
            "geo": {
              "lat": "-43.9509",
              "lng": "-34.4618"
            }
          },
          "phone": "010-692-6593 x09125",
          "website": "anastasia.net",
          "company": {
            "name": "Deckow-Crist",
            "catchPhrase": "Proactive didactic contingency",
            "bs": "synergize scalable supply-chains"
          }
        },
        {
          "id": 3,
          "name": "Clementine Bauch",
          "username": "Samantha",
          "email": "Nathan@yesenia.net",
          "address": {
            "street": "Douglas Extension",
            "suite": "Suite 847",
            "city": "McKenziehaven",
            "zipcode": "59590-4157",
            "geo": {
              "lat": "-68.6102",
              "lng": "-47.0653"
            }
          },
          "phone": "1-463-123-4447",
          "website": "ramiro.info",
          "company": {
            "name": "Romaguera-Jacobson",
            "catchPhrase": "Face to face bifurcated interface",
            "bs": "e-enable strategic applications"
          }
        }
    ]

    res.send(userData)
})




module.exports = router