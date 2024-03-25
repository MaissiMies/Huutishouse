const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const kayttajatSchema = new Schema({
  
    nimi: { type: String },
    puhnum: { type: String },
    sposti: { type: String },
    salasana: { type: String },
    
    
});

const tuoteSchema = new Schema({
  kayttajaid: { type: String, required: true },
  nimi: { type: String, required: true },
  kategoria: {type : String},
  lahtohinta: { type: Number, required: true },
  hintavaraus: { type: Number },
  kuva: { type: String },
  huudot: [{
    kayttajaid: String,
    huuto: String,
    timestamp: { type: Date, default: Date.now }
  }],
  createdAt: { type: Date, default: Date.now },
  endingTime: { type: Date, required: true } // Lisätty endingTime-kenttä
}, {
  timestamps: true
});

const kategoriaSchema = new Schema({
    selite: { type: String, required: true }
});


// Määritellään viestin skeema
const ViestiSchema = new mongoose.Schema({
    käyttäjänimi: {
      type: String,
      required: true
    },
    viesti: {
      type: String,
      required: true
    },
    aikaleima: {
      type: Date,
      default: Date.now
    }
  });

  const conversationSchema = new mongoose.Schema({
    participants: [], // Reference to User model
    messages: [{
      sender: { type: Schema.Types.ObjectId, ref: 'kayttajaschema' }, // Reference to User model
      text: String,
    }]
  });
  
// Luo Viesti-malli tietokantataululle
const Viesti = mongoose.model('Viesti', ViestiSchema, 'viestit');
const Kayttaja = mongoose.model('Kayttaja', kayttajatSchema, 'kayttajat');
const Tuote = mongoose.model('Tuote', tuoteSchema, 'tuotteet');
const Kategoria = mongoose.model('Kategoria', kategoriaSchema, 'kategoriat');
const Keskustelu = mongoose.model("Keskustelu", conversationSchema, 'keskustelut')

module.exports = {
    Kayttaja,
    Tuote,
    Kategoria,
    Viesti,
    Keskustelu
};