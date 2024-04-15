const express = require('express');

// Configuration de la connexion à la base de données PostgreSQL
const pool = require('./db'); // Import du module db
const router = express.Router();

// Route pour récupérer les données d'accident
router.get('/accidents', async (req, res) => {
  try {
    // Exécute une requête SQL pour sélectionner toutes les données d'accident
    const accidents = await pool.query('SELECT * FROM accident WHERE latitude BETWEEN 44.50 AND 45.50 AND longitude BETWEEN -1.50 AND -0.25 LIMIT 100');

    // Renvoie les données d'accident en réponse
    res.status(200).json(accidents.rows);
  } catch (error) {
    // En cas d'erreur, renvoie un message d'erreur en réponse
    console.error('Erreur lors de la récupération des données d\'accident:', error);
    res.status(500).json({ message: 'Erreur lors de la récupération des données d\'accident' });
  }
});

module.exports = router; // Exportez le routeur pour l'utiliser ailleurs
