const { createApp } = Vue;

createApp({
    data() {
        return {
            messaggio: 'Ciao, Mondo!',
            luceAccesa: false,
            kg: 0,
            nome: '',
            cognome: '',
            genere: '',
            paese: ''
        }
    },
    methods: {
        toggleLuce() {
            this.luceAccesa = !this.luceAccesa;
        }
    }   
}).mount('#app');
