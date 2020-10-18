<template>

  <navbar position="fixed" type="primary" menu-classes="ml-auto">
    <template>
      <router-link v-popover:popover1 class="navbar-brand" to="/">
        WELife
      </router-link>

    </template>
    <template slot="navbar-menu">
      <li class="nav-item">
        <a class="nav-link" href="#">Login</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="#">User Guide</a>
      </li>
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
