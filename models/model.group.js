const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schemaChatMessage = require('./model.chat.message').schemaChatMessage;
const colorValidator = color => (/^#([0-9a-f]{3}){1,2}$/i).test(color)

const schemaGroup = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },

    leader: {
        type: mongoose.ObjectId,
        ref: 'User'
    },

    avatar_bgcolor: {
        type: String,
        validator: [colorValidator, 'Invalid color'],
        required: true
    },

    avatar_color: {
        type: String,
        validator: [colorValidator, 'Invalid color'],
        required: true
    },

    members: [{
        type: mongoose.ObjectId,
        ref: 'User'
    }],

    messages: [schemaChatMessage]
}, 
{
    timestamps: true,
});

module.exports = Group = mongoose.model("Group", schemaGroup);