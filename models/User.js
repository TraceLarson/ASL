var mongoose = require('mongoose');


var userSchema = mongoose.Schema({

    // set the name of a property and the datatype
    name: String,

    // set the datatype, requirement, and force each record to have a unique username
    username: { type: String, required: false, unique: true },

    // set the type, requirement and custom error message if password is missing
    password: { type: String, required: [false, 'you must have a password'] },

    // set the default if no value is provided to "false"
    admin: { type: Boolean, default: false },

    // an array of pet ids
    pets: [{type: mongoose.Schema.Types.ObjectId, ref: 'Pet'}],

    // nest properties inside the meta object
    meta: {
        dob: Date,
        website: String,
        location: {type: String, default: 'us'}
    },

    created_at: Date,
    updated_at: Date

});


userSchema.methods.getAge = function() {

    // if the user doesn't have a dob return undefined
    if (!this.meta.dob){
        return undefined;
    }

    // get today's date
    var today = new Date();

    // get the age they will be this year
    var age = today.getFullYear() - this.meta.dob.getFullYear();

    // if m is greater than 0 their birth month has already passed
    var m = today.getMonth() - this.meta.dob.getMonth();

    // if their birth month is less than 0 they haven't had their birthday yet this year
    // if their birth month is this month, check to see if their birth day is in the future
    if(m < 0 || (m === 0 & today.getDate() < this.meta.dob.getDate())){

        // if their birthday is still in the future remove on from their age
        age--;
    }
    return age;

}


userSchema.pre('save', function(next){

    var currentDate = new Date();

    // set the updated date to right now
    this.updated_at = currentDate;

    // if their is no created date set it to now
    if(!this.created_at){
        this.created_at = currentDate;
    }

    //save the model to the datebase
    next();
})




module.exports = mongoose.model('User', userSchema);