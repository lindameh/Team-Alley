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
import Login from './pages/Login.vue'
import Guide from './pages/Guide.vue'
import Leaderboard from './pages/Leaderboard.vue'
import Achievement from './pages/Achievement.vue'
import Form from './pages/Form.vue'
import editdata from './pages/editdata.vue'
import editgoal from './pages/editgoal.vue'
import Sharing from './pages/Sharing.vue'
import NewPost from './pages/NewPost.vue'
import SharingPost from './pages/SharingPost-component.vue'

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
      path: '/leaderboard',
      name: 'leaderboard',
      components: {default: Leaderboard, header: Navbar, footer: StarterFooter},
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
      path: '/achievement',
      name: 'achievement',
      components: {default: Achievement, header: Navbar, footer: StarterFooter},
      props: {
        header: { colorOnScroll: 400 },
        footer: { backgroundColor: 'black' }
      }
    },

    {
      path: '/guide',
      name: 'guide',
      components: {default: Guide, header: Navbar, footer: StarterFooter},
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
    },

    {
      path: '/editdata',
      name: 'editdata',
      components: {default: editdata, header: Navbar, footer: StarterFooter},
      props: {
        header: { colorOnScroll: 400 },
        footer: { backgroundColor: 'black' }
      }
    },

    {
      path: '/editgoal',
      name: 'editgoal',
      components: {default: editgoal, header: Navbar, footer: StarterFooter},
      props: {
        header: { colorOnScroll: 400 },
        footer: { backgroundColor: 'black' }
      }
    },

    {
      path: '/sharing',
      name: 'sharing',
      components: {default: Sharing, header: Navbar, footer: StarterFooter},
      props: {
        header: { colorOnScroll: 400 },
        footer: { backgroundColor: 'black' }
      }
    },

    {
      path: '/newpost',
      name: 'newpost',
      components: {default: NewPost, header: Navbar, footer: StarterFooter},
      props: {
        header: { colorOnScroll: 400 },
        footer: { backgroundColor: 'black' }
      }
    },

    {
      path: '/post/:id',
      name: 'post-body-page',
      components: {default: SharingPost, header: Navbar, footer: StarterFooter},
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
