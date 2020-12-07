const types = require('../../co-work-client/src/actions/creators/types');
const call_join = require('../handlers/call/handler.join');
const call_leave = require('../handlers/call/handler.leave');
const call_received_set = require('../handlers/call/handler.received.set.js')

module.exports.handle_call = (store, io, socket, action) => {
    switch(action.type){
        case types.IO_CALL_JOIN:
            call_join.call_join(store, io, socket, action.payload);
            break;
        case types.IO_CALL_LEAVE:
            call_leave.call_leave(store, io, socket, action.payload);
            break;
        case types.IO_CALL_RECEIVED_SET:
            call_received_set.call_received_set(store, io, socket, action.payload);
            break;
    }
};
