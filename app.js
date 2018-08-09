const express = require('express');
const app = express();
const mongoose = require('mongoose');

// EXAMPLE STRING: mongodb://username:password@hostname:port/database
mongoose.connect('mongodb://' + process.env.MONGO_HOST + '/' + process.env.MONGO_DATABASE);

// Get the default connection
var db = mongoose.connection;

// Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error'));

// Bind connection to connection event (to get notification of connection)
db.once('open', () => console.log('DATABASE CONNECTED SUCCESSFULLY'));


// Routes
const index = require('./routes/index');
app.use('/', index);

module.exports = app;