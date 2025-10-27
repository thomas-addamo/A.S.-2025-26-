const { createApp } = Vue;

createApp({
    data() {
        return {
            isError: false,
            isSuccess: false,
            coloreAvatar: '#ff0000',
            dimensioneAvatar: 50,
            larghezza: 50
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
        }
    }
}).mount('#app');
