const actions = require('../../../co-work-client/src/actions/creators/types');
const dm_user = require('../../dm/dm.user');
const dm_notification = require('../../dm/dm.notification');
const response_code = require('../../dm/response.code');
const debug_mode = require('../../../config/keys').DEBUG_MODE;

module.exports.user_selection_modify = async (store, socket, data) => {
    const user = await dm_user.user_modify({
        userID: data.userID,
        email: data.email,
        full_name: data.full_name,
        level: data.level
    });
    debug_mode && socket.emit('debug_response', user);
    if(user.status === response_code.HTTP_200){
        socket.broadcast.emit('action', {type: actions.USER_SELECTION_MODIFY, payload: user.response});
        const notification = {
            userID: data.userID,
            type: 'profile',
            reference: data.userID,
            message: 'Modifications has been made to your profile: ' + data.userID,
        };
        const newNotification = await dm_notification.notification_add(notification);
        debug_mode && socket.emit('debug_response', newNotification);
        if(newNotification.status === response_code.HTTP_200){
            const socketIDsOfUser = store.getSocketIDsOfUser(data.userID);
            if(socketIDsOfUser !== null){
                for(const socketID of socketIDsOfUser){
                    socket.to(socketID).emit('action', {type: actions.NOTIFICATION_ADD, payload: newNotification.response});
                }
            }
        }
        socket.emit('goback', null);
    }
};