const express        = require('express');
const nunjucks       = require('nunjucks');
const app            = express();
const bodyParser     = require('body-parser');
const path           = require('path');



// Nunjucsks configuration
app.set('view engine', 'njk');
app.set('views', path.join(__dirname, '/../views'));
nunjucks.configure('views' ,{
    autoescape: true,
    express: app
})

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));


const index = require('./routes/Index');
const listing = require('./routes/Listing');
const create = require('./routes/Create');
app.use('/', index);
app.use('/Listing', listing);
app.use('/Create', create);

//TODO: Remove users
const users = require('./routes/users');
app.use('/users', users);

module.exports = app;