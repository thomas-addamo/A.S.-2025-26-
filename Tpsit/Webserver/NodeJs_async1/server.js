const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

// Middleware per processare i dati JSON inviati nei POST
app.use(express.json());

// 1. SERVIRE FILE STATICI
// Questo rende accessibile tutto ciò che è dentro la cartella "public"
// Se vai su http://localhost:3000/ vedrai index.html in automatico
app.use(express.static('public'));

// 2. ROTTA API SEMPLICE (GET)
app.get('/api/info', (req, res) => {
    res.json({ messaggio: "Benvenuto nelle API!", versione: "1.0.0" });
});

app.listen(PORT, () => {
    console.log(`Server in esecuzione su http://localhost:${PORT}`);
});

