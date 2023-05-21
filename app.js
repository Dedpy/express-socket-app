const express = require("express");
const http = require("http");
const path = require("path");
const app = express();

const Message = require("./models/message");
const connectDB = require("./database/db.js");
const messageRoutes = require("./routes/messages.js");

app.use(express.json());
app.set("view engine", "twig");
app.set("views", path.join(__dirname, "views"));

app.use("/message", messageRoutes);

const server = http.createServer(app);
const io = require("socket.io")(server);

io.on("connection", (socket) => {
  io.emit("user-joined", "A new user has joined");

  socket.on("disconnect", () => {
    io.emit("user-disconnected", "A user has disconnected");
  });

  socket.on("user-typing", (data) => {
    console.log(`User typing: ${data}`);
    socket.broadcast.emit("userTyping", data);
  });

  socket.on("msg", (data) => {
    console.log(`Message received: ${data}`);
    io.emit("msg", data);
    const message = new Message({
      ...data,
    });
    message.save();
  });
});

app.get("/index", (req, res) => {
  res.render("index");
});
server.listen(8080, async () => {
  connectDB();
  console.log("listening on 8080");
});
