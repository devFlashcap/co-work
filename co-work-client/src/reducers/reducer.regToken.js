import { 
    REGTOKEN_SET,
} from '../actions/creators/types';

const initialState = {};

export default function reducerRegToken(state = initialState, action){
    switch(action.type){
        case REGTOKEN_SET:
            return action.payload;
        default:
            return state;
    }
}