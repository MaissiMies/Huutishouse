const express = require('express')
const router = express.Router()
const schemat = require('../models/schemas')
const fs = require('fs');
const bcrypt = require('bcryptjs');
const path = require('path');
const multer = require('multer');
const { error } = require('console');
const upload = multer({ dest: 'uploads/' }); // Specify the directory where you want to save the files

const io = require('socket.io')();


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
  const { kayttajaid, nimi,kategoria, lahtohinta, endingTime, hintavaraus } = req.body;

  try {
    const kuvaPath = req.file.path;

    const newTuote = new schemat.Tuote({
      kayttajaid,
      nimi,
      kategoria,
      lahtohinta,
      hintavaraus,
      endingTime,
      kuva: kuvaPath,
      huudot: {
        type: Array,
        default: [] // This ensures an empty array by default
      }
    });

    await newTuote.save();
    res.send('vastaanotto onnistui');
  } catch (error) {
    console.error('virhe', error);
    res.status(500).send(  error.message);
  }
});

router.post('/tuote-updatesingle/:id', async (req, res) => {
  const { id } = req.params;
  const { fieldToUpdate, newValue } = req.body;

  try {
      // Assuming schemat.Tuote is your Mongoose model
      await schemat.Tuote.findByIdAndUpdate(id, { $set: { [fieldToUpdate]: newValue } });
      res.status(200).json({ message: 'Document updated successfully' });
  } catch (error) {
      console.error('Error updating document:', error);
      res.status(500).json({ error: 'Error updating document' });
  }
});

router.post('/palauteviesti', async (req, res) => {
  const { nimi, viesti } = req.body;
  try {
    const palaute = schemat.Palaute({
      nimi,
      viesti
    })
    await palaute.save();
    res.status(200).json({ message: 'Form submission successful' });
  } catch (error) {
    console.error('Error handling form submission:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/palauteviesti', async (req, res) => {
  try {
    const palautteet = schemat.Palaute;
    const palaute = await palautteet.find();
    res.json(palaute);
    
  } catch (error) {
    console.error('Error fetching feedback messages:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/recenttuotteet', async (req, res) => {
  try {
    const tuotteet = schemat.Tuote;

    // Sort the products based on createdAt field in descending order (newest first)
    const recentTuotteet = await tuotteet.find().sort({ createdAt: -1 }).limit(5);

    res.json(recentTuotteet);
  } catch (error) {
    console.error('Error fetching recent items:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});




// GET /tuotteet/:kategoria - Hakee tuotteet tietyltä kategorialta
router.get('/tuotteet/kategoria/:kategoria', async (req, res) => {
  try {
    const tuoteet = schemat.Tuote;
    const valittukategoria = req.params.kategoria;
    console.log(valittukategoria);
    const tuotteetKategoriassa = await tuoteet.find({ kategoria: valittukategoria });
    
    if (!tuotteetKategoriassa || tuotteetKategoriassa.length === 0) {
      return res.status(404).json({ error: 'No products found for the specified category' });
    }
    
    res.json(tuotteetKategoriassa);
  } catch (error) {
    console.error('Error fetching products by category:', error);
    res.status(500).json({ error: error.message });
  } 
});

router.get('/tuotteet/:itemId/huudot', async (req, res) => {
  try {
   
    const Item = schemat.Tuote;
    const itemId = req.params.itemId;
    const item = await Item.findOne({_id : itemId});
    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }
    res.json(item.huudot);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: error.message });
  }
});






// GET /uploads/:kuva - Palauttaa pyydetyt kuvat
router.get('/uploads/:kuva', (req, res) => {
  // Palauta pyydetty kuva
  const kuva = req.params.kuva;
  const filePath = path.join(__dirname, '../uploads', kuva);
  res.sendFile(filePath);
});



// GET /tuotteet - Hakee kaikki tuotteet
router.get('/tuotteet', async (req, res) => {
  // Hae kaikki tuotteet ja lähetä ne vastauksena
  try {
    const tuotteet = schemat.Tuote
    const products = await tuotteet.find();
    res.json(products);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/tuotteet/search/:searchTerm', async (req, res) => {
  try {
    const searchTerm = req.params.searchTerm;
    // Perform a case-insensitive search
    const regex = new RegExp(searchTerm, 'i');
    const searchResults = await schemat.Tuote.find({ nimi: regex });

    if (!searchResults || searchResults.length === 0) {
      return res.status(404).json({ error: 'No items found for the specified search term' });
    }

    res.json(searchResults);
  } catch (error) {
    console.error('Error searching items:', error);
    res.status(500).json({ error: error.message });
  }
});

// GET /tuotteet/:_id - Hakee tietyn tuotteen
router.get('/tuotteet/:_id', async (req, res) => {
  // Hae tietty tuote id:n perusteella ja lähetä se vastauksena
  try {
    const tuotteet = schemat.Tuote;
    const tuoteId = req.params._id;
    const product = await tuotteet.findOne({ _id:tuoteId});

    if (!product) {
      return res.status(404).json({ error: error.message});
    }
    res.json(product);
  } catch (error) {
    console.error('Error fetching product data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }  
});
router.get('/tuotteet/mytuotteet/:user', async (req, res) => {
  try {
    const tuotteet = schemat.Tuote;
    const user = req.params.user; // Corrected variable name
    const product = await tuotteet.find({ kayttajaid: user }); // Corrected variable name

    if (!product) {
      return res.status(404).json({ error: 'Product not found' }); // Update error message
    }
    res.json(product);
  } catch (error) {
    console.error('Error fetching product data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }  
});

router.delete('/tuotteet/delete/:_id', async (req, res) => {
  // Delete a user with the given ID
  const productId = req.params._id;
  try {
    const product = await schemat.Tuote.findOneAndDelete({ _id: productId });

    if (!product) {
      return res.status(404).send('Product not found');
    }

    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).send(error.message);
  }
});
// PUT /tuotteet/:_id - Päivittää tietyn tuotteen tiedot
router.put('/tuotteet/:_id', async (req, res) => {
  // Päivitä tietyn tuotteen tiedot ja lähetä päivitetty tuote vastauksena
  const productId = req.params._id;
  const updatedProductData = req.body;
  try {
    const product = await schemat.Tuote.findOneAndUpdate(
      { _id:productId },
      updatedProductData,
      { new: true }
    );

    if (!product) {
      return res.status(404).send('Product not found');
    }

    res.json(product);
  } catch (error) {
    console.error('Error updating product data:', error);
    res.status(500).send('Internal Server Error');
  }
});



// POST /tuotteet/:_id/huudot - Lisää huudon tiettyyn tuotteeseen
router.post('/tuotteet/:_id/huudot', async (req, res) => {
  // Lisää huuto tiettyyn tuotteeseen ja lähetä vahvistus vastauksena
  const productId = req.params._id;
  const huuto = req.body
  try{
    const product = await schemat.Tuote.findOne({ _id : productId})
    if (!product) {
      return res.status(404).json({ error: 'product not found' });
    }

    // Tarkista, onko huutokauppa päättynyt
    if (new Date() > new Date(product.endingTime)) {
      return res.status(400).json({ error: 'Huutokauppa on jo päättynyt' });
    }    

    // Construct the new message object
    const newhuuto = {
      kayttajaid: huuto.kayttajaid,
      huuto: huuto.huuto,
      
    };

    // Update the messages array in the conversation document
    product.huudot.push(newhuuto);

    // Save the updated conversation document back to the database
    await product.save();

    res.status(200).json({ message: 'huuto added to conversation' });
  } catch (error) {
    console.error('Error adding huuto to tuote:', error);
    res.status(500).json({ error:  error.message });
  }
  

});



// GET /kategoriat - Hakee kaikki kategoriat
router.get('/kategoriat', async (req, res) => {
  // Hae kaikki kategoriat ja lähetä ne vastauksena
  try {
    const kategoriat = schemat.Kategoria
    const Kategoria = await kategoriat.find();
    res.json(Kategoria);
    
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});




// GET /kayttajat - Hakee kaikki käyttäjät
router.get('/kayttajat', async (req, res) => {
  // Hae kaikki käyttäjät ja lähetä ne vastauksena
  try {
    const kayttajat = schemat.Kayttaja
    const Kayttaja = await kayttajat.find();
    res.json(Kayttaja);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});



// GET /users/:_id - Hakee tietyn käyttäjän
router.get('/users/:_id', async (req, res) => {
  try {
  // Hae tietty käyttäjä id:n perusteella ja lähetä se vastauksena
    const kayttjat = schemat.Kayttaja;
    const userId = req.params._id;
    const user = await kayttjat.findOne({_id:userId});
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    console.error('Error fetching user data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});




// PUT /users/:id - Päivittää tietyn käyttäjän tiedot
router.put('/users/:id', async (req, res) => {
  // Päivitä tietyn käyttäjän tiedot ja lähetä päivitetty käyttäjä vastauksena
  const id = (req.params.id);
  const updatedUserData = req.body;
  try {
    const user = await schemat.Kayttaja.findOneAndUpdate(
      { _id:id }, // Find user by id
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




// POST /api/register - Rekisteröi uuden käyttäjän
router.post('/api/register', async (req, res) => {
  // Käsittele uuden käyttäjän rekisteröinti ja lähetä vastaus sen perusteella
  try {
    const { nimi, salasana, sposti, puhnum } = req.body;
    
    // Tarkista, onko sähköpostiosoite jo käytössä
    const existingUser = await schemat.Kayttaja.findOne({ sposti });
    if (existingUser) {
      return res.status(400).send('Sähköpostiosoite on jo rekisteröity.');
    }
    
    // Luo uusi käyttäjä
    const hashedPassword = await bcrypt.hash(salasana, 10);
    const newUser = new schemat.Kayttaja({ nimi, salasana: hashedPassword, sposti, puhnum });
    await newUser.save();

    res.status(201).send('Käyttäjä rekisteröityi onnistuneesti.');
  } catch (error) {
    console.error('Virhe rekisteröidessä käyttäjää:', error);
    res.status(500).send('Rekisteröinti epäonnistui.');
  }
});




// POST /api/login - Kirjaa käyttäjän sisään
router.post('/api/login', async (req, res) => {
  // Kirjaa käyttäjän sisään ja lähetä vastaus sen perusteella
  try {
    const { nimi, salasana } = req.body;
    const kayttajat = schemat.Kayttaja;
    
    // Find the user by username
    const user = await kayttajat.findOne({ nimi });

    if (!user) {
      return res.status(404).send('User not found');
    }

    // Compare passwords using a hashing library like bcrypt
    const passwordsMatch = await bcrypt.compare(salasana, user.salasana);
    if (passwordsMatch) {
      // If passwords match, send a success response
      res.status(200).json({ objectId: user._id,nimi: user.nimi, message: 'Login successful' });
    } else {
      // If passwords don't match, send an unauthorized response
      res.status(401).send('Invalid credentials');
    }
  } catch (error) {
    // Handle any errors
    res.status(500).send('Error logging in: ' + error.message);
  }
});




// POST /api/conversations - Luo uuden keskustelun
router.post('/api/conversations', async (req, res) => {
  const { participants } = req.body;
  // Luo uusi keskustelu ja lähetä vastaus sen perusteella

  try {
   

    // Create a new conversation document
    const Conversation = schemat.Keskustelu
    const newConversation = new Conversation({
      participants,
      messages:[] // This ensures an empty array by default
      
    });

    // Save the new conversation document to the database
    const savedConversation = await newConversation.save();

    res.status(201).json(savedConversation);
  } catch (error) {
    console.error('Error creating conversation:', error);
    res.status(500).json({ error: error.message });
  }
});
router.get('/conversation/:kayttaja', async (req, res) => {
  try {
  // Hae tietty käyttäjä id:n perusteella ja lähetä se vastauksena
    const conversation = schemat.Keskustelu;
    const kayttaja = req.params.kayttaja;
    console.log(kayttaja)
    const user = await conversation.find({
      $or: [
        { participants: { $elemMatch: { user1: kayttaja} } },
        { participants: { $elemMatch: { user2: kayttaja} } }
      ]
    });
    if (!user) {
      return res.status(404).json({ error: 'User convo found' });
    }
    console.log(user)
    res.json(user);
  } catch (error) {
    console.error('Error fetching user data:', error);
    res.status(500).json({ error: error.message });
  }
});




// POST /api/conversations/:conversationId/messages - Lisää uuden viestin keskusteluun
router.post('/api/conversations/:conversationId/messages', async (req, res) => {

  const { conversationId } = req.params;
  const { senderId, messageText, sendernameid } = req.body;
  // Lisää uusi viesti keskusteluun ja lähetä vahvistus vastauksena
    try{
 

    
    const Conversation = schemat.Keskustelu
    // Retrieve the conversation document from the database
    const conversation = await Conversation.findById(conversationId);

    if (!conversation) {
      return res.status(404).json({ error: 'Conversation not found' });
    }

    // Construct the new message object
    const newMessage = {
      sender: senderId,
      sendername: sendernameid,
      text: messageText,
      timestamp: new Date()
    };
    console.log(newMessage,"tämä")
    conversation.messages.push(newMessage);
    await conversation.save();

    res.status(200).json({ message: 'Message added to conversation',newMessage });
  } catch (error) {
    console.error('Error adding message to conversation:', error);
    res.status(500).json({ error: error.message });
  }
});




// GET /api/user/:userId/conversations - Hakee käyttäjän kaikki keskustelut
router.get('/api/user/:userId/conversations', async (req, res) => {
  const { userId } = req.params;
  // Hae käyttäjän kaikki keskustelut ja lähetä ne vastauksena

  try {
    // Find all conversations where the user's ID appears in the participants array
    const conversations = await Conversation.find({ participants: userId });

    res.status(200).json(conversations);
  } catch (error) {
    console.error('Error finding conversations:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});




// DELETE /users/:id - Poistaa tietyn käyttäjän

router.delete('/users/:id', async (req, res) => {
  const userId = req.params.id;
  // Poista tietty käyttäjä ja lähetä vahvistus vastauksena

  try {
    // Etsi ja poista käyttäjä tietokannasta
    const deletedUser = await schemat.Kayttaja.findByIdAndDelete(userId);

    if (!deletedUser) {
      return res.status(404).send('Käyttäjää ei löydetty');
    }

    res.status(200).send('Käyttäjä poistettu onnistuneesti');
  } catch (error) {
    console.error('Virhe käyttäjän poistossa:', error);
    res.status(500).send('Internal Server Error');
  }
});


router.post('/api/password-reset', async (req, res) => {
  try {
    const { nimi, sposti, puhnum, salasana } = req.body;

    // Check if the email is already in use
    const existingUser = await schemat.Kayttaja.findOne({ nimi, sposti });

    if (existingUser) {
      // Hash the new password
      const hashedPassword = await bcrypt.hash(salasana, 10);

      // Update the user's password
      const updatedUserData = { nimi, salasana: hashedPassword, sposti, puhnum:puhnum };
      const finding = await schemat.Kayttaja.findOneAndUpdate(
        { nimi, sposti },
        updatedUserData,
        { new: true }
      );

      res.status(200).send('Salasana vaihdettu onnistuneesti.');
    } else {
      res.status(404).send('Käyttäjää ei löydetty');
    }

  } catch (error) {
    console.error('Virhe salasanan palautuksessa:', error);
    res.status(500).send('Salasanan palauttaminen epäonnistui');
  }
});






module.exports = router