const { createApp } = Vue;

createApp({
    data() {
        return {
            // Dati Esercizio 1
            messaggio: 'Questo è il messaggio iniziale.',
            // Dati Esercizio 2
            luceAccesa: false
        }
    },
    methods: {
        cambiaTesto() {
            this.messaggio = 'Hai cliccato il bottone!';
        },
        toggleLuce() {
            this.luceAccesa = !this.luceAccesa;
        }
    }
}).mount('#app');

