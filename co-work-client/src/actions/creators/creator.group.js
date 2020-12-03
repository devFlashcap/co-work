import { 
    GROUPS_OF_USER_SET,
    CURRENT_GROUP_SET,
    IO_GROUP_JOIN,
    IO_GROUP_LEAVE,
    IO_GROUP_CREATE,
    IO_GROUP_MODIFY,
    IO_GROUP_REMOVE
} from './types';

export const action_setGroupsOfUser = groups => {
    return {
        type: GROUPS_OF_USER_SET,
        payload: groups
    }
};

export const action_setCurrentGroup = group => {
    return {
        type: CURRENT_GROUP_SET,
        payload: group
    }
};

export const action_groupJoin = data => {
    return {
        type: IO_GROUP_JOIN,
        payload: data
    }
};

export const action_groupLeave = data => {
    return {
        type: IO_GROUP_LEAVE,
        payload: data
    }
};

export const action_groupCreate = data => {
    return {
        type: IO_GROUP_CREATE,
        payload: data
    }
}

export const action_groupModify = data => {
    return {
        type: IO_GROUP_MODIFY,
        payload: data
    }
}

export const action_groupRemove = data => {
    return {
        type: IO_GROUP_REMOVE,
        payload: data
    }
}