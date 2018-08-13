var mongoose = require('mongoose');


var peopleSchema = new mongoose.Schema({
    // set People document structure
    name: String,
    character: String,
    role: {type: String, enum: [
            'Cast',
            'Director',
            'Writer',
            'Producer',
            'Other',
        ]},
    // The film the person belongs to
    film: {type: mongoose.Schema.Types.ObjectId, ref: 'Film'} ,
    // meta: {
    //     dob: Date,
    //     location: {type: String, default: 'us'}
    // },
    created_at: Date,
    updated_at: Date
});


peopleSchema.pre('save' , function(next) {

    // Get current date
    var currentDate = new Date();

    //Set the updated date to right now
    this.updated_at = currentDate;

    // If there is no created date set it to now
    if (!this.created_at) {
        this.created_at = currentDate;
    }

    // save the model to the database
    next();
})


module.exports = mongoose.model('People', peopleSchema);