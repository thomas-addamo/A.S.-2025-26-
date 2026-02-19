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
        date: new Date().toLocaleString(),
        image: req.body.image,
        description: req.body.description
    };
    
    console.log("Dati ricevuti:", newPost);
    
    const data = fs.readFileSync('post.json', 'utf8');
    const posts = JSON.parse(data || '[]');
    
    posts.push(newPost);
    
    fs.writeFileSync('post.json', JSON.stringify(posts, null, 2));
    res.send("<h1>Dati ricevuti con successo!</h1><p>Il tuo post è stato salvato.</p><a href='/'>Torna alla home</a> - <a href='/postGallery'>Vai alla galleria</a>");
});

app.get('/postGallery', (req, res) => {
    const data = fs.readFileSync('post.json', 'utf8');
    const posts = JSON.parse(data || '[]');
    
    let html = "<h1>Galleria Post</h1>";
    posts.forEach(post => {
        html += `
            <div style="border: 1px solid black; margin: 10px; padding: 10px;">
                <h2>${post.name}</h2>
                <img src="${post.image}" alt="${post.description}" width="300">
                <p><strong>Descrizione:</strong> ${post.description}</p>
                <p><strong>Messaggio:</strong> ${post.message}</p>
                <small>${post.date}</small>
            </div>
        `;
    });
    html += "<br><a href='/'>Torna alla home</a>";
    res.send(html);
});

app.listen(PORT, () => {
    console.log(`Server in esecuzione su http://localhost:${PORT}`);
});

