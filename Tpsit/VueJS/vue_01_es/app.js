const { createApp } = Vue;

createApp({
    data() {
        return {
            // Dati Esercizio 1
            nome: "Mario",
            cognome: "Rossi",
            citta: "Roma",
            // Dati Esercizio 2
            nomeProdotto: "Smartphone XYZ",
            prezzoProdotto: 299.99
        }
    }
}).mount('#app');
