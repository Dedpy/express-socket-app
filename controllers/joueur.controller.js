const { get } = require("mongoose");
const Joueur = require("../models/joueur");

const createJoueur = async (req, res) => {
  try {
    const { pseudo } = req.body;
    let joueur = new Joueur({ pseudo, sante: 100, score: 0 });
    await joueur.save();
    return res.status(200).json({ joueur });
  } catch (error) {
    return res.status(500).json({ error });
  }
};

const updateJoueur = async (req, res) => {
  try {
    const { id } = req.params;
    const { pseudo, sante, score } = req.body;
    const joueur = await Joueur.findById(id);
    joueur.pseudo = pseudo;
    joueur.sante = sante;
    joueur.score = score;
    await joueur.save();
    return res.status(200).json({ joueur });
  } catch (error) {
    return res.status(500).json({ error });
  }
};

const deleteJoueur = async (req, res) => {
  const { id } = req.params;
  console.log(id);
  const joueur = await Joueur.findById(id);
  await joueur.deleteOne();
  return res.status(200).json({ joueur: "deleted successfully" });
};

const getJoueur = async (req, res) => {
  const joueur = await Joueur.findById(req.params.id);
  return res.status(200).json({ joueur });
};

const getJoueurs = async (req, res) => {
  const joueurs = await Joueur.find({});
  return res.status(200).json({ joueurs });
};

const attaqueJoueur = async (req, res) => {
  const attaquant = await Joueur.findById(req.params.idAttaquant);
  const victime = await Joueur.findById(req.params.idVictime);
  victime.sante = victime.sante - 20;
  attaquant.score = attaquant.score + 10;
  await victime.save();
  await attaquant.save();
  return res.status(200).json({ attaquant, victime });
};

module.exports = {
  getJoueur,
  getJoueurs,
  createJoueur,
  updateJoueur,
  deleteJoueur,
  attaqueJoueur,
};
