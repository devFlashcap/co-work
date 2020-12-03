const types = require('../../co-work-client/src/actions/creators/types');
const group_join = require('../handlers/group/handler.join');
const group_leave = require('../handlers/group/handler.leave');
const group_create = require('../handlers/group/handler.create');
const group_modify = require('../handlers/group/handler.modify');
const group_remove = require('../handlers/group/handler.remove');

module.exports.handle_group = (store, io, socket, action) => {
    switch(action.type){
        case types.IO_GROUP_JOIN:
            group_join.group_join(store, socket, action.payload);
            break;
        case types.IO_GROUP_LEAVE:
            group_leave.group_leave(socket, action.payload);
            break;
        case types.IO_GROUP_CREATE:
            group_create.group_create(store, io, socket, action.payload);
            break;
        case types.IO_GROUP_MODIFY:
            group_modify.group_modify(store, io, socket, action.payload);
            break;
        case types.IO_GROUP_REMOVE:
            group_remove.group_remove(store, io, socket, action.payload);
            break;

    }
};