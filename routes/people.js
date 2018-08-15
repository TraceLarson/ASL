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
        console.log(people);
        res.render(path.join(__dirname, '/../views/people/create'), {
            page_name: 'People',
            people: people
        })
    })


})

// Post request to create a new Person
router.post('/', (req, res, next) => {
    req.checkBody('name', 'A name is required').notEmpty();
    req.checkBody('character', 'A character name is required').notEmpty();
    req.checkBody('role', 'A role is required').notEmpty();
    req.checkBody('film', 'A film is required').notEmpty();

    var errors = req.validationErrors();

    if(errors){
        res.render(path.join(__dirname, '/../views/people/create'),{
            page_name : 'People',
            errors : errors
        });
    } else {
        Film.findOne({name: req.body.film}, (err, film) => {
            var newPerson = People({
                name: req.body.name,
                character: req.body.character,
                role: req.body.role,
                film: film.id,
            });
            newPerson.validate(err => {
                if (err){
                    console.log('newPerson validate err', err);
                    res.render(path.join(__dirname, '/../views/people/create'),{
                        page_name : 'People',
                        errors : err
                    });
                }
            });
            newPerson.save((err, person) => {
                if (err){
                    console.log('error saving Person document', err);
                    res.render(path.join(__dirname, '/../views/people/create'),{
                        page_name : 'People',
                        errors : err
                    });
                }
                console.log('Person Created: ' + person);
                console.log('film id: ' + newPerson.film);

            });

            film.people.push(newPerson.id);
            film.save(err => {
                if(err){
                    console.log('Error saving film');
                    res.render(path.join(__dirname, '/../views/people/create'),{
                        page_name : 'People',
                        errors : err
                    });
                }else{
                    res.redirect('/people');
                }
            })

        });
    }
});

// Update a People
router.put('/:id', (req, res, next) => {
    console.log(req.body);

    People.findOneAndUpdate(
        {_id: req.params.id},
        {$set: req.body},
        {new: true},
        (err, people) => {
            if (err) console.log('error occurred', err);
            console.log(people);
            res.send(people);
        })
})

// Delete a People
router.delete('/:id', (req, res, next) => {
    People.findOneAndRemove({
        _id: req.params.id
    }, (err, person) => {
        if (err)
            res.send('error deleting')
         else {
            console.log(person);
            res.send('deleted');
        }
    })
})


module.exports = router;