import { combineReducers } from 'redux';

import reducerAuth from './reducer.auth';
import reducerFormResults from './reducer.form.results';
import reducerRegToken from './reducer.regToken';
import reducerRegTokenSelection from './reducer.regToken.selection';
import reducerGroup from './reducer.group';
import reducerChatMessage from './reducer.chat.message';
import reducerNotification from './reducer.notification';
import reducerUserSelection from './reducer.user.selection';
import reducerCallsInProgress from './reducer.callsInProgress';
import reducerCallReceived from './reducer.call.received';

export default combineReducers({
    auth: reducerAuth,
    regToken: reducerRegToken,
    regTokenSelection: reducerRegTokenSelection,
    formResults: reducerFormResults,
    groups: reducerGroup,
    messages: reducerChatMessage,
    notifications: reducerNotification,
    userSelection: reducerUserSelection,
    callsInProgress: reducerCallsInProgress,
    callReceived: reducerCallReceived
});