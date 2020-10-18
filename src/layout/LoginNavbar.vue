<template>

  <navbar position="fixed" type="primary" menu-classes="ml-auto">
    <template>
      <router-link v-popover:popover1 class="navbar-brand" to="/">
        WELife
      </router-link>

    </template>
    <template slot="navbar-menu">
      <router-link class="nav-link" to="/signup">Sign Up</router-link>
      <router-link class="nav-link" to="/guide">User Guide</router-link>
    </template>
  </navbar>
</template>

<script>
import { Navbar } from '@/components';
import { Popover } from 'element-ui';

export default {
  name: 'main-navbar',
  components: {
    Navbar,
    //NavbarToggleButton,
    [Popover.name]: Popover
  }
};
</script>

<style scoped></style>
