<template>
  <div>
    <div class="page-header clear-filter" filter-color="orange">
      <div
        class="page-header-image"
        style="background-image: url('img/bg5.jpg')"
        v-bind:style="(height = '100px')"
      ></div>
      <div class="container">
        <div class="photo-container">
          <img src="img/ryan.jpg" alt="" />
        </div>
        <h3 class="title">{{ name }}</h3>
        <a href="/editprofile">Edit Profile Picture</a>
      </div>
    </div>
    <div class="section">
      <div class="container">
        <div class="button-container">
          <a href="#button" class="btn btn-primary btn-round btn-lg">Follow</a>
        </div>
        <h3 class="title">My Goals</h3>
        <h5 class="description">
          <ol>
            <li>Lose Weight</li>
            <li>Limit Calorie Intake</li>
            <li>Exercise More</li>
          </ol>
        </h5>
        <h3 class="title">Security</h3>
        <h5 class="description">
          <a href="/password">Change Password</a>
        </h5>
        <h3 class="title">Data</h3>
        <h5 class="description">
          <router-link class="nav-link" to="/editdata"
            >Input/Modify Health Data</router-link
          >
          <br />
          <router-link class="nav-link" to="/editgoal"
            >Input/Modify Daily Goals</router-link
          >
        </h5>
      </div>
    </div>
  </div>
</template>
<script>
import auth from "../firebase.js";

var name, email;
auth.onAuthStateChanged(function (user) {
  if (user) {
    // User is signed in.
    name = user.displayName;
    email = user.email;
  }
});

export default {
  name: "profile",
  bodyClass: "profile-page",
  components: {},
  data() {
    return {
      name: name,
      email: email,
    };
  },
};
</script>
<style></style>
