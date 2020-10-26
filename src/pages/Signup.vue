<template>
  <div class="page-header clear-filter" filter-color="white">
    <parallax
      class="page-header-image"
      style="background-image: url('img/running1.jpg')"
    >
    </parallax>

    <div class="content">
      <card type="login" plain>
        <div slot="header" class="logo-container">
          <img v-lazy="'img/WELIFE_icon.png'" alt="" />
        </div>
        <div v-if="error" class="alert alert-danger">{{ error }}</div>
        <form action="#" @submit.prevent="signup">
          <div class="form-group">
            <input
              name="email"
              type="email"
              class="form-control"
              placeholder="Email"
              required
              v-model="email"
            />
          </div>
          <div class="form-group">
            <input
              name="password"
              type="password"
              class="form-control"
              placeholder="Password"
              v-model="password"
              required
            />
          </div>

          <button
            type="submit"
            class="btn btn-primary btn-round btn-lg btn-block"
          >
            Sign Up
          </button>
        </form>
      </card>
    </div>
  </div>
</template>
<script>
import { Card, Button, FormGroupInput } from "@/components";
import firebase from "firebase";
export default {
  name: "signup",
  bodyClass: "login-page",
  components: {
    Card,
    [Button.name]: Button,
    [FormGroupInput.name]: FormGroupInput,
  },
  data() {
    return {
      email: "",
      password: "",
      error: null,
    };
  },
  methods: {
    signup() {
      console.log("signup");
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.email, this.password)
        .then((data) => {
          this.$router.replace({ name: "login" });
        })
        .catch((err) => {
          this.error = err.message;
        });
    },
  },
};
</script>
<style scoped>
.form-control {
  height: 50px;
}
</style>


