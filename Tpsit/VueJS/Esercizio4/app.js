const { createApp } = Vue;

createApp({
    data() {
        return {
            yearOfBirth: null,
            eta: 0
        }
    },
    computed: {
        messaggioEta() {
            // Ritorna il messaggio in base all'età calcolata
            return this.eta >= 18 ? 'Maggiorenne' : 'Minorenne';
        }
    },
    methods: {
        calculateAge() {
            const currentYear = new Date().getFullYear();
            const birth = parseInt(this.yearOfBirth, 10);

            // Validazione semplice dell'anno di nascita
            if (!birth || birth > currentYear || birth < 1900) {
                this.eta = 0;
                return;
            }

            this.eta = currentYear - birth;
        }
    }
}).mount('#app');
