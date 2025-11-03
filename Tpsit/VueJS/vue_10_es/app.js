const { createApp } = Vue;

const app = createApp({});

// Esercizio 1
app.component('saluto-utente', {
    template: `
      <div class="box">
        Benvenuto nella nostra applicazione!
      </div>
    `
});

// Esercizio 2
app.component('info-card', {
    template: `
      <div class="box" style="border-color: blue; margin-top: 10px;">
        <h3>Titolo della Card</h3>
        <p>Contenuto della card...</p>
      </div>
    `
});

app.mount('#app');
