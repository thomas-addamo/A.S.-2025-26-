var express = require('express');
var app = express();

const biscotti = [
    "La fortuna ti sorride.",
    "Un lungo viaggio ti attende.",
    "Grandi novità sono in arrivo per te.",
    "Segui il tuo cuore e non sbaglierai.",
    "Oggi è il tuo giorno fortunato.",
    "Credi in te stesso e tutto sarà possibile.",
    "Non mollare mai, la meta è vicina.",
    "L'amore è dietro l'angolo.",
    "Il successo nel lavoro è garantito.",
    "La pazienza è la chiave di ogni problema.",
    "Un vecchio amico ti sta pensando.",
    "Sorridi alla vita e la vita ti sorriderà.",
    "Il meglio deve ancora venire.",
    "Ascolta i consigli degli altri, ma decidi con la tua testa.",
    "È il momento giusto per fare quella scelta importante.",
    "Riceverai un regalo inaspettato.",
    "La felicità si trova nelle piccole cose.",
    "Sogna in grande, i limiti sono solo nella tua mente.",
    "Tutto andrà per il meglio.",
    "La saggezza illumina il tuo cammino."
];

const proverbi = [
    "Chi dorme non piglia pesci.",
    "Rosso di sera, bel tempo si spera.",
    "Chi fa da sé fa per tre.",
    "L'erba del vicino è sempre più verde.",
    "Chi la dura la vince.",
    "Meglio tardi che mai.",
    "A caval donato non si guarda in bocca.",
    "Tra il dire e il fare c'è di mezzo il mare.",
    "Ride bene chi ride ultimo.",
    "Can che abbaia non morde.",
    "Chi va piano va sano e va lontano.",
    "Patti chiari, amicizia lunga.",
    "Non tutto il male vien per nuocere.",
    "Chi troppo vuole nulla stringe.",
    "Chi trova un amico trova un tesoro.",
    "La gatta frettolosa fece i gattini ciechi.",
    "Chi semina vento raccoglie tempesta.",
    "L'abito non fa il monaco.",
    "Il lupo perde il pelo ma non il vizio.",
    "Finché c'è vita c'è speranza."
];

// Inizializza le statistiche per ogni frase
const statisticheBiscotti = {};
biscotti.forEach((frase, index) => {
    statisticheBiscotti[index] = { frase: frase, estrazioni: 0 };
});

const statisticheProverbi = {};
proverbi.forEach((frase, index) => {
    statisticheProverbi[index] = { frase: frase, estrazioni: 0 };
});

app.get('/', (req, res) => {
    res.send(`Benvenuto al server dei biscotti della fortuna e dei proverbi!
    
    Endpoint disponibili:
    - /biscotti - Ottieni un biscotto della fortuna casuale
    - /proverbi - Ottieni un proverbio casuale
    - /biscotti/statistiche - Visualizza le statistiche dei biscotti
    - /proverbi/statistiche - Visualizza le statistiche dei proverbi
    - /esporta/biscotti - Esporta i biscotti in JSON
    - /esporta/proverbi - Esporta i proverbi in JSON
    - /esporta/tutto - Esporta tutti i dati in JSON`);
});

app.get('/biscotti', (req, res) => {
    const indiceCasuale = Math.floor(Math.random() * biscotti.length);
    statisticheBiscotti[indiceCasuale].estrazioni++;
    res.send(biscotti[indiceCasuale]);
});

app.get('/proverbi', (req, res) => {
    const indiceCasuale = Math.floor(Math.random() * proverbi.length);
    statisticheProverbi[indiceCasuale].estrazioni++;
    res.send(proverbi[indiceCasuale]);
});

// Endpoint per visualizzare le statistiche dei biscotti
app.get('/biscotti/statistiche', (req, res) => {
    const stats = Object.values(statisticheBiscotti).sort((a, b) => b.estrazioni - a.estrazioni);
    res.json(stats);
});

// Endpoint per visualizzare le statistiche dei proverbi
app.get('/proverbi/statistiche', (req, res) => {
    const stats = Object.values(statisticheProverbi).sort((a, b) => b.estrazioni - a.estrazioni);
    res.json(stats);
});

// Endpoint per esportare i biscotti in JSON
app.get('/esporta/biscotti', (req, res) => {
    res.json({
        tipo: 'biscotti',
        frasi: biscotti,
        statistiche: statisticheBiscotti
    });
});

// Endpoint per esportare i proverbi in JSON
app.get('/esporta/proverbi', (req, res) => {
    res.json({
        tipo: 'proverbi',
        frasi: proverbi,
        statistiche: statisticheProverbi
    });
});

// Endpoint per esportare tutto in JSON
app.get('/esporta/tutto', (req, res) => {
    res.json({
        biscotti: {
            frasi: biscotti,
            statistiche: statisticheBiscotti
        },
        proverbi: {
            frasi: proverbi,
            statistiche: statisticheProverbi
        }
    });
});

app.listen(3000, () => {
    console.log('Server in ascolto sulla porta 3000');
});
