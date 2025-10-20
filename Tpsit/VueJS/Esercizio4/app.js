const { createApp } = Vue;

createApp({
    data() {
        return {
            age: 0,
            carrello: [
                {nome: 'Penna', prezzo: 3.5},
                {nome: 'Zaino', prezzo: 25},
                {nome: 'iPhone 17 Pro', prezzo: 1399.90},
                {nome: 'Apple Watch', prezzo: 399}
            ]
        }
    },
    methods: {
        toggleLuce() {
            this.luceAccesa = !this.luceAccesa;
        }
    }   
}).mount('#app');
