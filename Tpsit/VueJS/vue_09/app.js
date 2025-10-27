const { createApp } = Vue;

createApp({
    data() {
        return {
            isActive: true,
            hasError: false,
            coloreAttivo: '#333333',
            dimensioneFont: 16
        }
    }
}).mount('#app');
