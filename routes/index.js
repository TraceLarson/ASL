const express = require('express');
const router = express.Router();
const Film = require('../models/Film');
const Person = require('../models/People');
const nunjucks = require('nunjucks');
const validator = require('express-validator');



// Response to index route
router.get('/', (req, res, next)=> {

    let xmen = new Film({name: 'Xmen', releaseDate:'2016-05-18', rating: 'PG13' });
    xmen.validate(err => {
        console.log('Film err', err);
    })

    let wolverine = new Person({name: 'Hugh Jackman', character: 'Wolverine', role: 'Cast'});
    wolverine.validate(err => {
        console.log('Person err', err);
    })

    res.send('<h1>Hello World</h1>');
})





module.exports = router;