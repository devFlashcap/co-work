import { 
    USER_SELECTION_LOAD,
    USER_SELECTION_RESET,
    USER_SELECTION_MODIFY
} from '../actions/creators/types';

const initialState = {
    users: []
};

export default function reducerUserSelection(state = initialState, action){
    switch(action.type){
        case USER_SELECTION_LOAD:
            return {
                ...state,
                users: action.payload
            };
        
        case USER_SELECTION_MODIFY:
            const userSelectionIndex = state.users.findIndex(u => u._id === action.payload._id);
            if(userSelectionIndex >= 0){
                return {
                    ...state,
                    users: [...state.users.slice(0, userSelectionIndex), action.payload, ...state.users.slice(userSelectionIndex+1)]
                }
            }
            return state;

        case USER_SELECTION_RESET:
            return {
                ...state,
                users: []
            };
            
        default:
            return state;
    }
}