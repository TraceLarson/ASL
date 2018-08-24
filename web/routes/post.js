const express = require('express');
const router = express.Router();
const path = require('path');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const axios = require('axios');


// Create a new post, will load all users from database
router.get('/', (req, res, next) => {
	axios.get('http://localhost:8000/user/list')
		.then(response => {
			response ?
				console.log('Success')
				:
				console.log('response from server was null');
			let users = [];
			response = response.data;
			response.map(object => {
				users.push(object);
			});

			res.render(path.join(__dirname, '/../views/post/createPost'), {
				page_name: 'post',
				users: users
			});
		})
		.catch(error => {
			console.log('error getting users list', error);
		})

});

// Send PUT through axios to update likes and redirect back to feed.
router.get('/:id', (req, res, next) => {
	axios.put('http://localhost:8000/post/' + req.params.id)
		.then(response => {
			response ?
				console.log('success', response)
				:
				console.log('no response');
			res.redirect('back');
		})
		.catch(error => {
			console.log('error updating likes', error);
		})
});

// Send PUT through axios to update likes and redirect back to feed.
router.delete('/:id', (req, res, next) => {
	axios.delete('http://localhost:8000/post/' + req.params.id)
		.then(response => {
			response ?
				console.log('success', response)
				:
				console.log('no response');
			res.send('deleted');
		})
		.catch(error => {
			console.log('error deleting post', error);
		})
});

// Makes a new post and sends to server
router.post('/create', (req, res, next) => {

	axios.post('http://localhost:8000/post', req.body)
		.then(response => {
			console.log("response: " + response.data);
			res.redirect('/feed');
		})
		.catch(error => {
			console.log('Error creating new post', error.message);
		})

});

module.exports = router;