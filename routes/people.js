const express = require('express');
const router = express.Router();
const Film = require('../models/Film');
const Person = require('../models/People');
const nunjucks = require('nunjucks');
const validator = require('express-validator');



// Create a new person
router.post('/people', (req, res, next) => {
    res.send('<h1>create new person</h1>');
})

// Update a person
router.post('/people/:id', (req, res, next) => {
    res.send('<h1>Update person by id</h1>')
})

// Delete a person
router.delete('/people/:id', (req, res, next) => {
    res.send('<h1>Delete person by id</h1>');
})


module.exports = router;