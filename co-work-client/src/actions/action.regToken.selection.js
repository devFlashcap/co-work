import {
    action_regTokenSelectionLoad,
    action_regTokenSelectionRemove,
    action_regTokenSelectionAdd
} from './creators/creator.regToken.selection';

export const regTokenSelectionLoad = data => dispatch => {
    dispatch(action_regTokenSelectionLoad(data));
};

export const regTokenSelectionRemove = data => dispatch => {
    dispatch(action_regTokenSelectionRemove(data));
};

export const regTokenSelectionAdd = data => dispatch => {
    dispatch(action_regTokenSelectionAdd(data));
};