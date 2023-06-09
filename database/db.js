const mongoose = require("mongoose");

const connectDB = () => {
  const MONGO_URL = "mongodb://localhost:27017/myexam2023";
  mongoose
    .connect(MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("DB connected");
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = connectDB;
