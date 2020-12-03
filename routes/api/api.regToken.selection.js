const types = require('../../co-work-client/src/actions/creators/types');
const regToken_selection_load = require('../handlers/regTokenSelection/handler.regToken.selection.load');
const regToken_selection_add = require('../handlers/regTokenSelection/handler.regToken.selection.add');
const regToken_selection_remove = require('../handlers/regTokenSelection/handler.regToken.selection.remove');

module.exports.handle_regToken_selection = (store, socket, action) => {
    switch(action.type){
        case types.IO_REGTOKEN_SELECTION_LOAD:
            regToken_selection_load.regToken_selection_load(socket);
            break;
        case types.IO_REGTOKEN_SELECTION_ADD:
            regToken_selection_add.regToken_selection_add(store, socket, action.payload);
            break;
        case types.IO_REGTOKEN_SELECTION_REMOVE:
            regToken_selection_remove.regToken_selection_remove(store, socket, action.payload);
            break;
    }
};