const express = require('express');
const router = express.Router();
const path = require('path');


// load Create page
router.get('/', (req, res, next) => {
    res.render(path.join(__dirname, '/../views/create.njk'));
})


module.exports = router;