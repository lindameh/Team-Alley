<template>

  <navbar position="fixed" type="primary" menu-classes="ml-auto">
    <template v-if="user">
      <router-link v-popover:popover1 class="navbar-brand" to="/home">
        WELIFE
      </router-link>

    </template>
    <template v-else>
      <router-link v-popover:popover1 class="navbar-brand" to="/">
        WELIFE
      </router-link>

    </template>

    <template v-if="user" slot="navbar-menu">

      <router-link class="nav-link" to="/achievement">Achievement</router-link>
      <router-link class="nav-link" to="/form">Form</router-link>
      <router-link class="nav-link" to="/leaderboard">Leaderboard</router-link>
      <router-link class="nav-link" to="/sharing">Sharing</router-link>
      <router-link class="nav-link" to="/guide">User Guide</router-link>

      <drop-down
        tag="li"
        title="Profile"
        icon="now-ui-icons users_circle-08"
      >
        <router-link class="nav-link" style="color: black" to="/profile">
          <i class="now-ui-icons users_single-02"></i> View Profile
        </router-link>
        <a class="nav-link" style="color: black" @click.prevent="logout">
          <i class="now-ui-icons ui-1_lock-circle-open"></i> Logout
        </a>
        <!--<nav-link to="/editdata">
          <i class="now-ui-icons education_paper"></i> Input/Modify Health Data
        </nav-link>
        <nav-link to="/editgoal">
          <i class="now-ui-icons education_paper"></i> Input/Modify Personal Goal
        </nav-link>-->
      </drop-down>
    </template>

    <template v-else slot="navbar-menu">
      <router-link class="nav-link" to="/signup">Sign Up</router-link>
      <router-link class="nav-link" to="/login">Login</router-link>
      <router-link class="nav-link" to="/guide">User Guide</router-link>
    </template>

  </navbar>
</template>

<script>
import { DropDown, Navbar} from '@/components';
import { Popover } from 'element-ui';
import firebase from 'firebase';
import auth from "../firebase.js";

export default {
  name: 'guide-navbar',
  components: {
    DropDown,
    Navbar,
    [Popover.name]: Popover
  },
  computed: {
    user() {
      return auth.currentUser;
    },
  },
  methods: {
    logout() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          console.log("logout successfully");
          this.$router.replace({
            name: "login",
          });
        });
    },
  },
};
</script>

<style scoped></style>
