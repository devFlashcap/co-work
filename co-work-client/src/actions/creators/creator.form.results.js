import { FORM_RESULTS_SET } from './types';

export const action_setFormResults = formResults => {
    return {
        type: FORM_RESULTS_SET,
        payload: formResults
    }
};