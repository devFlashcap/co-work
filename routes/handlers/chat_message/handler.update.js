const dm_chatMessage = require('../../../dm/dm.chat.message');

module.exports.update = async (store, io, socket, data) => {
    const result = await dm_chatMessage.chatMessage_update(data);
    debug_mode && socket.emit('debug_response', result);
};