const mongoose = require('mongoose');
const response_code = require('../dm/response.code');
const ModelNotification = require('../../models/model.notification');

module.exports.notification_add = async data => {
    try{
        const notification = await ModelNotification
        .findOne({
            userID: data.userID, 
            type: data.type, 
            reference: mongoose.Types.ObjectId(data.reference)
        });
        
        if(notification){
            notification.count++;
            await notification.save();
            return {
                status: response_code.HTTP_200,
                response: notification
            }
        }
        else{
            const newNotification = new ModelNotification({
                userID: data.userID,
                type: data.type,
                reference: data.reference,
                message: data.message,
                count: 1
            });
            await newNotification.save();
            return {
                status: response_code.HTTP_200,
                response: newNotification
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

module.exports.notification_read_all = async data => {
    try{
        const notifications = await ModelNotification.find({
            userID: data.userID,
            count: { $gt: 0 }
        });
        
        if(notifications){
            return {
                status: response_code.HTTP_200,
                response: notifications
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

module.exports.notification_reset = async data => {
    try{
        const notification = await ModelNotification
        .findOne({
            userID: data.userID, 
            type: data.type,
            reference: mongoose.Types.ObjectId(data.reference)
        });
        
        if(notification){
            notification.count = 0;
            await notification.save();
            return {
                status: response_code.HTTP_200,
                response: notification
            }
        }
        else{
            return {
                status: response_code.HTTP_404,
                response: null
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