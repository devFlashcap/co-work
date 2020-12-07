import React from 'react';
import { Provider } from 'react-redux';
import store from './store';
import AppComponent from './components/component.app';
import jwt_decode from 'jwt-decode';
import { 
    action_userSocketAssign,
    action_userLogout
} from './actions/creators/creator.auth';

if(localStorage.jwtToken){
    const token = localStorage.jwtToken;
    const tokenDecoded = jwt_decode(token);
    const currentTime = Date.now() / 1000;
    if(tokenDecoded.exp < currentTime){
        store.dispatch(action_userLogout());
    }
    else{
        const user = tokenDecoded.response;
        store.dispatch(action_userSocketAssign(user));
    }
}

function App() {
    return (
        <Provider store = {store}>
            <AppComponent />
        </Provider>
    );
}

export default App;
