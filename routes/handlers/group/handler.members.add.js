const actions = require('../../../co-work-client/src/actions/creators/types');
const dm_group = require('../../dm/dm.group');
const dm_notification = require('../../dm/dm.notification');
const response_code = require('../../dm/response.code');
const debug_mode = require('../../../config/keys').DEBUG_MODE;

module.exports.group_members_add = async (store, io, socket, data) => {
    const group = await dm_group.group_members_add({
        groupID: data.groupID,
        memberIDs: data.memberIDs
    });
    debug_mode && socket.emit('debug_response', group);
    if(group.status === response_code.HTTP_200){
        socket.to('chat#' + data.groupID).emit('action', {type: actions.GROUP_MODIFY, payload: group.response});
        socket.to('chat#' + data.groupID).emit('action', {type: actions.CURRENT_GROUP_SET, payload: group.response});
        socket.emit('action', {type: actions.GROUP_MODIFY, payload: group.response});
        socket.emit('action', {type: actions.CURRENT_GROUP_SET, payload: group.response});

        const notification = {
            userID: null,
            type: 'groupadd',
            reference: data.groupID,
            message: 'You have been added to the group: ' + group.response.name,
        };

        for(const memberID of data.memberIDs){
            notification.userID = memberID;
            const newNotification = await dm_notification.notification_add(notification);
            debug_mode && socket.emit('debug_response', newNotification);

            const socketIDs = store.getSocketIDsOfUser(memberID);
            if(socketIDs !== null){
                for(const socketID of socketIDs){
                    socket.to(socketID).emit('action', {type: actions.NOTIFICATION_ADD, payload: newNotification.response});
                }
            }
        }
    }
};