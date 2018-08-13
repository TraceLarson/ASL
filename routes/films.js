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
        // console.log(films);
        res.render(path.join(__dirname, '/../views/films/films'), {
            page_name: 'Films',
            films: films
        });
    })
})

// Load Create page
router.get('/create', (req, res, next) => {
    res.render(path.join(__dirname, '/../views/films/create'),{
        page_name: 'Films'
    });
})

// Get one film from the databse with all the people in that film
router.get('/:id', (req, res, next) => {
    res.send(req.params);
    // res.render(path.join(__dirname, '/../views/films/films'),{
    //     page_name: 'Films'
    // });
})

// Post request to create a new film
router.post('/', (req, res, next) => {
    var newFilm = Film({
        name: req.body.name,
        releaseDate: req.body.releaseDate,
        studio: req.body.studio,
        rating: req.body.rating,
        length: req.body.length,
    });

    newFilm.save((err, film) => {
        if (err) throw err;
        console.log('User Created');
        // res.send(film);
        res.redirect('/films');
    })
})


module.exports = router;