const express = require('express');
const app = express();
const mongoose = require('mongoose');

// Connect to mongodb database
mongoose.connect('mongodb://' + process.env.MONGO_HOST + '/' + process.env.MONGO_DATABASE);

// Get the default connection
var db = mongoose.connection;

// Bind connection to error event
db.on('error', console.error.bind(console,'MongoDB connection error'));

// Bind connection to connection event
db.once('open', ()=> console.log('DATABASE CONNECTED SUCCESSFULLY'));

module.exports = app;