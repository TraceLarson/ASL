const express = require('express');
const router = express.Router();
const path = require('path');
const Film = require('../models/Film');
const Person = require('../models/People');
const nunjucks = require('nunjucks');
const validator = require('express-validator');


// Get all the films from the database
router.get('/', (req, res, next) => {
    Film.find({}, function (err, films) {
        if (err) {
            console.log('error finding films ', err);
        }

        console.log(films);
        res.render(path.join(__dirname, '/../views/films/films'), {
            page_name: 'Films',
            films: films
        });
    })

})

// Get one film from the databse with all the people in that film
router.get('/:id', (req, res, next) => {
    res.send(req.params);
    // res.render(path.join(__dirname, '/../views/films/films'),{
    //     page_name: 'Films'
    // });
})

// Load Create page
router.get('/films/createFilm', (req, res, next) => {
    res.render(path.join(__dirname, '/../views/films/createFilm'),{
        page_name: 'Films'
    });
})

// Post request to create a new film
router.post('/films', (req, res, next) => {
    var newFilm = Film({
        name: 'xmen2',
        releaseDate: '2018-8-11',
        studio: 'Fox',
        rating: 'PG13',
        length: '132',
    });

    newFilm.save(err => {
        if (err) throw err;

        console.log('User Created');
        res.redirect('/films/films');
    })
})


module.exports = router;