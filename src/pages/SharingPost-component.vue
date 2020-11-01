<template>
  <div>
    {{get}}
    <div class="page-header page-header-small clear-filter">
      <div
        class="page-header-image"
        style="background-image: url('img/bg5.jpg')"
        v-bind:style="(height = '100px')"
      ></div>

      <div class="container">
        <div class="photo-container">
          <img v-bind:src="post.photo" alt="" />
        </div>
        <h1><strong>{{post.title}}</strong></h1>
        <h3 class="text-muted">{{post.username}}</h3>
      </div>

      <div class="section">
        <div class="container">
          <p class="text-center">{{post.time}}</p>
          <h3>{{post.message}}</h3>
       </div>
      </div>

    </div>
  </div>
</template>
<script>
import { Tabs, TabPane } from '../components';
import { Button } from '@/components';
import auth, { database } from "../firebase.js";

export default {
  name: "post-body",
  bodyClass: "post-body-page",
  components: {
    //Tabs,
    //TabPane,
    [Button.name]: Button,
  },
  data() {
    return {
      post: {
          // username: '',
          // userEmail: '',
          // time: '',
          // title: '',
          // message: '',
          // sports: null,
          // food: null,
          // wellness: null,
          // hygiene: null,
      }
    };
  },
  computed: {
    get() {
      this.getPost();
      return null;
    },
    user() {
      return auth.currentUser;
    },
    name() {
      var displayName;
      if (this.user) {
        displayName = this.user.displayName;
      }
      return displayName;
    }
  },
  methods: {
    getPost() {
      database.collection('Posts').doc(this.$route.params.id).get()
        .then((doc) => {
          this.post = doc.data()
          console.log(doc.data())
        })
        .catch((err) => {
          console.log("Error getting documents: " + err)
      })
    }
  },
};
</script>
<style></style>
