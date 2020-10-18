import Vue from 'vue';
import Router from 'vue-router';
import Starter from './pages/StarterPage.vue';
import StarterNavbar from './layout/StarterNavbar.vue';
import Navbar from './layout/Navbar.vue';
import StarterFooter from './layout/StarterFooter.vue';
import Signup from './pages/Signup.vue';
import Profile from './pages/Profile.vue'
import SignupNavbar from './layout/SignupNavbar.vue';
import LoginNavbar from './layout/LoginNavbar.vue';
import Login from './pages/Login.vue';
import Guide from './pages/Guide.vue';
import Form from './pages/Form.vue'

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      components: {default: Starter, header: StarterNavbar, footer: StarterFooter},
      props: {
        header: { colorOnScroll: 400 },
        footer: { backgroundColor: 'black' }
      }
    },
    {
      path: '/profile',
      name: 'profile',
      components: {default: Profile, header: Navbar, footer: StarterFooter},
      props: {
        header: { colorOnScroll: 400 },
        footer: { backgroundColor: 'black' }
      }
    },
    {
      path: '/signup',
      name: 'signup',
      components: {default: Signup, header: SignupNavbar, footer: StarterFooter},
      props: {
        header: { colorOnScroll: 400 },
        footer: { backgroundColor: 'black' }
      }
    },
    {
      path: '/login',
      name: 'login',
      components: {default: Login, header: LoginNavbar, footer: StarterFooter},
      props: {
        header: { colorOnScroll: 400 },
        footer: { backgroundColor: 'black' }
      }
    },
    {
      path: '/guide',
      name: 'guide',
      components: {default: Guide, header: LoginNavbar, footer: StarterFooter},
      props: {
        header: { colorOnScroll: 400 },
        footer: { backgroundColor: 'black' }
      }
    },
    {
      path: '/form',
      name: 'form',
      components: {default: Form, header: Navbar, footer: StarterFooter},
      props: {
        header: { colorOnScroll: 400 },
        footer: { backgroundColor: 'black' }
    }
  }
  ],
  scrollBehavior: to => {
    if (to.hash) {
      return { selector: to.hash };
    } else {
      return { x: 0, y: 0 };
    }
  }
});
