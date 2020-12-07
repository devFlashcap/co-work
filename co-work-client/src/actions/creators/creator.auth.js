import { 
    CURRENT_USER_SET,
    IO_USER_LOGIN,
    IO_USER_LOGOUT,
    IO_USER_SOCKET_ASSIGN,
    IO_USER_SOCKET_DEASSIGN,
    IO_USER_REGISTER,
    IO_USER_PASSWORD_CHANGE
} from './types';

export const action_setCurrentUser = user => {
    return {
        type: CURRENT_USER_SET,
        payload: user
    }
};

export const action_userLogin = data => {
    return {
        type: IO_USER_LOGIN,
        payload: data
    }
};

export const action_userLogout = data => {
    return {
        type: IO_USER_LOGOUT,
        payload: data
    }
};

export const action_userSocketAssign = data => {
    return {
        type: IO_USER_SOCKET_ASSIGN,
        payload: data
    }
};

export const action_userSocketDeassign = data => {
    return {
        type: IO_USER_SOCKET_DEASSIGN,
        payload: data
    }
};

export const action_userRegister = data => {
    return {
        type: IO_USER_REGISTER,
        payload: data
    }
};

export const action_userPasswordChange = data => {
    return {
        type: IO_USER_PASSWORD_CHANGE,
        payload: data
    }
};