import { 
    IO_REGTOKEN_SELECTION_LOAD, 
    IO_REGTOKEN_SELECTION_REMOVE,
    IO_REGTOKEN_SELECTION_ADD,
} from './types';


export const action_regTokenSelectionLoad = data => {
    return {
        type: IO_REGTOKEN_SELECTION_LOAD,
        payload: data
    }
};

export const action_regTokenSelectionRemove = data => {
    return {
        type: IO_REGTOKEN_SELECTION_REMOVE,
        payload: data
    }
};

export const action_regTokenSelectionAdd = data => {
    return {
        type: IO_REGTOKEN_SELECTION_ADD,
        payload: data
    }
};