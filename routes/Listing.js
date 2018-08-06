const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');

let notesDataPath = path.join(__dirname, '/../data/notes.json');

// Method to get notes
let getNotes = (req, res, next) =>{
    fs.readFile(notesDataPath, (err, data) => {
        req.notes = JSON.parse(data);
    })
}

// load listing page
router.get('/',/* getNotes,*/ (req, res, next) => {
    res.render(path.join(__dirname, '/../views/listing.njk'));
})


module.exports = router;