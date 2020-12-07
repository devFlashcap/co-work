import history from "../history";

export const handle_socket = (socket) => {
    socket.on('login', token => {
        localStorage.setItem('jwtToken', token);
    });
    
    socket.on('logout', () => {
        localStorage.removeItem('jwtToken');
    });
    
    socket.on('gohome', () => {
        history.push('/');
    });
    
    socket.on("goback", () => {
        history.goBack();
    });
};