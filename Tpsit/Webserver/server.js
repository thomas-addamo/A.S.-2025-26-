var http = require('http');

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

const server = http.createServer((req, res) => {
    // Imposta l'header per rispondere con testo semplice utf-8 (per le lettere accentate)
    res.setHeader('Content-Type', 'text/plain; charset=utf-8');

    if (req.url === '/cookie') {
        const fraseCasuale = biscotti[Math.floor(Math.random() * biscotti.length)];
        res.writeHead(200);
        res.end(fraseCasuale);
    } else if (req.url === '/proverbi') {
        const proverbioCasuale = proverbi[Math.floor(Math.random() * proverbi.length)];
        res.writeHead(200);
        res.end(proverbioCasuale);
    } else {
        res.writeHead(404);
        res.end("Errore 404: Indirizzo non trovato (usa /cookie o /proverbi)");
    }
});

const port = 3000;
server.listen(port, () => {
    console.log(`Server in ascolto sulla porta ${port}`);
    console.log(`Prova: http://localhost:${port}/cookie`);
    console.log(`Prova: http://localhost:${port}/proverbi`);
});
