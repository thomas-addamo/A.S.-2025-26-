const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
const PORT = 3000;

// Middleware per processare i dati
app.use(express.json());
// NECESSARIO per leggere i dati inviati dai form HTML standard
app.use(express.urlencoded({ extended: true }));

// 1. SERVIRE FILE STATICI
app.use(express.static('public'));

// 2. ROTTA API (POST)
app.post('/post', (req, res) => {
    const newPost = {
        name: req.body.name,
        message: req.body.message,
        date: new Date().toLocaleString()
    };
    
    console.log("Dati ricevuti:", newPost);
    
    const data = fs.readFileSync('post.json', 'utf8');
    const posts = JSON.parse(data || '[]');
    
    posts.push(newPost);
    
    fs.writeFileSync('post.json', JSON.stringify(posts, null, 2));
    res.send("<h1>Dati ricevuti con successo!</h1><p>Il tuo post è stato salvato.</p><a href='/'>Torna alla home</a>");
});

app.listen(PORT, () => {
    console.log(`Server in esecuzione su http://localhost:${PORT}`);
});

