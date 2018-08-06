const express        = require('express');
const nunjucks       = require('nunjucks');
const app            = express();
const bodyParser     = require('body-parser');


// Nunjucsks configuration
nunjucks.configure('views' ,{
    autoescape: true,
    express: app
})

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));


const index = require('./routes/index');
const users = require('./routes/users');
app.use('/', index);
app.use('/users', users);



module.exports = app;