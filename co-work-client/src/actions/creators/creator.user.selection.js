import { 
    IO_USER_SELECTION_LOAD, 
    IO_USER_SELECTION_MODIFY
} from './types';


export const action_userSelectionLoad = data => {
    return {
        type: IO_USER_SELECTION_LOAD,
        payload: data
    }
};

export const action_userSelectionModify = data => {
    return {
        type: IO_USER_SELECTION_MODIFY,
        payload: data
    }
};