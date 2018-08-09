const mongoose = require('mongoose');


var petSchema = mongoose.Schema({

    name: String,

    // set the type to string and allow it to only be "Dog" or "Cat"
    type: { type: String, enum: ['Dog', 'Cat'] },

    // the id of the user who owns this pet
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
})

module.exports = mongoose.model('Pet', petSchema);