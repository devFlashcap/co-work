import { FORM_RESULTS_SET } from '../actions/creators/types';

const initialState = {}

export default function reducerFormResults(state = initialState, action){
    switch(action.type){
        case FORM_RESULTS_SET:
            return action.payload;
        default:
            return state;
    }
}