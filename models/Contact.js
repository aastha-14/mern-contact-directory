const mongoose = require("mongoose");
const { Schema } = mongoose;


module.exports = Contact = mongoose.model('contact', new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },
    name: {
        type: String,
        maxlength: 50,
        required: true
    },
    email: {
        type: String,
        required: true,
    },
    phone: {
        type: String
    },
    type: {
        type: String,
        default: 'personal'
    },
    date: {
        type: Date,
        default: Date.now
    }
}));