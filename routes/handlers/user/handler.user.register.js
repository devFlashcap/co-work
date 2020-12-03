const actions = require('../../../co-work-client/src/actions/creators/types');
const dm_user = require('../../dm/dm.user')
const dm_regToken = require('../../dm/dm.regToken');
const response_code = require('../../dm/response.code');
const signToken = require('../../../utils/signToken');
const user_socket_assign = require('./handler.user.socket.assign');
const debug_mode = require('../../../config/keys').DEBUG_MODE;
const validateRegister = require('../../../validation/validator.register');

module.exports.user_register = async (socket, data) => {
    const { errors, isValid } = validateRegister(data);
    if(!isValid){
        socket.emit('action', {type: actions.FORM_RESULTS_SET, payload: {results: errors, success: false}});
    }
    else{
        const user = await dm_user.user_create({
            email: data.email, 
            password: data.password,
            full_name: data.full_name
        });
        debug_mode && socket.emit('debug_response', user);
        if(user.status === response_code.HTTP_200){
            await dm_regToken.regToken_makeInvalid({tokenID: data.tokenID});
            socket.emit('action', {type: actions.FORM_RESULTS_SET, payload: {results: errors, success: false}});
            socket.emit('gohome', null);
        }
    }
};