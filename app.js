const express = require("express");
const http = require("http");
const path = require("path");
const app = express();
const connectDB = require("./database/db.js");

const messageRoutes = require("./routes/messages.js");
app.use(express.json());
app.use("/message", messageRoutes);
app.set("view engine", "twig");
app.set("views", path.join(__dirname, "views"));

const server = http.createServer(app);
const io = require("socket.io")(server);

io.on("connection", function async(socket) {
  socket.emit("user-joined", "a new user is connected");
  socket.on("msg", async (data) => {
    io.emit("msg", data);
    const msg = new Chat({ message: data, date: new Date() });
    await msg.save();
  });
  socket.on("disconnect", () => {
    io.emit("user disonnected", "user has disconnected");
  });

  socket.on("user typing", (data) => {
    io.emit("userTyping", data);
  });
});

app.get("/index", (req, res) => {
  res.render("index");
});
server.listen(8080, async () => {
  connectDB();
  console.log("listening on 8080");
});
