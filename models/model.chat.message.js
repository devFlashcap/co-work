const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schemaChatMessage = new Schema({
    sender: {
        type: mongoose.ObjectId,
        ref: 'User'
    },

    type: {
        type: String,
        required: true,
        trim: true
    },

    message: {
        type: String,
        trim: true
    }
}, 
{
    timestamps: true,
});

module.exports = {
    schemaChatMessage,
    ModelChatMessage: mongoose.model("ChatMessage", schemaChatMessage)
};