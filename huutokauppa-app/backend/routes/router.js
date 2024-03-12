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
    res.json(products);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/tuotteet/:productId', async (req, res) => {
  try {
    const tuotteet = schemat.Tuote;
    const tuoteId = parseInt(req.params.productId);
    const product = await tuotteet.findOne({ productId: tuoteId });
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    console.error('Error fetching product data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }  
});

router.put('/tuotteet/:productId', async (req, res) => {
  const productId = parseInt(req.params.productId);
  const updatedProductData = req.body;
  try {
    const product = await schemat.Tuote.findOneAndUpdate(
      { productId: productId }, // Find user by id
      updatedProductData, // Updated user data
      { new: true } // Return the modified user
    );

    if (!product) {
      return res.status(404).send('Product not found');
    }

    res.json(product); // Send updated user data as response
  } catch (error) {
    console.error('Error updating product data:', error);
    res.status(500).send('Internal Server Error');
  }
});
router.get('/kategoriat', async (req, res) => {
  try {
    const kategoriat = schemat.Kategoria
    const Kategoria = await kategoriat.find();
    res.json(Kategoria);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
router.get('/kayttajat', async (req, res) => {
  try {
    const kayttajat = schemat.Kayttaja
    const Kayttaja = await kayttajat.find();
    res.json(Kayttaja);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
router.get('/users/:id', async (req, res) => {
  try {
    const kayttjat = schemat.Kayttaja;
    const userId = parseInt(req.params.id);
    const user = await kayttjat.findOne({id: userId});
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    console.error('Error fetching user data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.put('/users/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  const updatedUserData = req.body;
  try {
    const user = await schemat.Kayttaja.findOneAndUpdate(
      { id: id }, // Find user by id
      updatedUserData, // Updated user data
      { new: true } // Return the modified user
    );

    if (!user) {
      return res.status(404).send('User not found');
    }

    res.json(user); // Send updated user data as response
  } catch (error) {
    console.error('Error updating user data:', error);
    res.status(500).send('Internal Server Error');
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