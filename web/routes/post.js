const express = require('express');
const router = express.Router();
const path = require('path');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');


router.get('/', (req, res, next) => {
	res.render(path.join(__dirname, '/../views/post/createPost'), {
		page_name: 'post'
	});
});

router.get('/:id', (req, res, next) => {
	res.redirect('/feed');
});

module.exports = router;