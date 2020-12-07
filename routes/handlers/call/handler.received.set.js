const dm_group = require('../../dm/dm.group');
const actions = require('../../../co-work-client/src/actions/creators/types');
const debug_mode = require('../../../config/keys').DEBUG_MODE;
const response_code = require('../../dm/response.code');

module.exports.call_received_set = async (store, io, socket, data) => {
    if(data.groupID !== null){
        const group = await dm_group.group_read({groupID: data.groupID});
        debug_mode && socket.emit('debug_response', group);
        if(group.status === response_code.HTTP_200){
            for(const memberID of group.response.members){
                const socketIDs = store.getSocketIDsOfUser(memberID);
                if(socketIDs !== null){
                    for(const socketID of socketIDs){
                        socket.to(socketID).emit('action', {type: actions.CALL_RECEIVED_SET, payload: data.groupID});
                    }
                }
            }
        }
    }
    else{
        const ownSocketIDs = store.getSocketIDsOfUser(store.getUserID(socket.id));
        if(ownSocketIDs !== null){
            for(const socketID of ownSocketIDs){
                socket.to(socketID).emit('action', {type: actions.CALL_RECEIVED_SET, payload: null});
                socket.emit().emit('action', {type: actions.CALL_RECEIVED_SET, payload: null});
            }
        }
    }
}