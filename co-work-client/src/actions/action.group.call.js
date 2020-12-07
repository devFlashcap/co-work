import {
    action_callJoin,
    action_callLeave,
    action_callReceivedSet
} from './creators/creator.group.call';

export const callJoin = data => dispatch => {
    dispatch(action_callJoin(data));
};

export const callLeave = data => dispatch => {
    dispatch(action_callLeave(data));
};

export const callReceivedSet = data => dispatch => {
    dispatch(action_callReceivedSet(data));
};