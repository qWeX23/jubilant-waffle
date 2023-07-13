const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const Server = require("socket.io");
const io = Server(server);
const path = require('path');

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname,"../client","index.html"));
});

io.on("connection", (socket) => {
  io.emit("numberOfUsers",getNumberOfUsers())
  io.emit("Joined","Joined "+socket.id)
  socket.on("chat message", (msg) => {
    console.log(msg.message)
    socket.broadcast.emit("chat message", msg);
  });
  socket.on("disconnect", (reason) => {
    console.log("disconnect happened!"+ reason)
    io.emit("numberOfUsers",getNumberOfUsers())
    
    io.emit("chat message",{message:"left",username:"a user"})
});
});



server.listen(80, () => {
  console.log("listening on *:3000");
});

function getNumberOfUsers() {
  var srvSockets = io.sockets.sockets;
  var numberOfUsers = srvSockets.size
  return numberOfUsers
}