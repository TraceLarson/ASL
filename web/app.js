const express = require('express');
const app = express();
const nunjucks = require('nunjucks');
const bodyParser = require('body-parser');
const path = require('path');
const expressValidator = require('express-validator');


// Set Static files
app.use(express.static('public'));

// Nunjucks config
app.set('view engine', 'njk');
app.set('view', path.join(__dirname, '/../views'));
nunjucks.configure('views', {
	express: app
});

// Body-Parser confg
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



// Routes
const index = require('./routes/index');
app.use('/', index);


module.exports = app;