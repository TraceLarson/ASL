const express = require('express');
const router = express.Router();
const path = require('path');
const Film = require('../models/Film');
const People = require('../models/People');
const nunjucks = require('nunjucks');
const validator = require('express-validator');


// Method to find the Film
let getFilm = (res, req, next) => {


}

// Load Create a new person page
router.get('/', (req, res, next) => {
    People.find({}, function (err, people) {
        if (err) {
            console.log('error finding people ', err);
        }
        // console.log(people);
        res.render(path.join(__dirname, '/../views/people/create'), {
            page_name: 'People',
            people: people
        })
    })


})

// Post request to create a new Person
router.post('/', (req, res, next) => {
    var newPerson = People({
        name: req.body.name,
        character: req.body.character,
        role: req.body.role,
        film: req.body.film,
    });
    newPerson.validate(err => {
        if(err) console.log('newPerson validate err', err);
    });

    newPerson.save((err, person) => {
        if (err) throw err;
        console.log('Person Created');
        console.log('film id: ' + req.body.film);
        Film.findOne({_id: req.body.film}, (err, film)=>{
            if(err) console.log('find film error');
            film.people.push(req.body.film);
            film.save((err, film)=>{
                if(err) console.log('error saving film');
                res.redirect('/films');
            })
        })
            // .populate('people')
            // .exec(function (err, film) {
            //     if (err) console.log('film query err ', err);
            //     console.log('the films are' + film);
            //     film.save((err)=>{
            //         res.redirect('/films');
            //     })
            // });
    })


});

// Update a People
router.put('/:id', (req, res, next) => {
    People.findOneAndUpdate(
        {_id: req.params.id},
        {$set: {name: req.body.name}},
        {upsert: true},
        (err, newPerson) => {
            if (err) {
                console.log('error occurred')
            } else {
                console.log(newPerson);
                res.send(newPerson);
            }
        })
    res.redirect('/people');
})

// Delete a People
router.delete('/:id', (req, res, next) => {
    People.findOneAndRemove({
        _id: req.params.id
    }, (err, person) => {
        if (err) {
            res.send('error deleting')
        } else {
            console.log(person);
            res.send('deleted');
        }
    })
    res.redirect('/people')
})


module.exports = router;