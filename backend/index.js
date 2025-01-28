const express = require("express");
const { Server } = require("socket.io");
const cors = require("cors");
const http = require("http");

const app = express();
app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

server.listen(4000, () => {
  console.log("Server is running on port 4000");
});

io.on("connection", (socket) => {

  console.log(`User ID: ${socket.id}`);

  socket.on("msg-sent", (data) => {
    console.log(data.room);
    socket.to(data.seconduser).to(data.firstuser).emit("msg-sent", data);
  });

  socket.on("join-room", (data) => {
    socket.join(data.firstuser);
    console.log(
      `${data.firstuser} with ID: ${socket.id} joined room: ${data.firstuser}`
    );
  });

  socket.on("disconnect", () => {
    console.log("User Disconnected", socket.id);
  });


});
