const types = require('../../co-work-client/src/actions/creators/types');
const user_selection_load = require('../handlers/userSelection/handler.user.selection.load');
const user_selection_modify = require('../handlers/userSelection/handler.user.selection.modify');

module.exports.handle_user_selection = (store, socket, action) => {
    switch(action.type){
        case types.IO_USER_SELECTION_LOAD:
            user_selection_load.user_selection_load(socket, action.payload);
            break;
        case types.IO_USER_SELECTION_MODIFY:
            user_selection_modify.user_selection_modify(store, socket, action.payload);
    }
};