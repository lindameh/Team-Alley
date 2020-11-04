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
          <img
            id="profilePic"
            v-bind:src="photo()"
            :key="profilePicKey"
            alt=""
          />
        </div>
        <h3 class="title">{{ name }}</h3>
      </div>
    </div>

    <div style="padding-bottom: 50px">
      <div v-if="user" class="container">
        <div class="row">
          <div>
            <h3 class="title" style="text-align: left">Functions</h3>
            <h5>Change Profile Picture</h5>
            <form class="form-inline" @submit.prevent="changeProfilePic">
              <input
                id="photoInput"
                type="file"
                class="form-control"
                accept="image/*"
                style="width: 70%"
                @change="chooseProfilePic($event)"
                required
              />
              <button type="submit" class="btn btn-primary btn-round">
                Submit
              </button>
            </form>
            <br />
            <h5>Change Password</h5>
            <div v-if="error" class="alert alert-danger">{{ error }}</div>
            <form class="form-inline" @submit.prevent="changePassword">
              <input
                id="passwordInput"
                type="password"
                class="form-control"
                placeholder="New Password"
                style="width: 70%"
                v-model="newPassword"
                required
              />
              <button type="submit" class="btn btn-primary btn-round">
                Submit
              </button>
            </form>
          </div>

          <div class="col-md-6 ml-auto mr-auto">
            <h3 class="title" style="text-align: left">
              Your Data{{ getdata2 }}
            </h3>
            <div v-if="data.gender">
              <div class="row">
                <h5>Health Data</h5>
                <router-link class="nav-link" to="/editdata"
                  >Modify</router-link
                >
              </div>
              <div class="row">
                <div class="col">
                  Gender: {{ data.gender }}<br />
                  Age: {{ data.age }}<br />
                  Height: {{ data.height }}<br />
                  Weight: {{ data.weight }}
                </div>
                <div class="col">
                  Weight Goal: {{ data.weightGoal }}<br />
                  Physical Activity Level: {{ data.pal }}<br />
                  Special Physical Condition:
                  {{ data.specialPhysicalCondition }}
                </div>
              </div>
            </div>
            <div v-else>
              <h5>Health Data</h5>
              <router-link class="nav-link" to="/editdata"
                >Input Health Data</router-link
              >
            </div>
            <br />
            <br />
            <div v-if="data.dailyTarget.exercise">
              <div class="row">
                <h5>Daily Goals</h5>
                <router-link class="nav-link" to="/editgoal"
                  >Modify</router-link
                >
              </div>
              <div class="row">
                <div class="col">
                  EXERCISE<br />
                  Duration of exercise:
                  {{ data.dailyTarget.exercise }} min<br /><br />
                  HYGIENE<br />
                  Taking temperature:
                  {{ data.dailyTarget.temperature }} times<br />
                  Washing mask: {{ data.dailyTarget.mask }} times<br />
                  Washing hands: {{ data.dailyTarget.hand }} times<br />
                </div>
                <div class="col">
                  FOOD<br />
                  Calorie intake:
                  {{ data.dailyTarget.calorie }} kCal<br /><br />
                  WELLNESS<br />
                  Duration of work: {{ data.dailyTarget.work }} hr<br />
                  Duration of leisure: {{ data.dailyTarget.leisure }} hr<br />
                </div>
              </div>
            </div>
            <div v-else>
              <h5>Daily Goals</h5>
              <router-link class="nav-link" to="/editgoal"
                >Input Daily Goals</router-link
              >
            </div>
          </div>
        </div>
      </div>

      <div v-else class="container">
        <div class="alert alert-danger">Please log in first</div>
      </div>
    </div>
  </div>
</template>
<script>
import auth from "../firebase.js";
import { database, storage } from "../firebase.js";
import firebase from "firebase";

export default {
  name: "profile",
  bodyClass: "profile-page",
  components: {},
  data() {
    return {
      newPhoto: "",
      newPassword: "",
      profilePicKey: 0,
      error: null,
      data: {},
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
    getdata2() {
      this.getdata();
      return null;
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
            document.getElementById("photoInput").value = null;
            alert("Profile picture updated successfully.");
            this.profilePicKey += 1;
          });
      }
    },
    changePassword() {
      if (this.user) {
        this.user
          .updatePassword(this.newPassword)
          .then(() => {
            console.log("password updated successfully");
            document.getElementById("passwordInput").value = null;
            alert("Password updated successfully. Please login again.");
            firebase
              .auth()
              .signOut()
              .then(() => {
                console.log("logout successfully");
                this.$router.replace({
                  name: "login",
                });
              });
          })
          .catch((err) => {
            this.error = err.message;
          });
      }
    },
    getdata() {
      database
        .collection("Users")
        .doc(this.email)
        .get()
        .then((doc) => {
          this.data = doc.data();
        })
        .catch((err) => {
          console.log("Error getting document:", err);
        });
    },
  },
};
</script>
<style></style>
