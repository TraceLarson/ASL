const express = require('express');
const router = express.Router();

const path = require('path');
const fs = require('fs');

let userDataPath = path.join(__dirname, '/../data/users.json');

let getUsers = (res, req, next) => {
    fs.readFile(userDataPath, (err, data) => {
        req.users = JSON.parse(data);
        next();
    })
}

// UPDATE the users.json file
let saveUsers = (users) => {
    let json = JSON.stringify(users);
    fs.writeFile(userDataPath, json, 'utf8', ()=>{});
}

// GET request for the users/list route
router.get('/list', getUsers, (req, res, next) => {
    res.json(req.users);
})

// POST request to /users
router.post('/', getUsers, (req, res, next) => {
    // Set the request body to the username key
    req.users[req.body.username] = req.body;
    saveUsers(req.users);
    res.redirect('/');
})

// PUT requests to /users/:uname. :uname = the username parameter that is part of the urls
router.put('/:uname', getUsers, (req, res, next) => {
    req.users[req.params.uname] = req.body;
    saveUsers(req.users);
    res.json(req.users[req.params.uname]);
})

// DELETE requests to /users/:uname
router.delete('/:uname', getUsers, (req, res, next) => {
    delete req.users[req.params.uname];
    saveUsers(req.users);
    res.sendStatus(200);
})

module.exports = router;