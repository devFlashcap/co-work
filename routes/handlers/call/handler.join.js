const dm_group = require('../../dm/dm.group');
const actions = require('../../../co-work-client/src/actions/creators/types');
const debug_mode = require('../../../config/keys').DEBUG_MODE;
const response_code = require('../../dm/response.code');

module.exports.call_join = async (store, io, socket, data) => {
    const usersOfCall = store.joinCall(data.groupID, socket.id);
    const userID = store.getUserID(socket.id);
    if(usersOfCall !== null){
        for(const user of usersOfCall){
            socket.to(user.socketID).emit('peer', {
                userId: userID,
                peerId: socket.id
            });
        }
    }
    else{
        const group = await dm_group.group_read({groupID: data.groupID});
        debug_mode && socket.emit('debug_response', group);
        const userID = store.getUserID(socket.id);
        if(group.status === response_code.HTTP_200){
            for(const memberID of group.response.members){
                const memberSocketIDs = store.getSocketIDsOfUser(memberID);
                if(memberSocketIDs !== null){
                    for(const memberSocketID of memberSocketIDs){
                        if(memberID != userID){
                            socket.to(memberSocketID).emit('action', {type: actions.CALL_RECEIVED_SET, payload: data.groupID});
                        }
                        socket.to(memberSocketID).emit('action', {type: actions.CALL_IN_PROGRESS_ADD, payload: data.groupID});
                    }
                }
            }

        }
    }
}