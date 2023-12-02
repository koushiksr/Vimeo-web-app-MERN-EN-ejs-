const express = require('express')
const bodyParser = require('body-parser')
const vimeoRoute=require('./routes/vimeoRoute')
require('./models/db')
require('dotenv').config();
const app = express()
app.use((req, res, next) => {
    res.locals.env = process.env;
    next();
  });
app.set('view engine', 'ejs');
app.use(express.static("public"));
app.use(express.static(__dirname + '/views'));

app.use(bodyParser.json())
app.get('/', (req, res) => {res.render('home')});
app.use('/upload',vimeoRoute)

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`App running on port ${PORT}`)  )