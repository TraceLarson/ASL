const express = require('express');
const router = express.Router()
const User = require('../models/User');

router.get('/', (req, res, next) => {
  res.send({})
});

module.exports = router;