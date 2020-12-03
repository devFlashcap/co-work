module.exports.call_leave = async (store, io, socket, data) => {
    const socketsOfCall = store.leaveCall(data.groupID, socket.id);
    if(socketsOfCall !== null){
        for(const socketID of socketsOfCall){
            socket.to(socketID).emit('unpeer', {
                peerId: socket.id,
            });
        }
    }
}