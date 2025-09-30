const { createApp } = Vue;

createApp({
    data() {
        return {
            nome: 'Thomas',
            cognome: 'Addamo',
            citta: 'Nichelino',
            nomeProdotto: 'iPhone 17 Pro',
            prezzo: 1399.99,
            immagineDisabilitata: true,
            title: 'Passa qui il mouse per vedere il tooltip dinamico',
            messaggioTooltip: 'Che figata Vue JS'
        }
    }
}).mount('#app');
