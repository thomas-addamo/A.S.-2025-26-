const { createApp } = Vue;

createApp({
    data() {
        return {
            listaSpesa: ['Latte', 'Uova', 'Pane', 'Mele','Spaghetti'],
            studenti: [
                { id: 101, nome: 'Alice' },
                { id: 102, nome: 'Bob' },
                { id: 103, nome: 'Charlie' }
            ]
        }
    }
}).mount('#app');
