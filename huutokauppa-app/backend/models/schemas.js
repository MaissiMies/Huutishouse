const mongoose = require('mongoose')
const Schema = mongoose.Schema


const kayttajat = mongoose.model('Kayttajat', kayttajatSchema, 'kayttajat')



const kayttajatSchema = new Schema({
    nimi:{type:string},
    puhelinnro:{type:string},
    sposti:{type:string},
    kayttajatuunnus:{type:string},
    adminoikeudet: {type:Boolean, default:false}
})

const tuoteSchema = new Schema({
    nimi:{type:string},
    lahtohinta:{type:float},
    hintavaraus:{type:float},
    kuva:{type:Image}
})

const schemat = {'Kayttajat':kayttajat}

module.exports = schemat