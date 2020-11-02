<template>
  
  <div>
    {{get}}

      <div class="section">
        <div class="container">

          <div class="container">
            <div class="photo-container">
              <img v-bind:src="post.photo" alt="" />
            </div>
            <h1 class="p-3 mb-2 bg-dark text-white text-center"><strong>{{post.title}}</strong></h1>
            <h3 class="text-muted text-center">{{post.username}}</h3>
          </div>

          <p class="text-center">{{post.time}}</p>
          <div class="border border-warning">
            <h3 class="col-md-12 ml-auto mr-auto text-justify">{{post.message}}</h3>
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
