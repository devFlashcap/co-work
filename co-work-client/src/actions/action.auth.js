import {
    action_userLogin,
    action_userLogout,
    action_userSocketAssign,
    action_userSocketDeassign,
    action_userRegister,
    action_userPasswordChange
} from './creators/creator.auth';

export const userLogin = data => dispatch => {
    dispatch(action_userLogin(data));
};

export const userLogout = data => dispatch => {
    dispatch(action_userLogout(data));
};

export const userSocketAssign = data => dispatch => {
    dispatch(action_userSocketAssign(data));
};

export const userSocketDeassign = data => dispatch => {
    dispatch(action_userSocketDeassign(data));
};

export const userRegister = data => dispatch => {
    dispatch(action_userRegister(data));
}

export const userPasswordChange = data => dispatch => {
    dispatch(action_userPasswordChange(data));
}