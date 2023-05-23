const express = require("express");
const http = require("http");
const path = require("path");
const app = express();

const Partie = require("./models/partie");
const Joueur = require("./models/joueur");

const connectDB = require("./database/db.js");
const partieRoutes = require("./routes/parties.js");
const joueurRoutes = require("./routes/joueurs.js");

app.use(express.json());
app.set("view engine", "twig");
app.set("views", path.join(__dirname, "views"));
app.use(express.static("public"));
app.use("/partie", partieRoutes);
app.use("/user", joueurRoutes);

const server = http.createServer(app);
const io = require("socket.io")(server);

io.on("connection", (socket) => {
  socket.on("disconnect", () => {
    io.emit("user-disconnected", "A user has disconnected");
  });

  socket.on("newpartie", (data) => {
    io.emit("newpartie", data);
    const partie = new Partie({
      ...data,
    });
    partie.save();
  });

  socket.on("status", async (data) => {
    //statistiques des deux jours pour la partie final data : partie, joueur1, joueur2
    let joueur1 = await Joueur.findById(data.joueur_1);
    let joueur2 = await Joueur.findById(data.joueur_2);
    let partie = data.nom;

    io.emit("stat", { partie, joueur1, joueur2 });
  });
});

app.get("/index", (req, res) => {
  res.render("index");
});
server.listen(8080, async () => {
  connectDB();
  console.log("listening on 8080");
});
