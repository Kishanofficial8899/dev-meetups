import Vue from 'vue';
import App from './App.vue';
import router from './router';
import vuetify from './plugins/vuetify';
import 'roboto-fontface/css/roboto/roboto-fontface.css';
import '@mdi/font/css/materialdesignicons.css';
import { store } from './store';
import DateFilter from './Filter/Date';
import * as Firebase from 'firebase';

//Edit-meeetup Dialog Component
import EditMeetupComponent from './components/Meetup/Edit/EditMeetupDialog.vue';
import EditMeetupDateComponent from './components/Meetup/Edit/EditMeetupDateDialog.vue';
import EditMeetupTimeComponent from './components/Meetup/Edit/EditMeetupTimeDialog.vue';

//RegisterMeetup Dailog component
import RegisterMeetupComponent from './components/Meetup/Register/RegisterMeetupDialog.vue';

//Alert
import AlertComponent from './components/shared/Alert.vue';

Vue.config.productionTip = false;
Vue.filter('date', DateFilter);
Vue.component('app-alert', AlertComponent);
Vue.component('app-edit-meetup-details-dialog', EditMeetupComponent);
Vue.component('app-edit-meetup-date-dialog', EditMeetupDateComponent);
Vue.component('app-edit-meetup-time-dialog', EditMeetupTimeComponent);
Vue.component('app-register-meetup-dialog', RegisterMeetupComponent);

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
  created() {
    Firebase.initializeApp({
      apiKey: 'AIzaSyBsN5XNnc34cNxxzUMDcbJsi8chGcw86dQ',
      authDomain: 'dev-meetup-95299.firebaseapp.com',
      databaseURL: 'https://dev-meetup-95299.firebaseio.com',
      projectId: 'dev-meetup-95299',
      storageBucket: 'dev-meetup-95299.appspot.com',
      messagingSenderId: '379068013975',
      appId: '1:379068013975:web:6dc979bacf7c99533e38d2',
    });
    Firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.$store.dispatch('autoSignIn', user);
        this.$store.dispatch('fetchUserData', user);
      }
    });
    this.$store.dispatch('loadMeetups');
  },
}).$mount('#app');
