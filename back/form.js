const express = require('express');

// Configuration de la connexion à la base de données PostgreSQL
const pool = require('./db'); // Import du module db
const router = express.Router();

// Route pour ajouter un nouvel accident
router.post('/form', async (req, res) => {
    try {
      const { n_incident, date, heure, lieu, femme, homme, blesse, deces, type_de_vehicule, type_de_collision, meteo, qualite_de_la_surface, visibilite, commentaire, image, longitude, latitude } = req.body;
  
      // Exécute une requête SQL pour insérer un nouvel accident dans la base de données
      const newAccident = await pool.query(
        'INSERT INTO form (n_incident, date, heure, lieu, femme, homme, blesse, deces, type_de_vehicule, type_de_collision, meteo, qualite_de_la_surface, visibilite, commentaire, image, longitude, latitude) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17) RETURNING *',
        [n_incident, date || null, heure || null, lieu || null, femme || null, homme || null, blesse || null, deces || null, type_de_vehicule || null, type_de_collision || null, meteo || null, qualite_de_la_surface || null, visibilite || null, commentaire || null, image || null, longitude || null, latitude || null]
      );
  
      // Renvoie les données du nouvel accident inséré en réponse
      res.status(201).json(newAccident.rows[0]);
    } catch (error) {
      // En cas d'erreur, renvoie un message d'erreur en réponse
      console.error('Erreur lors de l\'ajout d\'un nouvel accident:', error);
      res.status(500).json({ message: 'Erreur lors de l\'ajout d\'un nouvel accident' });
    }
  });

module.exports = router;
