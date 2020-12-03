const types = require('../../co-work-client/src/actions/creators/types');
const regToken_create = require('../handlers/regToken/handler.create');
const regToken_read = require('../handlers/regToken/handler.read');
const regToken_remove = require('../handlers/regToken/handler.remove');

module.exports.handle_regToken = (socket, action) => {
    switch(action.type){
        case types.IO_REGTOKEN_CREATE:
            regToken_create.regToken_create(socket, action.payload);
            break;
        case types.IO_REGTOKEN_READ:
            regToken_read.regToken_read(socket, action.payload);
            break;
        case types.IO_REGTOKEN_REMOVE:
            regToken_remove.regToken_remove(socket, action.payload);
            break;
    }
};