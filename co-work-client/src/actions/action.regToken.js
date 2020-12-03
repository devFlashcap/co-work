import {
    action_regTokenRead,
    action_regTokenCreate,
    action_regTokenRemove
} from './creators/creator.regToken';

export const regTokenRead = data => dispatch => {
    dispatch(action_regTokenRead(data));
};

export const regTokenCreate = data => dispatch => {
    dispatch(action_regTokenCreate(data));
};

export const regTokenRemove = data => dispatch => {
    dispatch(action_regTokenRemove(data));
};