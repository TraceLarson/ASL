const express = require('express');
const router = express.Router();
const path = require('path');
const expressValidator = require('express-validator');
const axios = require('axios');


// load create user page
router.get('/', (req, res, next) => {
	res.render(path.join(__dirname, '/../views/user/createUser'), {
		page_name: 'createUser'
	});
});


// Create a new user
router.post('/', (req, res, next) => {

	axios.post('http://localhost:8000/user', req.body)
		.then(response => {
			console.log("response: " + response.data);
			res.redirect('/feed');
		})
		.catch(error => {
			console.log('Error creating new post', error.message);
		})

});

module.exports = router;