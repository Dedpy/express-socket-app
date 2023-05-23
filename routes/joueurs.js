const express = require("express");
const router = express.Router();

const {
  getJoueur,
  getJoueurs,
  createJoueur,
  updateJoueur,
  deleteJoueur,
  attaqueJoueur,
} = require("../controllers/joueur.controller");

const { createPartie } = require("../controllers/partie.controller");

router.get("/getalljoueur", getJoueurs);
router.get("/getjoueur/:id", getJoueur);
router.post("/newjoueur", createJoueur);
router.post("/newpartie", createPartie);
router.put("/:id", updateJoueur);
router.delete("/deleteJoueur/:id", deleteJoueur);
router.put("/attaque/:idAttaquant/:idVictime", attaqueJoueur);

module.exports = router;
