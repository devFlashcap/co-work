const actions = require('../../../co-work-client/src/actions/creators/types');

module.exports.group_leave = (socket, data) => {
    socket.emit('action', {type: actions.CURRENT_GROUP_SET, payload: null});
    socket.emit('action', {type: actions.CHAT_MESSAGES_LOAD, payload: null});
    const room = data.type + "#" + data.groupID;
    socket.leave(room);
};