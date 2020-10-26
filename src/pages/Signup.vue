<template>
  <div class="starter-page">
    <div class="page-header clear-filter" filter-color="white">
      <parallax
        class="page-header-image"
        style="background-image: url('img/running1.jpg')"
      >
      </parallax>

      <div class="content">
      <div class="container">
        <div class="col-md-5 ml-auto mr-auto">
          <card type="login" plain>
            <div slot="header" class="logo-container">
              <img v-lazy="'img/WELIFE_icon.png'" alt="" />
            </div>

            <fg-input
              class="no-border input-lg"
              addon-left-icon="now-ui-icons users_circle-08"
              placeholder="Email"
            >
            </fg-input>

            <fg-input
              class="no-border input-lg"
              addon-left-icon="now-ui-icons text_caps-small"
              placeholder="Password"
            >
            </fg-input>

            <template slot="raw-content">
              <div class="card-footer text-center">
                <router-link
                  class="btn btn-primary btn-round btn-lg btn-block nav-link"
                  to="/login"
                  >Sign Up</router-link
                >
              </div>
            </template>
          </card>
        </div>
      </div>
    </div>

    </div>
  </div>
</template>
<script>

import { Card, Button, FormGroupInput } from '@/components';
export default {
  name: 'signup',
  bodyClass: 'login-page',
  components: {
    Card,
    [Button.name]: Button,
    [FormGroupInput.name]: FormGroupInput
  }
};
</script>
<style>
.starter-page {
  min-height: calc(100vh - 95px);
}
</style>


