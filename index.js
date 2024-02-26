const io = require('socket.io')(8000, {
    cors: {
      origin: "http://192.168.63.220:5500",  // replace with your client's origin
      methods: ["GET", "POST"],
      allowedHeaders: ["my-custom-header"],
      credentials: true
    }
  });
  
  const users={};
  
  io.on('connection',socket =>{
      socket.on('new-user-joined',name=>{
          console.log('new user ',name)
          users[socket.id]=name;
          socket.broadcast.emit('user-joined', name)
      })
      socket.on('send',message=>{
          socket.broadcast.emit('receive',{message:message,name:users[socket.id]})
      })
      socket.on('disconnect',message=>{
        socket.broadcast.emit('left',{name:users[socket.id],message:message});
        delete users[socket.id];
      })
  })
  