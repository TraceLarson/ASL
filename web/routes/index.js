const express = require('express');
const router = express.Router();
const path = require('path');
const validator = require('express-validator');



// index page
router.get('/', (req, res, next) => {
	res.render(path.join(__dirname, '/../views/index'));
});

module.exports = router;