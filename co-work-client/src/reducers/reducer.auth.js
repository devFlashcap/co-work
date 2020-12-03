import { CURRENT_USER_SET } from '../actions/creators/types';

const isEmpty = require('is-empty');

const initialState = {
    isAuthenticated: false,
    user: {},
};

export default function reducerAuth(state = initialState, action){
    switch(action.type){
        case CURRENT_USER_SET:
            return {
                ...state,
                isAuthenticated: !isEmpty(action.payload),
                user: action.payload
            };
            default:
                return state;
    }
}