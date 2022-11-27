const path = require("path");
const express = require("express");
const http = require("http");
const socketio = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketio(server);

const port = process.env.PORT || 3000;
const publicDirectoryPath = path.join(__dirname, "../public");

app.use(express.static(publicDirectoryPath));

io.on("connection", (socket) => {
  socket.emit("message", "Welcome");
  socket.broadcast.emit("message", "A new user has joined!");
  
  socket.on("sendMessage", (msg, callback)=>{
    io.emit("message", msg);
    callback("yes.");
  })

  socket.on('disconnect', ()=>{
    io.emit('message', 'A user has left');
  })
});



server.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
