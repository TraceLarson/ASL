const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));


const index = require('./routes/index');
const users = require('./routes/users');
app.use('/', index);
app.use('/users', users);



module.exports = app;