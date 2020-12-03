import {
    action_chatMessageSend,
} from './creators/creator.chat.message';

export const chatMessageSend = data => dispatch => {
    dispatch(action_chatMessageSend(data));
};