const express = require('express');
const router = express.Router();
const path = require('path');
const Film = require('../models/Film');
const Person = require('../models/People');
const nunjucks = require('nunjucks');
const validator = require('express-validator');



// Load Create a new person page
router.get('/', (req, res, next) => {
    res.render(path.join(__dirname, '/../views/people/create'),{
        page_name: 'People'
    })
})

// Create a new person
// TODO: Create person router

// Update a person
router.get('/:id', (req, res, next) => {
    res.send(req.params)
})

// Delete a person
router.delete('/people/:id', (req, res, next) => {
    res.send('<h1>Delete person by id</h1>');
})


module.exports = router;