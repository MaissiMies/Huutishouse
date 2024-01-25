const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const router = require('./routes/router')

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

//lisää src package.jsoniin "proxy":http://localhost:3001,
const port = 3001
const server = app.listen(port,() => {
    console.log(`Server running on port ${port}`)
})

