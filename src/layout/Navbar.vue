<template>

  <navbar position="fixed" type="primary" menu-classes="ml-auto">
    <template>
      <router-link v-popover:popover1 class="navbar-brand" to="/">
        WELife
      </router-link>

    </template>
    <template slot="navbar-menu">

      <router-link class="nav-link" to="/">Achievement</router-link>
      <router-link class="nav-link" to="/">Form</router-link>
      <router-link class="nav-link" to="/">Leaderboard</router-link>
      <router-link class="nav-link" to="/">Sharing</router-link>

      <drop-down
              tag="li"
              title="Profile"
              icon="now-ui-icons users_circle-08"
              class="nav-item"
      >
        <nav-link to="/landing">
          <i class="now-ui-icons users_single-02"></i> View Profile
        </nav-link>
        <nav-link to="/login">
          <i class="now-ui-icons education_paper"></i> Input/Modify Health Data
        </nav-link>
        <nav-link to="/profile">
          <i class="now-ui-icons education_paper"></i> Input/Modify Personal Goal
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
