const actions = require('../../../co-work-client/src/actions/creators/types');
const dm_user = require('../../dm/dm.user');
const response_code = require('../../dm/response.code');
const debug_mode = require('../../../config/keys').DEBUG_MODE;

module.exports.user_selection_load = async (socket, data) => {
    const users = await dm_user.user_selection_load({userID: data.userID, condition: data.condition});
    debug_mode && socket.emit('debug_response', users);
    if(users.status === response_code.HTTP_200){
        socket.emit('action', {type: actions.USER_SELECTION_LOAD, payload: users.response});
    }
};