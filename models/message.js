const mongoose = require("mongoose");
const { Schema } = mongoose;

const Message = new Schema({
  pseudo: String,
  content: String,
  likes: Number,
});

module.exports = mongoose.model("Message", Message);
