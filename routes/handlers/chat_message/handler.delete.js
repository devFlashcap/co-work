const dm_chatMessage = require('../../../dm/dm.chat.message');
const debug_mode = require('../../../config/keys').DEBUG_MODE;

module.exports.delete = async (store, io, socket, data) => {
    const result = await dm_chatMessage.chatMessage_delete(data);
    debug_mode && socket.emit('debug_response', result);
};