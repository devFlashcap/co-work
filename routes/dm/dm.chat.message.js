const mongoose = require('mongoose');
const response_code = require('../dm/response.code');
const ModelGroup = require('../../models/model.group');

module.exports.chatMessage_create = async data => {
    try{
        const group = await ModelGroup.findById(data.groupID);
        if(group){
            const newMessage = {
                sender: data.sender,
                type: data.type,
                message: data.message
            }
            group.messages.push(newMessage);
            const saveGroup = await group.save();

            const newGroup = await ModelGroup.findById(data.groupID)
                .populate({
                        path: 'messages',
                        populate: { path: 'sender', select: 'full_name' }
                });
            
            if(newGroup){
                return {
                    status: response_code.HTTP_200,
                    response: newGroup.messages[newGroup.messages.length-1]
                }
            }
        }
    }
    catch(err){
        return {
            status: response_code.HTTP_500,
            response: err
        }
    }
};

module.exports.chatMessage_update = async data => {
    try{
        const message = await ModelGroup.findOneAndUpdate({
            _id: data.group,
            'messages._id': data.messageID
        },
        {
            $set:{
                'messages.$.message': data.newMessage
            }
        },
        {
            new: true
        }
        );
        return {
            status: response_code.HTTP_200,
            response: message
        }
    }
    catch(err){
        return {
            status: response_code.HTTP_500,
            response: err
        }
    }
};

module.exports.chatMessage_delete = async data => {
    try{
        const messages = await ModelGroup.findOneAndUpdate(data.group,
        {
            $pull: {
                messages: {
                    _id: data.messageID
                }
            }
        });
        return {
            status: response_code.HTTP_200,
            response: messages
        }
    }
    catch(err){
        return {
            status: response_code.HTTP_500,
            response: err
        }
    }
};