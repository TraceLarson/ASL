const express          = require('express');
const nunjucks         = require('nunjucks');
const app              = express();
const bodyParser       = require('body-parser');
const path             = require('path');
const expressValidator = require('express-validator');




// Nunjucsks configuration
app.set('view engine', 'njk');
app.set('views', path.join(__dirname, '/../views'));
nunjucks.configure('views' ,{
    autoescape: true,
    express: app
})

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


const index = require('./routes/Index');
const listing = require('./routes/Listing');
const create = require('./routes/Create');
const detail = require('./routes/Detail');
app.use('/', index);
app.use('/Listing', listing);
app.use('/Create', create);
app.use('/Detail', detail);

//TODO: Remove users
const users = require('./routes/users');
app.use('/users', users);

module.exports = app;