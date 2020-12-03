module.exports.handle_disconnect = function handle_disconnect(store, socketID) {
    console.log("disconnect ", socketID);
    store.socketDeassign(socketID);
};