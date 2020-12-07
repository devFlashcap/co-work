import {
    action_groupJoin,
    action_groupLeave,
    action_groupCreate,
    action_groupModify,
    action_groupRemove,
    action_groupMembersAdd,
    action_groupMembersRemove
} from './creators/creator.group';

export const groupJoin = data => dispatch => {
    dispatch(action_groupJoin(data));
};

export const groupLeave = data => dispatch => {
    dispatch(action_groupLeave(data));
};

export const groupCreate = data => dispatch => {
    dispatch(action_groupCreate(data));
}

export const groupModify = data => dispatch => {
    dispatch(action_groupModify(data));
}

export const groupRemove = data => dispatch => {
    dispatch(action_groupRemove(data));
}

export const groupMembersAdd = data => dispatch => {
    dispatch(action_groupMembersAdd(data));
}

export const groupMembersRemove = data => dispatch => {
    dispatch(action_groupMembersRemove(data));
}