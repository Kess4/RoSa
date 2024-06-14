const express = require('express');

// Configuration de la connexion à la base de données PostgreSQL
const pool = require('./db'); // Import du module db
const router = express.Router();

// Route pour récupérer les données d'accident
router.get('/infos', async (req, res) => {
  try {
    // Exécute une requête SQL pour sélectionner toutes les données d'accident
    const infos = await pool.query("SELECT * FROM information");

    // Renvoie les données d'accident en réponse
    res.status(200).json(infos.rows);
  } catch (error) {
    // En cas d'erreur, renvoie un message d'erreur en réponse
    console.error('Erreur lors de la récupération des données des informations:', error);
    res.status(500).json({ message: 'Erreur lors de la récupération des données des informations' });
  }
});

module.exports = router; // Exportez le routeur pour l'utiliser ailleurs