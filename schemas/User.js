const mongoose = require('mongoose');

let UserSchema = mongoose.Schema({
    email: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    fname: {
        type: String,
        require: true

    },
    lname: {
        type: String,
        require: true

    } 
})

module.exports = UserSchema = mongoose.model('user', UserSchema)