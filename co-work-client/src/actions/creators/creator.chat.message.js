import { 
    CHAT_MESSAGE_ADD,
    CHAT_MESSAGES_LOAD,
    IO_CHAT_MESSAGE_SEND
} from './types';

export const action_addChatMessage = message => {
    return {
        type: CHAT_MESSAGE_ADD,
        payload: message
    }
};

export const action_loadChatMessages = messages => {
    return {
        type: CHAT_MESSAGES_LOAD,
        payload: messages
    }
};

export const action_chatMessageSend = data => {
    return {
        type: IO_CHAT_MESSAGE_SEND,
        payload: data
    }
};