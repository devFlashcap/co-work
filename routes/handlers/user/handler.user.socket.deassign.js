const actions = require('../../../co-work-client/src/actions/creators/types');

module.exports.user_socket_deassign = async (store, socket) => {
    socket.emit('action', {type: actions.CURRENT_USER_SET, payload: null});
    socket.emit('action', {type: actions.GROUPS_OF_USER_SET, payload: null});
    store.socketDeassign(socket.id);
}