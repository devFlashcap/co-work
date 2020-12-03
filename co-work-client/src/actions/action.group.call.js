import {
    action_callJoin,
    action_callLeave
} from './creators/creator.group.call';

export const callJoin = data => dispatch => {
    console.log('action');
    dispatch(action_callJoin(data));
};

export const callLeave = data => dispatch => {
    dispatch(action_callLeave(data));
};