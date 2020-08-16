import Vue from 'vue';
import VueRouter from 'vue-router';

//All the Pages
import Home from '@/components/Home.vue';
import Meetups from '../components/Meetup/Meetups.vue';
import CreateMeetup from '../components/Meetup/CreateMeetup.vue';
import Profile from '../components/Users/Profile.vue';
import Signin from '../components/Users/SignIn.vue';
import SignUp from '../components/Users/SignUp.vue';
import Meetup from '../components/Meetup/Meetup.vue';
import AuthGuard from './auth-guard';
import PageNotFound from '../components/Pages/404.vue'

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/meetups',
    name: 'Meetups',
    component: Meetups,
  },
  {
    path: '/meetup/new',
    name: 'CreateMeetup',
    component: CreateMeetup,
  },
  {
    path: '/meetups/:id',
    name: 'Meetup',
    props: true,
    component: Meetup,
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile,
    beforeEnter: AuthGuard,
  },
  {
    path: '/singup',
    name: 'Signup',
    component: SignUp,
  },
  {
    path: '/signin',
    name: 'Signin',
    component: Signin,
  },
  {
    path: "*",
    name: "Page Not Found",
    component: PageNotFound
  }

];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
