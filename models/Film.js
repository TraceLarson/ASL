var mongoose = require('mongoose');


var filmSchema = new mongoose.Schema({
    // set Film document structure
    // id: mongoose.Schema.Types.ObjectId,
    name: {type:String, unique: true},
    releaseDate: Date,
    studio: String,
    rating: { type: String, enum: [
            'G',
            'PG',
            'PG13',
            'R',
            'NR',
        ] },
    length: String ,
    people: [{type: mongoose.Schema.Types.ObjectId, ref: 'People'}],
    created_at: { type: Date, default: Date.now},
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

module.exports = mongoose.model('Film', filmSchema, 'films');