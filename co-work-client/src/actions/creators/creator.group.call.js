import { 
    IO_CALL_JOIN,
    IO_CALL_LEAVE
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