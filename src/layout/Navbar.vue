<template>

  <navbar position="fixed" type="primary" menu-classes="ml-auto">
    <template>
      <router-link v-popover:popover1 class="navbar-brand" to="/">
        WELife
      </router-link>

    </template>
    <template slot="navbar-menu">
      <li class="nav-item">
        <a class="nav-link" href="#">Achievement <span class="sr-only">(current)</span></a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="#">Form</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="#">Leaderboard</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="#">Sharing</a>
      </li>
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
