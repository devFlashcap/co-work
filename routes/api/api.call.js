const types = require('../../co-work-client/src/actions/creators/types');
const call_join = require('../handlers/call/handler.join');
const call_leave = require('../handlers/call/handler.leave');

module.exports.handle_call = (store, io, socket, action) => {
    switch(action.type){
        case types.IO_CALL_JOIN:
            call_join.call_join(store, io, socket, action.payload);
            break;
        case types.IO_CALL_LEAVE:
            call_leave.call_leave(store, io, socket, action.payload);
            break;
    }
};
