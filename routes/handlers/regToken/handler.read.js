const actions = require('../../../co-work-client/src/actions/creators/types');
const response_code = require('../../dm/response.code');
const dm_regToken = require('../../dm/dm.regToken');
const debug_mode = require('../../../config/keys').DEBUG_MODE;

module.exports.regToken_read = async (socket, data) => {
    const result = await dm_regToken.regToken_read({tokenID: data.tokenID});
    debug_mode && socket.emit('debug_response', result); 
    if(result.status === response_code.HTTP_200){
        socket.emit('action', {type: actions.REGTOKEN_SET, payload: result.response});
    }
    else{
        socket.emit('gohome');
    }
}; 