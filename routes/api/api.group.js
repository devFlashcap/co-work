const types = require('../../co-work-client/src/actions/creators/types');
const group_join = require('../handlers/group/handler.join');
const group_leave = require('../handlers/group/handler.leave');
const group_create = require('../handlers/group/handler.create');
const group_modify = require('../handlers/group/handler.modify');
const group_remove = require('../handlers/group/handler.remove');
const group_members_add = require('../handlers/group/handler.members.add');
const group_members_remove = require('../handlers/group/handler.members.remove');

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
        case types.IO_GROUP_MEMBERS_ADD:
            group_members_add.group_members_add(store, io, socket, action.payload);
            break;
        case types.IO_GROUP_MEMBERS_REMOVE:
            group_members_remove.group_members_remove(store, io, socket, action.payload);
            break;
    }
};