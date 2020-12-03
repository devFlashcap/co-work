const actions = require('../../../co-work-client/src/actions/creators/types');
const dm_regToken = require('../../dm/dm.regToken');
const response_code = require('../../dm/response.code');
const debug_mode = require('../../../config/keys').DEBUG_MODE;

module.exports.regToken_selection_load = async socket => {
    const regTokens = await dm_regToken.regToken_selection_load();
    debug_mode && socket.emit('debug_response', regTokens);
    if(regTokens.status === response_code.HTTP_200){
        socket.emit('action', {type: actions.REGTOKEN_SELECTION_LOAD, payload: regTokens.response});
    }
};