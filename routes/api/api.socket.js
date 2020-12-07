const handler_user = require('./api.user');
const handler_group = require('./api.group');
const handler_chat_message = require('./api.chat.message');
const handler_regToken = require('./api.regToken');
const handler_user_selection = require('./api.user.selection');
const handler_regToken_selection = require('./api.regToken.selection');
const handler_call = require('./api.call');
const handler_disconnect = require('../handlers/disconnect');

module.exports.handle_io = async (io, store) => {
    io.on('connection', socket => {    
        console.log("Socket connected: " + socket.id);
        socket.on('action', action => {
            handler_user.handle_user(store, io, socket, action);
            handler_group.handle_group(store, io, socket, action);
            handler_chat_message.handle_chat_message(store, io, socket, action);
            handler_regToken.handle_regToken(socket, action);
            handler_user_selection.handle_user_selection(store, socket, action);
            handler_regToken_selection.handle_regToken_selection(store, socket, action);
            handler_call.handle_call(store, io, socket, action);
        });

        socket.on('signal', msg => {
            const receiverId = msg.to
            const receiver = io.sockets.connected[receiverId]
            if (receiver) {
              const data = {
                from: socket.id,
                ...msg
              }
              io.to(receiverId).emit('signal', data);
            }
          });

        socket.on('disconnect', () => {
            handler_disconnect.handle_disconnect(store, socket.id);
        });
    }); 
};