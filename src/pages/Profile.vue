<template>
  <div>
    <div class="page-header page-header-small clear-filter">
      <div
        class="page-header-image"
        style="background-image: url('img/bg5.jpg')"
        v-bind:style="(height = '100px')"
      ></div>

      <div class="container">
        <div class="photo-container">
          <img v-bind:src="photo" alt="" />
        </div>
        <h3 class="title">{{ name }}</h3>
      </div>
    </div>

    <div class="section">
      <div v-if="user" class="container">
        <h3 class="title">Change Profile Picture</h3>      
        <div class="col-md-4 ml-auto mr-auto text-center">
          <div v-if="photoUpdated" class="alert alert-success">Profile photo updated successfully. Please login again.</div>
          <form @submit.prevent="changeProfilePic">
            <input
              type="file"
              class="form-control"
              accept="image/*"
              @change="chooseProfilePic($event)"
              required
            />
            <button type="submit" class="btn btn-primary btn-round">
              Submit
            </button>
          </form>
        </div>

        <h3 class="title">Change Password</h3>
        <div class="col-md-4 ml-auto mr-auto text-center">
          <div v-if="error" class="alert alert-danger">{{ error }}</div>
          <div v-if="passwordUpdated" class="alert alert-success">Password updated successfully. Please login again.</div>
          <form @submit.prevent="changePassword">
            <input
              type="password"
              class="form-control"
              placeholder="New Password"
              v-model="newPassword"
              required
            />
            <button type="submit" class="btn btn-primary btn-round">
              Submit
            </button>
          </form>
        </div>

        <h3 class="title">Health Data</h3>
        <router-link class="nav-link text-center" to="/editdata"
          >Input/Modify Health Data</router-link
        >

        <h3 class="title">Daily Goals</h3>
        <router-link class="nav-link text-center" to="/editgoal"
          >Input/Modify Daily Goals</router-link
        >
      </div>

      <div v-else class="container">
        <div class="alert alert-danger">Please log in first</div>
      </div>
    </div>
  </div>
</template>
<script>
import auth from "../firebase.js";

export default {
  name: "profile",
  bodyClass: "profile-page",
  components: {},
  data() {
    return {
      newPhoto: "",
      newPassword: "",
      photoUpdated: false,
      passwordUpdated: false,
      error: null,
    };
  },
  computed: {
    user() {
      return auth.currentUser;
    },
    name() {
      var displayName;
      if (this.user) {
        displayName = this.user.displayName;
      }
      return displayName;
    },
    email() {
      var email;
      if (this.user) {
        email = this.user.email;
      }
      return email;
    },
    photo() {
      var photoURL;
      if (this.user) {
        photoURL = this.user.photoURL;
      }
      return photoURL;
    },
  },
  methods: {
    chooseProfilePic(e) {
      var file = e.target.files[0];
      this.newPhoto = URL.createObjectURL(file);
    },
    changeProfilePic() {
      if (this.user) {
        this.user
          .updateProfile({
            photoURL: this.newPhoto,
          })
          .then(() => {
            console.log("profile picture updated successfully");
            this.photoUpdated = true;
          });
      }
    },
    changePassword() {
      if (this.user) {
        this.user
          .updatePassword(this.newPassword)
          .then(() => {
            console.log("password updated successfully");
            this.passwordUpdated = true;
          })
          .catch((err) => {
            this.error = err.message;
          });
      }
    },
  },
};
</script>
<style></style>
