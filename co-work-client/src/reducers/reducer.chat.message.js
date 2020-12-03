import { 
    CHAT_MESSAGE_ADD, 
    CHAT_MESSAGES_LOAD
} from '../actions/creators/types';

const initialState = {
    messages: []
};

export default function reducerChatMessage(state = initialState, action){
    switch(action.type){
        case CHAT_MESSAGES_LOAD:
            return {
                ...state,
                messages: action.payload
            };

        case CHAT_MESSAGE_ADD:
            return {
                ...state,
                messages: [...state.messages, action.payload]
            };
            
        default:
            return state;
    }
}