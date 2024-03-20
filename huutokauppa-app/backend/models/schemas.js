const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const kayttajatSchema = new Schema({
    //_id: { type: String },
    nimi: { type: String },
    puhnum: { type: String },
    sposti: { type: String },
    salasana: { type: String },
    //adminoikeudet: { type: Boolean, default: false }
});

const tuoteSchema = new Schema({
    nimi: { type: String, required: true },
    lahtohinta: { type: Number, required: true },
    hintavaraus: { type: Number },
    kuva: { type: String }
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
  
// Luo Viesti-malli tietokantataululle
const Viesti = mongoose.model('Viesti', ViestiSchema, 'viestit');
const Kayttaja = mongoose.model('Kayttaja', kayttajatSchema, 'kayttajat');
const Tuote = mongoose.model('Tuote', tuoteSchema, 'tuotteet');
const Kategoria = mongoose.model('Kategoria', kategoriaSchema, 'kategoriat');

module.exports = {
    Kayttaja,
    Tuote,
    Kategoria,
    Viesti
};