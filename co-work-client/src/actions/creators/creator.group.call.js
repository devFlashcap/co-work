import { 
    IO_CALL_JOIN,
    IO_CALL_LEAVE,
    IO_CALL_RECEIVED_SET
} from './types';

export const action_callJoin = data => {
    return {
        type: IO_CALL_JOIN,
        payload: data
    }
};

export const action_callLeave = data => {
    return {
        type: IO_CALL_LEAVE,
        payload: data
    }
};

export const action_callReceivedSet = data => {
    return {
        type: IO_CALL_RECEIVED_SET,
        payload: data
    }
};