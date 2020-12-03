// require
const cors = require('cors');
const config = require('./config/keys');
const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const mongoose = require("mongoose");
const ioHandler = require('./routes/api/api.socket');
const Store = require('./store');
const store = new Store();

// connect to database
mongoose.connect(config.ATLAS_URI, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true, useFindAndModify: false });
const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection established successfully");
});

ioHandler.handle_io(io, store);

let whitelist = ['http://localhost']
let corsOptions = {
    origin: function (origin, callback) {
        if (whitelist.indexOf(origin) !== -1) {
            callback(null, true)
        } 
        else{
            callback(new Error('Not allowed by CORS'))
        }
    }
}

// use
app.use(cors(/*corsOptions*/));
app.use(express.json());

http.listen(config.NODE_PORT, () => {
    console.log('Server is running on port: ' + config.NODE_PORT);
});