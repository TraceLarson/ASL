const express = require('express');
const router = express.Router();
const path = require('path');
const Film = require('../models/Film');
const Person = require('../models/People');
const nunjucks = require('nunjucks');
const validator = require('express-validator');


// Get all the films from the database
router.get('/', (req, res, next) => {
    Film.find().populate('people').exec((err, films) => {
        if(err) console.log('Error finding films ', err);
        console.log(films[0]);
        res.render(path.join(__dirname, '/../views/films/films'), {
            page_name: 'Films',
            films: films
        })
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
    Film.findOne( { _id: req.params.id } ).populate('people').exec((err, film) => {
        if (err) console.log('Error finding by id', err);
        res.json(film.people);
    });
});

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
        if (err) console.log('Error creating Film document', err);
        console.log('Film Created');
        // res.send(film);
        res.redirect('/films');
    })
})


module.exports = router;