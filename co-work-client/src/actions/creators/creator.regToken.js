import { 
    IO_REGTOKEN_READ,
    IO_REGTOKEN_CREATE,
    IO_REGTOKEN_REMOVE,
    REGTOKEN_SET 
} from './types';

export const action_regTokenRead = data => {
    return {
        type: IO_REGTOKEN_READ,
        payload: data
    }
};

export const action_regTokenCreate = data => {
    return {
        type: IO_REGTOKEN_CREATE,
        payload: data
    }
};

export const action_regTokenRemove = data => {
    return {
        type: IO_REGTOKEN_REMOVE,
        payload: data
    }
};

export const setRegToken = data => {
    return {
        type: REGTOKEN_SET,
        payload: data
    }
}