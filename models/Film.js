var mongoose = require('mongoose');


var filmSchema = mongoose.Schema({

    // set Film document structure
    name: { type: String, required: true },
    // releaseDate: { type: Date, required: false },
    // studio: { type: String, required: false, unique: false },
    rating: { type: String, enum: [
            'G',
            'PG',
            'PG13',
            'R',
            'NR',
        ] },
    // length: { type: String },
    // Array of people in the film
    people: [{type: mongoose.Schema.Types.ObjectId, ref: 'People'}],
    meta: {

    },
    created_at: Date,
    updated_at: Date
});

filmSchema.pre('save', function(next) {

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

module.exports = mongoose.model('Film', filmSchema);