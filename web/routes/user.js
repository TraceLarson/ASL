const express = require('express');
const router = express.Router();
const path = require('path');
const expressValidator = require('express-validator');


router.get('/', (req, res, next) => {
	res.render(path.join(__dirname, '/../views/user/createUser'), {
		page_name: 'createUser'
	});
});

module.exports = router;