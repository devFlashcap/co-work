const user_socket_deassign = require('./handler.user.socket.deassign');

module.exports.user_logout = async (store, socket) => {
    user_socket_deassign.user_socket_deassign(store, socket);
};