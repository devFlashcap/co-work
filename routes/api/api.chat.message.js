const types = require('../../co-work-client/src/actions/creators/types');
const chat_message_create = require('../handlers/chat_message/handler.create');

module.exports.handle_chat_message = (store, io, socket, action) => {
    switch(action.type){
        case types.IO_CHAT_MESSAGE_SEND:
            chat_message_create.chat_message_create(store, io, socket, action.payload);
            break;
    }
};