import { 
    REGTOKEN_SELECTION_LOAD,
    REGTOKEN_SELECTION_ADD,
    REGTOKEN_SELECTION_REMOVE
} from '../actions/creators/types';

const initialState = {
    tokens: []
};

export default function reducerRegTokenSelection(state = initialState, action){
    switch(action.type){
        case REGTOKEN_SELECTION_LOAD:
            return {
                ...state,
                tokens: action.payload
            };

        case REGTOKEN_SELECTION_ADD:
            return {
                ...state,
                tokens: [...state.tokens, action.payload]
            };
        
        case REGTOKEN_SELECTION_REMOVE:
            const regTokenIndex = state.tokens.findIndex(t => t._id === action.payload.tokenID);
            if(regTokenIndex >= 0){
                return {
                    ...state,
                    tokens: [...state.tokens.slice(0, regTokenIndex), ...state.tokens.slice(regTokenIndex+1)]
                };
            }
            return state;
            
        default:
            return state;
    }
}