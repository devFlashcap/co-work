const actions = require('../../../co-work-client/src/actions/creators/types');
const response_code = require('../../dm/response.code');
const dm_group = require('../../dm/dm.group');
const dm_notification = require('../../dm/dm.notification');
const debug_mode = require('../../../config/keys').DEBUG_MODE;

module.exports.group_join = async (store, socket, data) => {
    if(data.type === "chat"){
        const result = await dm_group.group_loadMessages({_id: data.groupID});
        debug_mode && socket.emit('debug_response', result);
        if(result.status !== response_code.HTTP_500){
            const group = await dm_group.group_read({groupID: data.groupID});
            debug_mode && socket.emit('debug_response', group);
            if(group.status !== response_code.HTTP_500){
                socket.emit('action', {type: actions.CURRENT_GROUP_SET, payload: group.response});
            }
            socket.emit('action', {type: actions.CHAT_MESSAGES_LOAD, payload: result.response});
            const room = data.type + "#" + data.groupID;
            const userID = store.getUserID(socket.id);
            if(userID !== -1){
                const notification = await dm_notification.notification_reset({
                    userID: userID,
                    type: data.type,
                    reference: data.groupID
                });
                debug_mode && socket.emit('debug_response', notification);
                if(notification.status === response_code.HTTP_200){
                    socket.emit('action', {type: actions.NOTIFICATION_REMOVE, payload: notification.response._id});
                }
            }
            socket.join(room);
        }
    }
}; 