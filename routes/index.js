const express = require('express');
const router = express.Router();
const Film = require('../models/Film');


// Response to index route
router.get('/', (req, res, next)=> {
    let xmen = new Film({name: 'Xmen', })
    res.send('<h1>Hello World</h1>');
})


module.exports = router;