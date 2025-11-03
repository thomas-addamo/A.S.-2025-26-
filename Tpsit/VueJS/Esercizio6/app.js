const { createApp } = Vue;

const app = createApp({
    data() {
        return {
            carrelloTotale: 0,
            prodotti: [
                { id: 1, nome: 'Mela', prezzo: 0.50 },
                { id: 2, nome: 'Banana', prezzo: 0.30 },
            ]
        }
    },
    methods: {
        aggiornaCarrello(prezzo) {
            this.carrelloTotale += prezzo;
        }
    }
});

app.component('prodotto-item', {
    props: {
        nome: String,
        prezzo: Number
    },
    // 1. Il figlio emette un evento quando il suo bottone viene cliccato
    //    e passa il prezzo come payload.
    template: `
      <div class="box">
        <span>{{ nome }} - {{ prezzo }} €</span>&nbsp;&nbsp;
        <button @click="$emit('aggiungi-al-carrello', prezzo)">
        Aggiungi
        </button>
      </div>
    `
});
app.mount('#app');
