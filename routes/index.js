const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Pet = require('../models/Pet');


router.get('/', (req, res, next) => {
    let rachel = new User({name: 'Rachel', username: 'Rachete',meta: {dob: new Date(1999, 11, 20)}});
    rachel.validate((err)=>{
        console.log('err', err);
    })
    console.log('age', rachel.getAge());

    let barney = new Pet({name: 'barney', type: 'fish'});
    barney.validate(err => {
        console.log('err', err);
    })

    res.send('<h1>Hello World</h1>');
})

module.exports = router;