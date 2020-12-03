import {
    action_userSelectionLoad,
    action_userSelectionModify
} from './creators/creator.user.selection';

export const userSelectionLoad = data => dispatch => {
    dispatch(action_userSelectionLoad(data));
};

export const userSelectionModify = data => dispatch => {
    dispatch(action_userSelectionModify(data));
};