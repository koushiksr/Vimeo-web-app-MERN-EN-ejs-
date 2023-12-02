const express = require('express')
const bodyParser = require('body-parser')
require('./models/db')
require('dotenv').config();

const app = express()
app.use(bodyParser.json())

app.use('/upload', require('./routes/vimeoRoute'))

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`App running on port ${PORT}`)  )