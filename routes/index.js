const express = require("express");
const router = express.Router();

const {
  createMesssage,
  updateMesssage,
  deleteMesssage,
  getMesssage,
  getMesssages,
  likeMessage,
} = require("../controllers/message.controller");

router.get("/", getMesssages);
router.get("/:id", getMesssage);
router.post("/", createMesssage);
router.put("/:id", updateMesssage);
router.put("/like/:id", likeMessage);
router.delete("/:id", deleteMesssage);

module.exports = router;
