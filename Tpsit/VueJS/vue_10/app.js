const { createApp } = Vue;

const app = createApp({
    data() {
        return {
            // Dati dell'app principale
        }
    }
});

// === REGISTRAZIONE COMPONENTE GLOBALE ===
app.component('contatore-bottone', {
    /* * I dati in un componente DEVONO essere una funzione 
     * per garantire che ogni istanza abbia il suo stato unico.
     */
    data() {
        return {
            conteggio: 0
        }
    },
    // Il template del componente
    template: `
      <button @click="conteggio++">
        Mi hai cliccato {{ conteggio }} volte.
      </button>
    `
});
// =========================================

app.mount('#app');
