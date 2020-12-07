const actions = require('../../../co-work-client/src/actions/creators/types');
const dm_group = require('../../dm/dm.group');
const dm_notification = require('../../dm/dm.notification');
const response_code = require('../../dm/response.code');
const debug_mode = require('../../../config/keys').DEBUG_MODE;
const admin_level = require('./user.levels').LEVEL_ADMIN;

module.exports.user_socket_assign = async (store, socket, user) => {
    socket.emit('action', {type: actions.CURRENT_USER_SET, payload: user});
    const groups =  user.level < admin_level ? await dm_group.group_read_for_user({userID: user.id}) : await dm_group.group_read_all();
    debug_mode && socket.emit('debug_response', groups);
    if(groups.status === response_code.HTTP_200){
        socket.emit('action', {type: actions.GROUPS_OF_USER_SET, payload: groups.response});
        for(const group of groups.response){
            const groupID = group._id;
            if(store.callInProgress(groupID)){
                socket.emit('action', {type: actions.CALL_IN_PROGRESS_ADD, payload: groupID});
            }
        }
    }
    const notifications = await dm_notification.notification_read_all({userID: user.id});
    debug_mode && socket.emit('debug_response', notifications);
    if(notifications.status === response_code.HTTP_200){
        socket.emit('action', {type: actions.NOTIFICATIONS_LOAD, payload: notifications.response});
    }
    store.socketAssign(user.id, socket.id);
}