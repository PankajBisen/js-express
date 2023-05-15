const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Please enter the name']
    },
    email: {
        type: String,
        required: [true, 'Please enter the email adderess'],
        unique: [true, 'Email address already taken']
    },
    password: {
        type: String,
        required: [true, 'Please add the user password']
    }
}, {
    timestamps: true
});

module.exports = mongoose.model("User",userSchema);