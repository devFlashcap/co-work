const user_socket_deassign = require('./handler.user.socket.deassign');

module.exports.user_logout = async (store, io, socket) => {
    const sockets = store.getSockets(io, socket.id);
    if(sockets !== null && sockets.length > 0){
        for(const s of sockets){
            user_socket_deassign.user_socket_deassign(store, s);
            s.emit('logout', null);
            s.emit('gohome', null);
        }
    }
};