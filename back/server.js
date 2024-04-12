const { Pool } = require('pg');
const express = require('express');
const app = express();

// Configuration de la connexion à la base de données PostgreSQL
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'Rosa',
  password: 'Efkkas14',
  port: '5432', // Par défaut: 5432
});


app.listen(3000, () => {
  console.log('Serveur Express en cours d\'écoute sur le port 3000');
});

// Route pour récupérer les données d'accident
app.get('/accidents', async (req, res) => {
  try {
    // Exécute une requête SQL pour sélectionner toutes les données d'accident
    const result = await pool.query('SELECT * FROM public.accident LIMIT 100');

    // Renvoie les données d'accident en réponse
    res.status(200).json(result.rows);
  } catch (error) {
    // En cas d'erreur, renvoie un message d'erreur en réponse
    console.error('Erreur lors de la récupération des données d\'accident:', error);
    res.status(500).json({ message: 'Erreur lors de la récupération des données d\'accident' });
  }
});