class Store
{
    constructor(){
        this.loggedInUsers = [];
        this.callsInProgress = [];
    }

    socketAssign(userID, socketID){
        const index = this.loggedInUsers.findIndex(u => u.userID === userID);
        if(index >= 0){
            this.loggedInUsers[index].socketIDs = [...this.loggedInUsers[index].socketIDs, socketID]; 
        }
        else{
            this.loggedInUsers = [
                ...this.loggedInUsers,
                {
                    userID: userID,
                    socketIDs: [socketID],
                    socketPreserved: null
                }
            ];
        }
    }

    socketDeassign(socketID){
        const index = this.loggedInUsers.findIndex(function(user) {
            return user.socketIDs.indexOf(socketID) !== -1;
        });
        if(index >= 0){
            if(this.loggedInUsers[index].socketIDs.length == 1){
                this.loggedInUsers = [...this.loggedInUsers.slice(0, index), ...this.loggedInUsers.slice(index+1)];
            }
            else{
                const socketIDIndex = this.loggedInUsers[index].socketIDs.findIndex(sID => sID === socketID);
                this.loggedInUsers[index ].socketIDs = [...this.loggedInUsers[index].socketIDs.slice(0, socketIDIndex), ...this.loggedInUsers[index].socketIDs.slice(socketIDIndex+1)];
            }
        }
    }

    getOfflineMembers(memberIDs){
        let offlineUsers = [];
        for(const memberID of memberIDs){
            const index = this.loggedInUsers.findIndex(u => u.userID == memberID);
            if(index === -1){
                offlineUsers = [...offlineUsers, memberID];
            }
        }
        return offlineUsers;
    }

    getOnlineMembersNotInRoom(io, memberIDs, room){
        let onlineMembersNotInRoom = [];
        for(const memberID of memberIDs){
            const index = this.loggedInUsers.findIndex(u => u.userID == memberID);
            if(index >= 0){
                const onlineMember = this.loggedInUsers[index];
                let socketsNotInRoom = [];
                for(const socketID of onlineMember.socketIDs){
                    const socket = io.sockets.connected[socketID];
                    if(!(room in socket.rooms)){
                        socketsNotInRoom = [...socketsNotInRoom, socketID];
                    }
                }
                onlineMembersNotInRoom = [...onlineMembersNotInRoom, {
                    userID: onlineMember.userID,
                    socketIDs: socketsNotInRoom
                }];
            }
        }
        return onlineMembersNotInRoom;
    }

    getUserID(socketID){
        const index = this.loggedInUsers.findIndex(function(user) {
            return user.socketIDs.indexOf(socketID) !== -1;
        });
        if(index >= 0){
            return this.loggedInUsers[index].userID;
        }
        return null;
    }

    getSockets(io, socketID){
        const index = this.loggedInUsers.findIndex(function(user) {
            return user.socketIDs.indexOf(socketID) !== -1;
        });
        if(index >= 0){
            let sockets = [];
            for(const socketID of this.loggedInUsers[index].socketIDs){
                sockets = [...sockets, io.sockets.connected[socketID]];
            }
            return sockets;
        }
        return null;
    }

    getSocketIDsOfUser(userID){
        const index = this.loggedInUsers.findIndex(u => u.userID == userID);
        if(index >= 0){
            return this.loggedInUsers[index].socketIDs;
        }
        return null;
    }

    joinCall(groupID, socketID){
        let usersOfCall = null;
        if(this.callsInProgress.length > 0){
            const callIndex = this.callsInProgress.findIndex(c => c.groupID === groupID);
            if(callIndex >= 0){
                const userID = this.getUserID(socketID);
                const userIndex = this.callsInProgress[callIndex].users.findIndex(u => u.userID == userID);
                if(userIndex === -1){
                    usersOfCall = this.callsInProgress[callIndex].users;
                    this.callsInProgress[callIndex].users = [
                        ...this.callsInProgress[callIndex].users,
                        {
                            userID: userID,
                            socketID: socketID
                        }
                    ];
                }
            }
            else{
                const userID = this.getUserID(socketID);
                usersOfCall = this.callsInProgress[callIndex].users;
                this.callsInProgress = [
                {
                    groupID: groupID,
                    users : [
                        {
                            userID: userID,
                            socketID: socketID
                        }
                    ]
                }];
            }
        }
        else{
            const userID = this.getUserID(socketID);
            this.callsInProgress = [
            {
                groupID: groupID,
                users : [
                    {
                        userID: userID,
                        socketID: socketID
                    }
                ]
            }];
        }
        return usersOfCall;
    }

    callInProgress(groupID){
        if(this.callsInProgress.length > 0){
            const callIndex = this.callsInProgress.findIndex(c => c.groupID == groupID);
            return callIndex >= 0;
        }
        return false;
    }

    leaveCall(groupID, socketID){
        let usersOfCall = null;
        if(this.callsInProgress.length > 0){
            const callIndex = this.callsInProgress.findIndex(c => c.groupID === groupID);
            if(callIndex >= 0){
                const userID = this.getUserID(socketID);
                const userIndex = this.callsInProgress[callIndex].users.findIndex(u => u.userID == userID);
                if(userIndex >= 0){
                    this.callsInProgress[callIndex].users = [...this.callsInProgress[callIndex].users.slice(0, userIndex), ...this.callsInProgress[callIndex].users.slice(userIndex+1)];
                    usersOfCall = this.callsInProgress[callIndex].users;
                    if(this.callsInProgress[callIndex].users.length === 0){
                        this.callsInProgress = [...this.callsInProgress.splice(0, callIndex), ...this.callsInProgress.splice(callIndex+1)];
                    }
                }
            }
        }
        return usersOfCall;
    }
}

module.exports = Store;