const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const { addUser, removeUser, getUsers } = require("./services/users");
const { addMessage, getMessages } = require("./services/chat");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: "*" },
});

io.on("connection", (socket) => {
  console.log("client random connected");

  socket.on("add_user", (nickname) => {
    addUser(nickname, socket.id);
    io.emit("users", getUsers());
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected");
    const userRemoved = removeUser(socket.id);
    if (userRemoved) {
      io.emit("user_disconnected", userRemoved.nickname);
    }
    io.emit("users", getUsers());
  });

  socket.on("get_users", () => {
    io.emit("users", getUsers());
  });

  // messages begin

  socket.on("chat_message", (message) => {
    addMessage(message);
    io.emit("chat_message", message);
  });

  socket.on("typing", (nickname) => {
    socket.broadcast.emit("user_typing", nickname);
  });

  socket.on("stop_typing", () => {
    socket.broadcast.emit("user_stop_typing");
  });

  socket.on("get_messages", () => {
    io.emit("chat_messages", getMessages());
  });
});

server.listen(3000);
