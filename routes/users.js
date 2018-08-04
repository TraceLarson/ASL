const express = require('express');
const router = express.Router();

const path = require('path');
const fs = require('fs');

let userDataPath = path.join(__dirname, '/../data/users.json');

let getUsers = (req, res, next) => {
    fs.readFile(userDataPath, (err, data) => {
        req.users = JSON.parse(data);
        next()
    })
}

let saveUsers = (users) => {
    let json = JSON.stringify(users);
    fs.writeFile(userDataPath, json, 'utf8', () => {});
}

router.get('/list', getUsers, (req, res, next) => {
    console.log(req.users);
    res.json(req.users)
})

router.post('/', getUsers, (req, res, next) =>{
    console.log(req.body);
    req.users[req.body.username] = req.body;
    saveUsers(req.users);
    res.redirect('/');
})

router.put('/:uname', getUsers, (req, res, next) => {
    req.users[req.params.uname] = req.body;
    saveUsers(req.users);
    res.json(req.users[req.params.uname]);
})

router.delete('/:uname', getUsers, (req, res, next) => {
    delete req.users[req.params.uname];
    saveUsers(req.users);
    res.sendStatus(200);
})


module.exports = router;