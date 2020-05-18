# webchat nodejs

### Prerequisite 
```c
$ npm install express
$ npm install socket.io
```

### RUN
```c
$ node index.js
```

### RESULT
![image](https://user-images.githubusercontent.com/52392004/82226152-19af0780-9961-11ea-9f57-5feb9cd748a7.png)

### SEVER: index.js
```js
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

```

### Client: chat.js
```js
// Make connection
var socket = io.connect('http://localhost:4000');

// Query DOM
var message = document.getElementById('message'),
      handle = document.getElementById('handle'),
      btn = document.getElementById('send'),
      output = document.getElementById('output'),
      feedback = document.getElementById('feedback');

// Emit events
btn.addEventListener('click', function(){
    socket.emit('chat', {
        message: message.value,
        handle: handle.value
    });
    message.value = "";
});

message.addEventListener('keypress', function(){
    socket.emit('typing', handle.value);
})

// Listen for events
socket.on('chat', function(data){
    feedback.innerHTML = '';
    output.innerHTML += '<p><strong>' + data.handle + ': </strong>' + data.message + '</p>';
});

socket.on('typing', function(data){
    feedback.innerHTML = '<p><em>' + data + ' is typing a message...</em></p>';
});
```


### Reference
https://github.com/socketio/socket.io

https://github.com/iamshaunjp/websockets-playlist
