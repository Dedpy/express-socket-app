const mongoose = require("mongoose");
const { Schema } = mongoose;

const Joueur = new Schema({
  pseudo: String,
  sante: Number,
  score: Number,
});

module.exports = mongoose.model("Joueur", Joueur);
