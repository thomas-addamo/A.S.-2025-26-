const { createApp } = Vue;

createApp({
    data() {
        return {
            year: 0,
            carrello : [
                {nome: "Penna", prezzo: 1.5},
                {nome: "Quaderno", prezzo: 3.0},
                {nome: "Zaino", prezzo: 25.0},
                {nome: "Calcolatrice", prezzo: 15.0}
            ],
            username: "",
            mostramessaggioErrore: false,
            messaggioErrore: "Errore: il nome utente deve essere di almeno 5 caratteri.",

            testoArea: "",
            risposta: ""
        }
    },

    watch: {
        username(newValue) {
            if (newValue && newValue.length < 5) {
                this.mostramessaggioErrore = true;
            } else {
                this.mostramessaggioErrore = false;
            }
        },

        testoArea(newValue) {
            this.getrisposta();
        },
    },

    methods: {
        calcoloEta() {
            if (this.year >= 18) {
                return "Sei maggiorenne.";
            } else if (this.year < 18 && this.year > 0) {
                return "Sei minorenne.";
            } else {
                return "Errore: inserisci un'età valida.";
            }
        },

        calcolaPrezzo() {
            let totale = 0;
            for (let item of this.carrello) {
                totale += item.prezzo;
            }
            return totale;
        },

        getrisposta() {
            this.risposta = "Sto salvando il testo...";
            setTimeout(() => {
                this.risposta = "Testo salvato con successo!";
            }, 2000);
        }
    }
}).mount('#app');
