const express = require('express');
const router = express.Router();
const vimeo = require('../models/vimeoModel');

router.post('/', async (req, res) => {
  try {
    const {videoID,description,date} = req.body
    const newData = await  vimeo.create({videoID,description,date});
    (newData||newData!=null)?res.render('home'):res.status(404).send({msg:'error storing video data in our DB'})
  } catch (error) {
    res.status(500).send({ error: 'error storing video data in our DB'}); 
  }
});

module.exports = router;