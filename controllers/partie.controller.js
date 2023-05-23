const Partie = require("../models/partie");

const createPartie = async (req, res) => {
  try {
    const { nom, joueur_1, joueur_2 } = req.body;
    let partie = new Partie({ nom, joueur_1, joueur_2, etat: "en cours" });
    await partie.save();
    return res.status(200).json({ partie });
  } catch (error) {
    return res.status(500).json({ error });
  }
};

const updatePartie = async (req, res) => {
  try {
    const { id } = req.params;
    const { nom, joueur_1, joueur_2, etat } = req.body;
    const partie = await Partie.findById(id);
    partie.nom = nom;
    partie.joueur_1 = joueur_1;
    partie.joueur_2 = joueur_2;
    partie.etat = etat;
    await partie.save();
    return res.status(200).json({ partie });
  } catch (error) {
    return res.status(500).json({ error });
  }
};

const deletePartie = async (req, res) => {
  const { id } = req.params;
  const partie = await Partie.findById(id);
  await partie.deleteOne();
  return res.status(200).json({ partie: "deleted successfully" });
};

const getPartie = async (req, res) => {
  const partie = await Partie.findById(req.params.id);
  return res.status(200).json({ partie });
};

const getParties = async (req, res) => {
  const parties = await Partie.find({});
  return res.status(200).json({ parties });
};

module.exports = {
  getPartie,
  getParties,
  createPartie,
  updatePartie,
  deletePartie,
};
