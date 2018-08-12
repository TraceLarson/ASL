const express = require('express');
const router = express.Router();
const path = require('path');
const Film = require('../models/Film');
const Person = require('../models/People');

const nunjucks = require('nunjucks');
const validator = require('express-validator');



// Response to index route
router.get('/', (req, res, next)=> {

    /*let xmen2 = new Film({
        name: 'xmen2',
        releaseDate: '2018-8-11',
        studio: 'Fox',
        rating: 'PG13',
        length: '132',
    });
    xmen2.validate(err => {
        console.log('Film error', err);
    });

    let profx = new Person({
        name: 'Patrick Stewart',
        character: 'Professor X',
        role: 'Cast'
    });
    profx.validate(err => {
        console.log('Person err', err);
    })

    Film.find({}, function(err, films) {
        if (err){
            console.log('error finding films ', err);
        };

        console.log(films);
    })*/

    res.render(path.join(__dirname, '/../views/index'), {
        page_name: 'Home',
    });
})





module.exports = router;