const dm_chatMessage = require('../../dm/dm.chat.message');
const dm_group = require('../../dm/dm.group');
const dm_notification = require('../../dm/dm.notification');
const response_code = require('../../dm/response.code');
const actions = require('../../../co-work-client/src/actions/creators/types');
const debug_mode = require('../../../config/keys').DEBUG_MODE;

module.exports.chat_message_create = async (store, io, socket, data) => {
    console.log(data);
    const result = await dm_chatMessage.chatMessage_create(data);
    debug_mode && socket.emit('debug_response', result);
    if(result.status === response_code.HTTP_200){
        socket.to('chat#' + data.groupID).emit('action', {type: actions.CHAT_MESSAGE_ADD, payload: result.response});
        socket.emit('action', {type: actions.CHAT_MESSAGE_ADD, payload: result.response});
        
        // send notifications
        const group = await dm_group.group_read({groupID: data.groupID});
        debug_mode && socket.emit('debug_response', group);
        const memberIDs = group.response.members;
        const onlineMembersNotInRoom = store.getOnlineMembersNotInRoom(io, memberIDs, 'chat#' + data.groupID);
        const offlineMembers = store.getOfflineMembers(memberIDs);

        const notification = {
            userID: null,
            type: 'chat',
            reference: data.groupID,
            message: 'New message in group: ' + group.response.name,
        };

        for(const memberID of offlineMembers){
            if(memberID === data.sender) continue;
            notification.userID = memberID;
            const newNotification = await dm_notification.notification_add(notification);
            debug_mode && socket.emit('debug_response', newNotification);
        }

        for(const onlineMember of onlineMembersNotInRoom){
            if(onlineMember.userID === data.sender) continue;
            notification.userID = onlineMember.userID;
            const notificationSaved = await dm_notification.notification_add(notification);
            console.log(notificationSaved);
            debug_mode && socket.emit('debug_response', notificationSaved);
            if(notificationSaved.status === response_code.HTTP_200){
                for(const socketID of onlineMember.socketIDs){
                    socket.to(socketID).emit('action', {type: actions.NOTIFICATION_ADD, payload: notificationSaved.response});
                }
            }
        }
    }
};