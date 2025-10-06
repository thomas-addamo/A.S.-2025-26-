const { createApp } = Vue;

createApp({
    data() {
        return {
            nome: 'Thomas',
            cognome: 'Addamo',
            isLoggedIn: true,
            coloreSemaforo: "rosso",
            favouriteTeam: ["Juventus", "Roma", "Inter"],
            prodotti: [
                {id: "301", nome: "Penna", prezzo: 3.50},
                {id: "302", nome: "iPhone", prezzo: 1399.99},
                {id: "302", nome: "MacBook", prezzo: 2499.99},
                {id: "303", nome: "Cavo HDMI", prezzo: 8.99},
            ]
        }
    }
}).mount('#app');
