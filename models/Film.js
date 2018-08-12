var mongoose = require('mongoose');
var userSchema = mongoose.Schema({

    // set Film document structure
    name: {type: String, required: true, unique: true},
    releaseDate: {type: Date, required: false, unique: false},
    studio: {type: String, required: false, unique: false},
    rating: {type: String, required: false, unique: false},
    length: {type: String, required: false, unique: false},
    meta: {

    },
    created_at: Date,
    updated_at: Date
});


module.export = mongoose.model('Film', userSchema);