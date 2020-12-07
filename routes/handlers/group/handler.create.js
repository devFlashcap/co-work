const actions = require('../../../co-work-client/src/actions/creators/types');
const dm_group = require('../../dm/dm.group');
const dm_notification = require('../../dm/dm.notification');
const response_code = require('../../dm/response.code');
const debug_mode = require('../../../config/keys').DEBUG_MODE;
const validateGroupCreate = require('../../../validation/validator.group.create');

module.exports.group_create = async (store, io, socket, data) => {
    const { errors, isValid } = validateGroupCreate(data);
    if(!isValid){
        socket.emit('action', {type: actions.FORM_RESULTS_SET, payload: {results: errors, success: false}});
    }
    else{
        const group = await dm_group.group_create({
            name: data.name,
            leader: data.leader,
            avatar_color: data.avatar_color,
            avatar_bgcolor: data.avatar_bgcolor,
            members: data.members
        });
        debug_mode && socket.emit('debug_response', group);
        if(group.status === response_code.HTTP_400){
            socket.emit('action', {type: actions.FORM_RESULTS_SET, payload: {results: group.response, success: false}});
        }
        else if(group.status === response_code.HTTP_200){
            const memberIDs = group.response.members;
            const onlineMembersNotInRoom = store.getOnlineMembersNotInRoom(io, memberIDs, 'chat#' + data.groupID);
            const offlineMembers = store.getOfflineMembers(memberIDs);

            const notification = {
                userID: null,
                type: 'groupadd',
                reference: group._id,
                message: 'You have been added to the group: ' + group.response.name,
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
                debug_mode && socket.emit('debug_response', notificationSaved);
                if(notificationSaved.status === response_code.HTTP_200){
                    for(const socketID of onlineMember.socketIDs){
                        socket.to(socketID).emit('action', {type: actions.NOTIFICATION_ADD, payload: notificationSaved.response});
                        socket.to(socketID).emit('action', {type: actions.GROUP_ADD, payload: group.response});
                    }
                }
            }

            const sockets = store.getSockets(io, socket.id);
            if(sockets){
                for(const socket of sockets){
                    socket.emit('action', {type: actions.GROUP_ADD, payload: group.response});
                }
            }
            
            socket.emit('action', {type: actions.FORM_RESULTS_SET, payload: {results: "Group creation successful", success: true}});
            socket.emit('goback', null);
        }
    }
};