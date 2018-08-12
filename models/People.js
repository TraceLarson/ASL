var mongoose = require('mongoose');
var userSchema = mongoose.Schema({

    // set People document structure
    name: {type: String, required: true, unique: true},
    character: {type: String, required: true, unique: true},
    role: {type: String, required: true, unique: true},
    meta: {
        dob: Date,
        location: {type: String, default: 'us'}
    },
    created_at: Date,
    updated_at: Date
});


module.export = mongoose.model('People', userSchema);