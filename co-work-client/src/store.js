import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducers";
import { composeWithDevTools } from 'redux-devtools-extension';
import createSocketIoMiddleware from 'redux-socket.io';
import { handle_socket } from './socket_handlers';
import socket from "./socket";
const socketIoMiddleware = createSocketIoMiddleware(socket, "io/");

handle_socket(socket);

const initialState = {};

const middleware = [thunk, socketIoMiddleware];

const store = createStore(
    rootReducer,
    initialState,
    composeWithDevTools(
        applyMiddleware(...middleware)
    )
);

// store.dispatch({type:'server/hello', data:'Hello!'});

export default store