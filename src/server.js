const express = require('express');
const http = require('http');
const path = require('path');
const socketio = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketio().listen(server);

io.on('connect', socket =>{
    socket.on('joinroom', ({username, room})=>{
        // const user = joinUser(socket.id, username, room);

        // socket.join(user.room);
        // socket.emit('message', formatMsg(botName, "welcome"));
        // socket.broadcast.to(user.room).emit('message', formatMsg(botName, `${user.username} has connected`));
        // io.to(user.room).emit('roomUsers', {
        //     room: user.room,
        //     users: getRoomUsers(user.room)
        // });
    });

    socket.on('play', ()=>{
        console.log('server catched play');
        // const user = getCurrentUser(socket.id);
        // io.to(user.room).emit('message', formatMsg(user.username, message));
    });
    socket.on('pause', ()=>{
        console.log('server catched pause');
        // const user = getCurrentUser(socket.id);
        // io.to(user.room).emit('message', formatMsg(user.username, message));
    });

    socket.on('seek', (message)=>{
        // const user = getCurrentUser(socket.id);
        // io.to(user.room).emit('message', formatMsg(user.username, message));
    });

    socket.on('disconnect', ()=>{
        // const user = userLeaves(socket.id);

        // if(user){
        //     io.to(user.room).emit('message',  formatMsg(botName,`${user.username} has left.`));

        //     io.to(user.room).emit('roomUsers', {
        //         room: user.room,
        //         users: getRoomUsers(user.room)
        //     });
        // }
    });
});

const PORT = 4200 || process.env.PORT;

server.listen(PORT, ()=> console.log(`server running on port ${PORT}`));