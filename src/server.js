const express = require('express');
const http = require('http');
const path = require('path');
const cors = require('cors');
// const socketio = require('socket.io')(3000, {
//     cors: {
//         options: ['*', 'http://localhost:4200'],
//     }
// });
const socketio = require('socket.io');
const app = express();

const server = http.createServer(app);
const io = socketio().listen(server);

app.use(express.static('./dist/lastHope'));
app.use(cors());

app.get('/*', (req, res) =>
    res.sendFile('index.html', {root: 'dist/lastHope/'}),
);

// ser.listen(process.env.PORT || 3000);

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => console.log(`running on ${PORT}`));
// const app = express();
// const server = http.createServer(app);
// const io = socketio(server);

io.on('connect', socket =>{
    console.log(`new connection ${socket.id}`);

    socket.on('play', (user)=>{
        // if(user.room === ''){
        //     socket.broadcast.emit('play-video', user.item);
        // }
        if(user.room !== ''){
            socket.to(user.room).emit('play-video', user.item);
        }
    });
    socket.on('pause', (user)=>{
        // if(user.room === ''){
        //     socket.broadcast.emit('pause-video', user.item);
        // }
        if(user.room !== ''){
            socket.to(user.room).emit('pause-video', user.item);
        }
    });
    socket.on('stop', (user)=>{
        // if(user.room === ''){
        //     socket.broadcast.emit('stop-video', user.item);
        // }
        if(user.room !== ''){
            socket.to(user.room).emit('stop-video', user.item);
        }
    });
    socket.on('seek-progressbar', (pbinfo) => {
        // if(pbinfo.room === ''){
        //     socket.broadcast.emit('new-pb-seek', String(pbinfo.realPos));
        // }
        if(pbinfo.room !== ''){
            socket.to(pbinfo.room).emit('new-pb-seek', String(pbinfo.realPos));
        }
    });
    socket.on('change-video', (urlinfo) => {
        // if(urlinfo.room === ''){
        //     socket.broadcast.emit('change-video-new', urlinfo.inputVideoUrl);
        // }
        if(urlinfo.room !== ''){
            socket.to(urlinfo.room).emit('change-video-new', urlinfo.inputVideoUrl);
        }
    });

    socket.on('join-room', (roomId, cb)=>{
        let msg = 'joined';
        socket.broadcast.emit('joined-room', ({msg, roomId}));
        socket.join(roomId);
        cb(`joined room ${roomId}`);
    });
    socket.on('leave-room', (roomId, cb)=>{
        let msg = 'left';
        socket.broadcast.emit('left-room', msg);
        socket.leave(roomId);
        cb(`left room ${roomId}`);
    });
});



// const PORT = 3000 || process.env.PORT;

// server.listen(PORT, () => console.log(`running on ${PORT}`));











// const express = require('express');
// const http = require('http');
// const io = require('socket.io')(3000, {
//     cors: {
//         options: ['http://localhost:4200'],
//     }
// });

// io.on('connect', socket =>{
//     console.log(`new connection ${socket.id}`);

//     socket.on('play', (user)=>{
//         if(user.room === ''){
//             socket.broadcast.emit('play-video', user.item);
//         }
//         else{
//             socket.to(user.room).emit('play-video', user.item);
//         }
//     });
//     socket.on('pause', (user)=>{
//         if(user.room === ''){
//             socket.broadcast.emit('pause-video', user.item);
//         }
//         else{
//             socket.to(user.room).emit('pause-video', user.item);
//         }
//     });
//     socket.on('stop', (user)=>{
//         if(user.room === ''){
//             socket.broadcast.emit('stop-video', user.item);
//         }
//         else{
//             socket.to(user.room).emit('stop-video', user.item);
//         }
//     });
//     socket.on('change-video', (urlinfo)=>{
//         if(urlinfo.room === ''){
//             socket.broadcast.emit('change-video-new', urlinfo.inputVideoUrl);
//         }
//         else{
//             socket.to(urlinfo.room).emit('change-video-new', urlinfo.inputVideoUrl);
//         }
//     });
//     socket.on('seek-progressbar', (pbinfo) => {
//         if(pbinfo.room === ''){
//             socket.broadcast.emit('progressbar-seek-new', String(pbinfo.realPos));
//         }
//         else{
//             socket.to(pbinfo.room).emit('progressbar-seek-new', String(pbinfo.realPos));
//         }
//     });

//     socket.on('join-room', (roomId, cb)=>{
//         let msg = 'joined';
//         socket.broadcast.emit('joined-room', ({msg, roomId}));
//         socket.join(roomId);
//         cb(`joined room ${roomId}`);
//     });
//     socket.on('leave-room', (roomId, cb)=>{
//         let msg = 'left';
//         socket.broadcast.emit('left-room', msg);
//         socket.leave(roomId);
//         cb(`left room ${roomId}`);
//     });
// });