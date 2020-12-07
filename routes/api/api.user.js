const types = require('../../co-work-client/src/actions/creators/types');
const user_login = require('../handlers/user/handler.user.login');
const user_logout = require('../handlers/user/handler.user.logout');
const user_socket_assign = require('../handlers/user/handler.user.socket.assign');
const user_socket_deassign = require('../handlers/user/handler.user.socket.deassign');
const user_register = require('../handlers/user/handler.user.register.js');
const user_password_change = require('../handlers/user/handler.user.password.change.js');

module.exports.handle_user = (store, io, socket, action) => {
    switch(action.type){
        case types.IO_USER_LOGIN:
            user_login.user_login(store, socket, action.payload);
            break;
        case types.IO_USER_LOGOUT:
            user_logout.user_logout(store, io, socket);
            break;
        case types.IO_USER_SOCKET_ASSIGN:
            user_socket_assign.user_socket_assign(store, socket, action.payload);
            break;
        case types.IO_USER_SOCKET_DEASSIGN:
            user_socket_deassign.user_socket_deassign(store, socket);
            break;
        case types.IO_USER_REGISTER:
            user_register.user_register(socket, action.payload);
            break;
        case types.IO_USER_PASSWORD_CHANGE:
            user_password_change.user_password_change(socket, action.payload);
    }
};