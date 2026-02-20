const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
const PORT = 3000;

const DATA_FILE = path.join(__dirname, 'contatti.json');

// Middleware per processare i dati JSON inviati nei POST
app.use(express.json());
app.use(express.static('public'));

// Funzione helper per leggere i contatti dal file
function readContatti() {
    if (!fs.existsSync(DATA_FILE)) {
        fs.writeFileSync(DATA_FILE, JSON.stringify([]));
    }
    const data = fs.readFileSync(DATA_FILE, 'utf8');
    return JSON.parse(data);
}

// Funzione helper per scrivere i contatti nel file
function writeContatti(contatti) {
    fs.writeFileSync(DATA_FILE, JSON.stringify(contatti, null, 2));
}

// 1. OTTENERE TUTTI I CONTATTI
app.get('/api/contatti', (req, res) => {
    res.json(readContatti());
});

// 2. AGGIUNGERE UN CONTATTO
app.post('/api/contatti', (req, res) => {
    const contatti = readContatti();
    const nuovoContatto = {
        id: Date.now().toString(),
        nome: req.body.nome,
        cognome: req.body.cognome,
        telefono: req.body.telefono,
        email: req.body.email
    };
    contatti.push(nuovoContatto);
    writeContatti(contatti);
    res.json(nuovoContatto);
});

// 3. MODIFICARE UN CONTATTO
app.put('/api/contatti/:id', (req, res) => {
    const contatti = readContatti();
    const index = contatti.findIndex(c => c.id === req.params.id);
    if (index !== -1) {
        contatti[index] = { ...contatti[index], ...req.body };
        writeContatti(contatti);
        res.json(contatti[index]);
    } else {
        res.status(404).json({ error: "Contatto non trovato" });
    }
});

// 4. ELIMINARE UN CONTATTO
app.delete('/api/contatti/:id', (req, res) => {
    let contatti = readContatti();
    contatti = contatti.filter(c => c.id !== req.params.id);
    writeContatti(contatti);
    res.json({ success: true });
});

app.listen(PORT, () => {
    console.log(`Server in esecuzione su http://localhost:${PORT}`);
});


