const { createApp } = Vue;

createApp({
    data() {
        return {
           titolo: 'La mia Prima App Vue!',
           contatore: 0
        }
    }
}).mount('#app');

//document.getElementById('app')._vnode.component.proxy.contatore = 10
