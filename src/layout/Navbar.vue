<template>

  <navbar position="fixed" type="primary" menu-classes="ml-auto">
    <template>
      <router-link v-popover:popover1 class="navbar-brand" to="/">
        WELife
      </router-link>

    </template>
    <template slot="navbar-menu">

      <router-link class="nav-link" to="/achievement">Achievement</router-link>
      <router-link class="nav-link" to="/form">Form</router-link>
      <router-link class="nav-link" to="/leaderboard">Leaderboard</router-link>
      <router-link class="nav-link" to="/sharing">Sharing</router-link>

      <drop-down
              tag="li"
              title="Profile"
              icon="now-ui-icons users_circle-08"
              class="nav-item"
      >
        <nav-link to="/profile">
          <i class="now-ui-icons users_single-02"></i> View Profile
        </nav-link>
        <nav-link to="/">
          <i class="now-ui-icons education_paper"></i> Input/Modify Health Data
        </nav-link>
        <nav-link to="/">
          <i class="now-ui-icons education_paper"></i> Input/Modify Personal Goal
        </nav-link>
        <nav-link to="/">
          <i class="now-ui-icons ui-1_lock-circle-open"></i> Logout
        </nav-link>
      </drop-down>
    </template>
  </navbar>
</template>

<script>
import { DropDown, Navbar, NavLink } from '@/components';
import { Popover } from 'element-ui';

export default {
  name: 'main-navbar',
  components: {
    DropDown,
    Navbar,
    //NavbarToggleButton,
    NavLink,
    [Popover.name]: Popover
  }
};
</script>

<style scoped></style>
