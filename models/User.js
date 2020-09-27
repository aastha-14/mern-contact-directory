const mongoose = require("mongoose")
const { Schema } = mongoose


module.exports = User = mongoose.model('user', new Schema({
    name: {
        type: String,
        minlength: 3,
        maxlength: 50,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255
    },
    date: {
        type: Date,
        default: Date.now
    }
}))