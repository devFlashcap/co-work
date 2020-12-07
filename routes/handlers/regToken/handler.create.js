const actions = require('../../../co-work-client/src/actions/creators/types');
const response_code = require('../../dm/response.code');
const dm_regToken = require('../../dm/dm.regToken');
const debug_mode = require('../../../config/keys').DEBUG_MODE;

module.exports.regToken_create = async (socket, data) => {
    const result = await dm_regToken.regToken_create(data);
    debug_mode && socket.emit('debug_response', result);
    if(result.status === response_code.HTTP_200){
        socket.emit('action', {type: actions.REGTOKEN_SELECTION_ADD, payload: result.response});
        socket.emit('goback');
    }
}; 