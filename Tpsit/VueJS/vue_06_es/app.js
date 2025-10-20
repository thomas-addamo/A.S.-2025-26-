const { createApp } = Vue;

createApp({
    data() {
        return {
            // Dati Esercizio 1
            kg: 0,
            // Dati Esercizio 2
            form: {
                nome: '',
                genere: 'Uomo',
                paese: 'Italia'
            }
        }
    }
}).mount('#app');
