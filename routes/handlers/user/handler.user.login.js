const actions = require('../../../co-work-client/src/actions/creators/types');
const dm_user = require('../../dm/dm.user');
const response_code = require('../../dm/response.code');
const signToken = require('../../../utils/signToken');
const user_socket_assign = require('./handler.user.socket.assign');
const debug_mode = require('../../../config/keys').DEBUG_MODE;
const validateLogin = require('../../../validation/validator.login');

module.exports.user_login = async (store, socket, data) => {
    const { errors, isValid } = validateLogin(data);
    if(!isValid){
        socket.emit('action', {type: actions.FORM_RESULTS_SET, payload: {results: errors, success: false}});
    }
    else{
        const user = await dm_user.user_login({email: data.email, password: data.password});
        debug_mode && socket.emit('debug_response', user);
        if(user.status === response_code.HTTP_200){
            const token = await signToken(user);
            debug_mode && socket.emit('debug_response', token);
            if(token.status === response_code.HTTP_200){
                socket.emit('action', {type: actions.FORM_RESULTS_SET, payload: {}});
                socket.emit('login', token.response.token);
                user_socket_assign.user_socket_assign(store, socket, user.response);
            }
        }
        else if(user.status !== response_code.HTTP_500){
            socket.emit('action', {type: actions.FORM_RESULTS_SET, payload: {results: user.response, success: false}});
        }
    }
};