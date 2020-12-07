const actions = require('../../../co-work-client/src/actions/creators/types');
const dm_user = require('../../dm/dm.user');
const response_code = require('../../dm/response.code');
const debug_mode = require('../../../config/keys').DEBUG_MODE;

module.exports.user_password_change = async (socket, data) => {
    const changePassword = await dm_user.user_password_change({email: data.email, password: data.password, password2: data.password2, password3: data.password3});
    debug_mode && socket.emit('debug_response', changePassword);
    if(changePassword.status === response_code.HTTP_200){
        socket.emit('action', {type: actions.FORM_RESULTS_SET, payload: {results: changePassword.response, success: true}});
    }
    else if(user.status !== response_code.HTTP_500){
        socket.emit('action', {type: actions.FORM_RESULTS_SET, payload: {results: changePassword.response, success: false}});
    }
};