const express = require('express');
const app = express();
const mongoose = require('mongoose');
const nunjucks = require('nunjucks');
const bodyParser = require('body-parser');
const path = require('path');
const expressValidator = require('express-validator');


// Nunjucks configuration
app.set('view engine', 'njk');
app.set('view', path.join(__dirname, '/../views'));
nunjucks.configure('views', {
    autoescape: true,
    express: app
})

// Configure body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// Express Validator Middleware
app.use(expressValidator({
    errorFormatter: function (param, msg, value) {
        var namespace = param.split('.')
            , root = namespace.shift()
            , formParam = root;

        while(namespace.length){
            formParam += '[' + namespace.shift() + ']';
        }
        return {
            param : formParam,
            msg   : msg,
            value : value
        };
    }
}));

// Connect to mongodb database
mongoose.connect('mongodb://' + process.env.MONGO_HOST + '/' + process.env.MONGO_DATABASE);

// Get the default connection
var db = mongoose.connection;

// Bind connection to error event
db.on('error', console.error.bind(console,'MongoDB connection error'));

// Bind connection to connection event
db.once('open', ()=> console.log('DATABASE CONNECTED SUCCESSFULLY'));


// Routes
const index = require('./routes/index');
app.use('/', index);



module.exports = app;