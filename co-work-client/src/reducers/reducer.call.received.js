import { 
    CALL_RECEIVED_SET
} from '../actions/creators/types';

const initialState = null;

export default function reducerCallReceived(state = initialState, action){
    switch(action.type){
        case CALL_RECEIVED_SET:
            return action.payload
            
        default:
            return state;
    }
}