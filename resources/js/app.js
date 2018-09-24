
/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');

window.Vue = require('vue');
import moment from 'moment';
import VueProgressBar from 'vue-progressbar';
import { Form, HasError, AlertError } from 'vform';
import swal from 'sweetalert2';
window.swal = require('sweetalert2');
window.Form = Form;
Vue.component(HasError.name, HasError)
Vue.component(AlertError.name, AlertError)
import VueRouter from 'vue-router'
Vue.use(VueRouter)
let routes = [
    { path: '/dashbord', component: require('./components/DashbordComponent')},
    { path: '/profile', component: require('./components/profileComponent') },
    { path: '/user-add', component: require('./components/userAddComponent') },
    { path: '/user-display', component: require('./components/usersDisplayComponent') },
]
const router = new VueRouter({
    mode: 'history',
    routes // short for `routes: routes`
})
Vue.filter('capText', function (text) {
    return text.charAt(0).toUpperCase() + text.slice(1)
});
Vue.filter('created_moment', function(created){
    moment.locale('fr');
    return moment(created).startOf('day').fromNow();
});
Vue.use(VueProgressBar, {
    color: 'rgb(143, 255, 199)',
    failedColor: 'red',
    height: '4px'
});
const toast = swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 4000
});
window.toast = toast;
window.Fire = new Vue();
/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

Vue.component('example-component', require('./components/ExampleComponent.vue'));

const app = new Vue({
    el: '#app',
    router
});
