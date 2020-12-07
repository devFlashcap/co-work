import { 
    NOTIFICATION_ADD,
    NOTIFICATIONS_LOAD,
    NOTIFICATION_REMOVE
} from '../actions/creators/types';

const initialState = {
    notifications: []
};

export default function reducerNotification(state = initialState, action){
    switch(action.type){

        case NOTIFICATIONS_LOAD:
            return {
                ...state,
                notifications: action.payload
            };

        case NOTIFICATION_ADD:
            const indexToAdd = state.notifications.findIndex(n => n._id === action.payload._id);
            if(indexToAdd >= 0){
                const notification = state.notifications[indexToAdd];
                notification.count++;
                return {
                    ...state,
                    notifications: [...state.notifications.slice(0, indexToAdd), notification, ...state.notifications.slice(indexToAdd+1)]
                }
            }
            else{
                return {
                    ...state,
                    notifications: [...state.notifications, action.payload]
                };
            }
        
        case NOTIFICATION_REMOVE:
            const indexToRemove = state.notifications.findIndex(n => n._id === action.payload);
            if(indexToRemove >= 0){
                return {
                    ...state,
                    notifications: [...state.notifications.slice(0, indexToRemove), ...state.notifications.slice(indexToRemove+1)]
                }
            }
            return state;
            
        default:
            return state;
    }
}