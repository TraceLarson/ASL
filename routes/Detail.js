const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');

let notesDataPath = path.join(__dirname, '/../data/notes.json');


// Method to get notes
let getNotes = (req, res, next) =>{
    fs.readFile(notesDataPath, (err, data) => {
        req.notes = JSON.parse(data);
        next();
    })
}


// GET request for the notes detail
router.get('/:id', getNotes, (req, res, next) =>{
    console.log('requesting details');
    console.log(req.notes[req.params.id]);
    res.render(path.join(__dirname, '/../views/detail'), {
        detail : req.notes[req.params.id]
    })
})


module.exports = router;