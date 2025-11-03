const { createApp } = Vue;

const app = createApp({
    data() {
        return {
            posts: [
                { id: 1, title: 'Il mio viaggio in Italia', content: 'L\'Italia è bellissima...' },
                { id: 2, title: 'Imparare Vue.js', content: 'È più facile di quanto pensassi!' },
                { id: 3, title: 'Ricetta della Carbonara', content: 'Guanciale, pecorino, uova, pepe.' }
            ]
        }
    }
});

app.component('blog-post', {
    // 1. Dichiara le props che il componente si aspetta di ricevere
    props: {
        titolo: String,
        contenuto: String
    },
    // 2. Usa le props nel template come se fossero dati locali
    template: `
      <div class="box">
        <h3>{{ titolo }}</h3>
        <p>{{ contenuto }}</p>
      </div>
    `
});

app.mount('#app');
