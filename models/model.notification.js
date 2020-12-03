const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schemaNotification = new Schema({
    
    userID: {
        type: mongoose.ObjectId,
        ref: 'User',
        required: true
    },
    
    type: {
        type: String,
        required: true,
        trim: true
    },

    reference: {
        type: mongoose.ObjectId,
        required: true,
    },

    message: {
        type: String,
        required: true,
        trim: true
    },

    count: {
        type: Number,
        required: true
    }
}, 
{
    timestamps: true,
});

module.exports = Notification = mongoose.model("Notification", schemaNotification);