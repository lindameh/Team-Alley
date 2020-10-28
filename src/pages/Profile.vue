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
          <img id="profilePic" v-bind:src="photo()" alt="" />
        </div>
        <h3 class="title">{{ name }}</h3>
      </div>
    </div>

    <div class="section">
      <div v-if="user" class="container">
        <h3 class="title">Change Profile Picture</h3>
        <div class="col-md-4 ml-auto mr-auto text-center">
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
import { storage } from "../firebase.js";

export default {
  name: "profile",
  bodyClass: "profile-page",
  components: {},
  data() {
    return {
      newPhoto: "",
      newPassword: "",
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
  },
  methods: {
    photo() {
      if (this.user) {
        storage
          .ref(this.user.photoURL)
          .getDownloadURL()
          .then(function (url) {
            var img = document.getElementById("profilePic");
            img.src = url;
          });
      }
    },
    chooseProfilePic(e) {
      var file = e.target.files[0];
      this.newPhoto = file;
    },
    changeProfilePic() {
      if (this.user) {
        var storageRef = storage.ref("profilePicture/" + this.newPhoto.name);
        storageRef.put(this.newPhoto).then();
        this.user
          .updateProfile({
            photoURL: storageRef.fullPath,
          })
          .then(() => {
            console.log("profile picture updated successfully");
            alert("Profile picture updated successfully. Please login again.");
          });
      }
    },
    changePassword() {
      if (this.user) {
        this.user
          .updatePassword(this.newPassword)
          .then(() => {
            console.log("password updated successfully");
            alert("Password updated successfully. Please login again.");
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
