const dm_group = require('../../dm/dm.group');
const actions = require('../../../co-work-client/src/actions/creators/types');
const debug_mode = require('../../../config/keys').DEBUG_MODE;
const response_code = require('../../dm/response.code');

module.exports.call_leave = async (store, io, socket, data) => {
    const socketsOfCall = store.leaveCall(data.groupID, socket.id);
    if(socketsOfCall !== null && socketsOfCall.length > 0){
        for(const user of socketsOfCall){
            socket.to(user.socketID).emit('unpeer', {
                peerId: socket.id,
            });
        }
    }
    else{
        // emit to all online members
        const group = await dm_group.group_read({groupID: data.groupID});
        debug_mode && socket.emit('debug_response', group);
        if(group.status === response_code.HTTP_200){
            for(const memberID of group.response.members){
                const socketIDs = store.getSocketIDsOfUser(memberID);
                if(socketIDs !== null){
                    for(const socketID of socketIDs){
                        socket.to(socketID).emit('action', {type: actions.CALL_IN_PROGRESS_REMOVE, payload: data.groupID});
                    }
                }
            }
        }
    }
}