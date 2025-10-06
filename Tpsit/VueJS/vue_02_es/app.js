const { createApp } = Vue;

createApp({
    data() {
        return {
            // Dati Esercizio 1
            pulsanteDisabilitato: true,
            // Dati Esercizio 2
            messaggioTooltip: 'Questo è un messaggio segreto!'
        }
    }
}).mount('#app');
