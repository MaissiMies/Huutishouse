const mongoose = require('mongoose')
const Schema = mongoose.Schema

const kayttajatSchema = new Schema({
    nimi: { type: String },
    puhelinnro: { type: String },
    sposti: { type: String },
    kayttajatuunnus: { type: String },
    adminoikeudet: { type: Boolean, default: false }
})

const tuoteSchema = new Schema({
    nimi: { type: String },
    lahtohinta: { type: Number },
    hintavaraus: { type: Number },
    kuva: { type: String }
})

const Kayttajat = mongoose.model('Kayttajat', kayttajatSchema, 'kayttajat')
const Tuote = mongoose.model('Tuote', tuoteSchema, 'tuote')
const schemat = { 'Kayttajat': Kayttajat, 'Tuote':Tuote }

module.exports = schemat
