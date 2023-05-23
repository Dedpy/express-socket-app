const express = require("express");
const router = express.Router();

const {
  createPartie,
  updatePartie,
  deletePartie,
  getPartie,
  getParties,
} = require("../controllers/partie.controller");

router.get("/", getParties);
router.get("/:id", getPartie);
router.post("/", createPartie);
router.put("/:id", updatePartie);
router.delete("/:id", deletePartie);

module.exports = router;
