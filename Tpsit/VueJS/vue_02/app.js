const { createApp } = Vue;

createApp({
    data() {
        return {
            urlImmagine: 'https://vuejs.org/images/logo.png',
            urlSitoUfficiale: 'https://vuejs.org/',
            classeCss: 'box'        
        }
    }
}).mount('#app');

