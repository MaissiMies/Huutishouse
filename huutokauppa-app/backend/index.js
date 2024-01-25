const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const router = require('./routes/router')
const mongoose = require('mongoose')
require('dotenv/config')

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))

const corsOptions = {
    origin:'*',
    credentials:true,
    optioSuccessStatus:200
}

app.use(cors(corsOptions))
app.use('/', router)

const dboptions = {useNewUrlParser:true, useUnifiedTopology:true}
mongoose.connect(process.env.DB_URI, dboptions)
.then (()=> console.log('Yhdistäminen DB onnistui'))
.catch(err => console.log(err))


//lisää src package.jsoniin "proxy":http://localhost:3001,
const port = process.env.PORT || 3001
const server = app.listen(port,() => {
    console.log(`Server running on port ${port}`)
})

