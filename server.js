const app = require('express')();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
io.on('connection', (socket) => { 
    console.log('made socket connection', socket.id);

    // Handle chat event
    socket.on('chat', function(data){
        console.log(data);
        io.sockets.emit('chat', data);
    });

    // Handle typing event
    socket.on('typing', function(data){
        console.log("typing...");
        socket.broadcast.emit('typing', data);
    });
});
server.listen(4000, function () {
    console.log('listening for requests on port 4000,');
});