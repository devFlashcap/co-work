const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schemaUser = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 6
    },
    
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 6
    },

    full_name: {
        type: String,
        required: true,
        trim: true,
        minlength: 6
    },

    level: {
        type: Number,
        required: true
    }
}, 
{
    timestamps: true,
});

module.exports = User = mongoose.model("User", schemaUser);