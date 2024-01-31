const mongoose = require('mongoose')
const Schema = mongoose.Schema


const kayttajatSchema = new Schema({
    nimi: { type: String },
    puhelinnro: { type: String },
    sposti: { type: String },
    kayttajatuunnus: { type: String },
    adminoikeudet: { type: Boolean, default: false }
})

//vielä vähän kysymysmerkki toimiiko kuva stringinä, ottaa kai talteen kuvan sijainnin
const tuoteSchema = new Schema({
    nimi: { type: String },
    lahtohinta: { type: Number },
    hintavaraus: { type: Number },
    kuva: { type: String }
})
const Tuote = mongoose.model('Tuote', tuoteSchema, 'tuotteet')

const Kayttajat = mongoose.model('Kayttajat', kayttajatSchema, 'kayttajat')

const schemat = { 'Kayttajat': Kayttajat, 'Tuote':Tuote }

module.exports = schemat
