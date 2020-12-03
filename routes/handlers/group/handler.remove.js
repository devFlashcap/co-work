const actions = require('../../../co-work-client/src/actions/creators/types');
const dm_group = require('../../dm/dm.group');
const dm_notification = require('../../dm/dm.notification');
const response_code = require('../../dm/response.code');
const debug_mode = require('../../../config/keys').DEBUG_MODE;

module.exports.group_remove = async (store, io, socket, data) => {
    const group = await dm_group.group_remove(data);
    debug_mode && socket.emit('debug_response', group);
    if(group.status === response_code.HTTP_200){     
        socket.emit('action', {type: actions.GROUP_REMOVE, payload: data.groupID});
    }
};