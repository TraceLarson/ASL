const express = require('express');
const router  = express.Router();
const path    = require('path');


// load Welcome page
router.get('/', (req, res, next) => {
    res.render(path.join(__dirname, '/../views/welcome'),{
        page_name : 'Home'
    });
})


module.exports = router;