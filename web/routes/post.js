const express = require('express');
const router = express.Router();
const path = require('path');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const axios = require('axios');


router.get('/', (req, res, next) => {
	res.render(path.join(__dirname, '/../views/post/createPost'), {
		page_name: 'post'
	});
});

router.get('/:id', (req, res, next) => {
	axios.put('http://localhost:8000/post/' + req.params.id)
		.then(response => {
			response ?
				console.log('success', response)
				:
				console.log('no response');
			res.redirect('/feed');
		})
		.catch(error => {
			console.log('error updating likes', error);
		})
});

module.exports = router;