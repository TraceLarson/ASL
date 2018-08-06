const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');
const expressValidator = require('express-validator');


// Path to notes data
let notesDataPath = path.join(__dirname, '/../data/notes.json');

// Method to get notes
let getNotes = (req, res, next) =>{
    fs.readFile(notesDataPath, (err, data) => {
        req.notes = JSON.parse(data);
        next();
    })
}

// UPDATE the notes.json
let saveNote = (notes) => {
    let json = JSON.stringify(notes);
    fs.writeFile(notesDataPath, json, 'utf8', ()=>{})
}


// load Create page
router.get('/', (req, res, next) => {
    res.render(path.join(__dirname, '/../views/create'),{
        page_name : 'Create'
    });
})

// POST request to create a note
router.post('/add', getNotes,(req, res, next) => {
    req.checkBody('title', 'A title is required').notEmpty();
    req.checkBody('date', 'A date is required').notEmpty();
    req.checkBody('summary', 'A summary is required').notEmpty();
    req.checkBody('fulltext', 'The text of the note is required').notEmpty();

    var errors = req.validationErrors();

    if(errors){
        console.log('ERRORS');
        res.render(path.join(__dirname, '/../views/create'),{
            page_name : 'Create',
            errors : errors
        });
    } else {
        console.log('Success');
        req.notes[req.body.title] = req.body;
        console.log(req.notes[req.body.title]);
        saveNote(req.notes);
        res.redirect('/Create');
    }

})


module.exports = router;