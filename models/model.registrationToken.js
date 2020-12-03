const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schemaRegistrationToken = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 6
    },

    expiresAt: {
        type: Date,
        required: true,
    },

    isValid: {
        type: Boolean,
        required: true
    }
}, 
{
    timestamps: true,
});

module.exports = RegToken = mongoose.model("RegistrationToken", schemaRegistrationToken);