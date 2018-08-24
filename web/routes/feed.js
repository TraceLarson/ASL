const express = require('express');
const router = express.Router();
const path = require('path');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const axios = require('axios');


router.get('/', (req, res, next) => {
	axios.get('http://localhost:8000/feed')
		.then((response) => {
			response ?
				console.log('Success')
				:
				console.log('response from feed was null');
			let feed = [];
			response = response.data;
			response.map(object => {
				feed.push(object);
			});

			// Render page with news feed
			res.render(path.join(__dirname, '/../views/feed/feed'), {
				page_name: 'feed',
				feed: feed
			})
		})
		.catch(error => {
			console.log('Error getting feed: ', error);
		})


});

router.get('/{userID}', (req, res, next) => {
	res.render(path.join(__dirname, '/../views/feed/userFeed'), {
		page_name: 'feed'
	})
})

module.exports = router;