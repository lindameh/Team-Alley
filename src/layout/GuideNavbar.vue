<template>

  <navbar position="fixed" type="primary" menu-classes="ml-auto">
    <template>
      <router-link v-popover:popover1 class="navbar-brand" to="/">
        WELife
      </router-link>

    </template>
    <template v-if="loggedin" slot="navbar-menu">

      <router-link class="nav-link" to="/achievement">Achievement</router-link>
      <router-link class="nav-link" to="/form">Form</router-link>
      <router-link class="nav-link" to="/leaderboard">Leaderboard</router-link>
      <router-link class="nav-link" to="/sharing">Sharing</router-link>
      <router-link class="nav-link" to="/guide">User Guide</router-link>

      <drop-down
              tag="li"
              title="Profile"
              icon="now-ui-icons users_circle-08"
              class="nav-item"
      >
        <nav-link to="/profile">
          <i class="now-ui-icons users_single-02"></i> View Profile
        </nav-link>
        <nav-link to="/editdata">
          <i class="now-ui-icons education_paper"></i> Input/Modify Health Data
        </nav-link>
        <nav-link to="/editgoal">
          <i class="now-ui-icons education_paper"></i> Input/Modify Personal Goal
        </nav-link>
      </drop-down>

      <a class="nav-link" @click.prevent="logout"><i class="now-ui-icons ui-1_lock-circle-open"></i>Logout</a>
    </template>

    <template v-else slot="navbar-menu">
      <router-link class="nav-link" to="/signup">Sign Up</router-link>
      <router-link class="nav-link" to="/login">Login</router-link>
      <router-link class="nav-link" to="/guide">User Guide</router-link>
    </template>

  </navbar>
</template>

<script>
import { DropDown, Navbar, NavLink } from '@/components';
import { Popover } from 'element-ui';
import firebase from 'firebase';
import auth from "../firebase.js";

var loggedin;
auth.onAuthStateChanged(function (user) {
  if (user) {
    // User is signed in.
    loggedin = true;
  } else {
    loggedin = false
  }
});

export default {
  name: 'guide-navbar',
  components: {
    DropDown,
    Navbar,
    //NavbarToggleButton,
    NavLink,
    [Popover.name]: Popover
  },
  data() {
    return {
      loggedin: loggedin,
    };
  },
  methods: {
    logout() {
      console.log("logout");
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$router.replace({
            name: "login",
          });
        });
    },
  },
};
</script>

<style scoped></style>
