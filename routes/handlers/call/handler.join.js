module.exports.call_join = async (store, io, socket, data) => {
    const usersOfCall = store.joinCall(data.groupID, socket.id);
    console.log(usersOfCall);
    if(usersOfCall !== null){
        for(const user of usersOfCall){
            socket.to(user.socketID).emit('peer', {
                peerId: socket.id
            });
        }
    }
}