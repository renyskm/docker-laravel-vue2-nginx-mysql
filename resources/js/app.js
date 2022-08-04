require('./bootstrap');

window.Vue = require('vue');

Vue.component('app-component', require('./components/App.vue').default);

var app = new Vue({
    el: '#app',
    data: {
        message: 'Hello vue.js!'
    },
});
