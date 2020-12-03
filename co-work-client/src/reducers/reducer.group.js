import { 
    GROUPS_OF_USER_SET, 
    CURRENT_GROUP_SET,
    GROUP_ADD,
    GROUP_MODIFY,
    GROUP_REMOVE
} from '../actions/creators/types';

const initialState = {
    groups: [],
    currentGroup: {}
};

export default function reducerGroup(state = initialState, action){
    switch(action.type){
        case GROUPS_OF_USER_SET:
            return {
                ...state,
                groups: action.payload
            };
        
        case CURRENT_GROUP_SET:
            return {
                ...state,
                currentGroup: action.payload
            };
        
        case GROUP_ADD:
            return {
                ...state,
                groups: [...state.groups, action.payload]
            };
        
        case GROUP_MODIFY:
            console.log(action.payload);
            const groupIndex = state.groups.findIndex(g => g._id === action.payload._id);
            return {
                ...state,
                groups: [...state.groups.slice(0, groupIndex), action.payload, ...state.groups.slice(groupIndex+1)]
            }
        
        case GROUP_REMOVE:
            const groupRemoveIndex = state.groups.findIndex(g => g._id === action.payload);
            if(groupRemoveIndex >= 0){
                return {
                    ...state,
                    groups: [...state.groups.slice(0, groupRemoveIndex), ...state.groups.slice(groupRemoveIndex+1)]
                };
            }
            return state;
            
        default:
            return state;
    }
}