const { createApp } = Vue;

const app = createApp({
    data() {
        return {
            // Dati Esercizio 1
            prodotti: [
                { id: 1, nome: 'Cuffie Wireless', prezzo: 59.99 },
                { id: 2, nome: 'Mouse Ergonomico', prezzo: 24.50 }
            ]
        }
    }
});

// Esercizio 1
app.component('product-card', {
    props: {
        nomeProdotto: String,
        prezzo: Number
    },
    template: `
      <div class="box">
        <h4>{{ nomeProdotto }}</h4>
        <p>Prezzo: {{ prezzo }} €</p>
      </div>
    `
});

// Esercizio 2
app.component('alert-box', {
    props: {
        messaggio: String,
        tipo: String
    },
    template: `
      <div class="box" :class="tipo">
        <p>{{ messaggio }}</p>
      </div>
    `
});
app.mount('#app');
