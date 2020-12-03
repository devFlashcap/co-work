import React from 'react';
import { Provider } from 'react-redux';
import store from './store';
import AppComponent from './components/component.app';
import jwt_decode from 'jwt-decode';
import { 
    userSocketAssign,
    userSocketDeassign
} from './actions/action.auth';

if(localStorage.jwtToken){
    const token = localStorage.jwtToken;
    const tokenDecoded = jwt_decode(token);
    const user = tokenDecoded.response;
    store.dispatch(userSocketAssign(user));
    const currentTime = Date.now() / 1000;
    if(tokenDecoded.exp < currentTime){
        console.log('expired');
        store.dispatch(userSocketDeassign());
        window.location.href = './login';
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
