const express = require('express');
const router = express.Router()
const User = require('../models/User');

router.get('/', (req, res, next) => {
	console.log('GET ALL');
	User.find((err, users) => {
		res.json(users);
    });
});

router.post('/', (req, res, next) => {
    console.log('CREATED NEW', req.body);
    // Symfony sends the date in a weird format, here we are fixing it before we save it
    req.body.dob = req.body.dob.date;
    let newUser = new User(req.body);
    newUser.save((err, user) => {
        if (err) {
            console.log('ERROR', err);
            return res.send(err);
        }
        res.json(user);
    })
});

router.get('/:username', (req, res, next) => {
	console.log('GET ONE' + req.params.username);
	User.findOne({username: req.params.username}, (err, user) => {
		res.json(user);
    })
});

router.put('/:username', (req,res,next) =>{
	console.log('UPDATE: ' + req.params.username);
	req.body.dob = req.body.dob.date;
	User.findOneAndUpdate({username: req.body.username}, req.body, (err, user) => {
		res.json(user);
    })
});

router.delete('/:username', (req, res, next) => {
	console.log('DELETE: ' + req.params.username);
	User.remove({username: req.params.username}, (err) => {
		res.sendStatus(200);
    })
})

module.exports = router;