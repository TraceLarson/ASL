const express = require('express');
const router = express.Router();
const Film = require('../models/Film');
const Person = require('../models/People');
const nunjucks = require('nunjucks');
const validator = require('express-validator');



// Get all the films from the database
router.get('/films', (req, res, next) => {
    res.send('<h1>All Films</h1>')
})

// Get one film from the databse with all the people in that film
router.get('/films/:id', (req, res, next) => {
    res.send('<h1>Film by id and all actors</h1>');
})

// Create a new film
router.post('/films', (req, res, next) => {
    res.send('<h1>Create new film</h1>');
})



module.exports = router;