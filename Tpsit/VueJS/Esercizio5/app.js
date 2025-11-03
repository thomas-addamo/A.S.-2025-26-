const { createApp } = Vue;

createApp({
    data() {
        return {
            isError: false,
            isSuccess: false,
            coloreAvatar: '#ff0000',
            dimensioneAvatar: 50,
            larghezza: 50,
            nomeUtente: '',
            messaggioSaluto: ''
        }
    },
    components: {
        'info-card': {
            template: `
                <div class="box">
                    <h3>Titolo della Card</h3>
                    <p>Contenuto della card...</p>
                </div>
            `
        },
        'saluto-utente': {
            template: `
                <div class="box">
                    <p>Benvenuto nella nostra applicazione</p>
                </div>
            `
        }
    },
    methods: {
        messaggioErrore() {
            this.isError = true;
            this.isSuccess = false;
        },
        messaggioSuccesso() {
            this.isSuccess = true;
            this.isError = false;
        },
        salutaUtente() {
            if (this.nomeUtente.trim() !== '') {
                this.messaggioSaluto = `Ciao, ${this.nomeUtente}! Benvenuto!`;
            } else {
                this.messaggioSaluto = 'Per favore, inserisci il tuo nome.';
            }
        }
    }
}).mount('#app');
