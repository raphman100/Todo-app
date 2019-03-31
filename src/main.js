import Vue from "vue";

import Buefy from "buefy";
import "buefy/dist/buefy.css";

import "vue-awesome/icons";
import Icon from "vue-awesome/components/Icon.vue";


import App from "./App.vue";
import router from "./router/router";
import store from "./store/store";

Vue.use( Buefy );
Vue.component( 'icon', Icon );

Vue.config.productionTip = false;

new Vue( {
    router,
    store,
    render: ( h ) => h( App )
} ).$mount( '#app' );
