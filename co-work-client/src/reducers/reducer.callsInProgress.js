import { 
    CALL_IN_PROGRESS_ADD,
    CALL_IN_PROGRESS_REMOVE
} from '../actions/creators/types';

const initialState = [];

export default function reducerGroup(state = initialState, action){
    switch(action.type){
        case CALL_IN_PROGRESS_ADD:
            if(!state.includes(action.payload)){
                return [...state, action.payload]
            }
            return state;
        
        case CALL_IN_PROGRESS_REMOVE:
            const callInProgressIndex = state.findIndex(c => c === action.payload);
            if(callInProgressIndex >= 0){
                return [...state.slice(0, callInProgressIndex), ...state.slice(callInProgressIndex+1)];
            }
            return state;
            
        default:
            return state;
    }
}