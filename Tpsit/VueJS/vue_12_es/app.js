const { createApp } = Vue;

const app = createApp({
    data() {
        return {
            // Dati Esercizio 1
            modaleAperta: true,
            // Dati Esercizio 2
            valutazioneCorrente: 0
        }
    },
    methods: {
        chiudiLaModale() {
            this.modaleAperta = false;
        },
        impostaLaValutazione(val) {
            this.valutazioneCorrente = val;
        }
    }
});
// Esercizio 1
app.component('modal-dialog', {
    template: `
      <div class="box" style="position: fixed; top: 20%; left: 30%; width: 40%; background: white; border: 2px solid black;">
        <h3>Questa è una modale</h3>
        <p>Clicca per chiudere.</p>
        <button @click="$emit('chiudi')">Chiudi</button>
      </div>
    `
});
// Esercizio 2
app.component('star-rating', {
    template: `
      <div>
        <button v-for="n in 5" :key="n" @click="$emit('imposta-valutazione', n)">
          ★
        </button>
      </div>
    `
});
app.mount('#app');
