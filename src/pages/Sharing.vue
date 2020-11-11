<template>

  <div class="section">
  <div v-if="user" class="container">
    <div class="container">

      <router-link class="nav-link write-img float-right" 
                   to="/newpost" 
                   tag="img" 
                   src='img/orange-pen.png'
                   title="New Post">
      </router-link>

      <tabs type="primary" tabContentClasses="tab-subcategories"
            square centered >
            
        <tab-pane>
        <span slot="label">
          <i class="now-ui-icons objects_umbrella-13"></i>All
        </span>

        <SharingCard 
          v-for="post in allPostsList" 
          v-bind:key="post.id" 
          v-bind:post="post"></SharingCard>

        </tab-pane>
        
        <tab-pane>
        <span slot="label">
          <i class="now-ui-icons sport_user-run"></i>Sports
        </span>

        <SharingCard 
          v-for="post in sportsPostsList" 
          v-bind:key="post.id" 
          v-bind:post="post"></SharingCard>

        </tab-pane>
        
        <tab-pane>
        <span slot="label">
          <i class="now-ui-icons shopping_basket"></i>Food
        </span>

        <SharingCard 
          v-for="post in foodPostsList" 
          v-bind:key="post.id" 
          v-bind:post="post"></SharingCard>

        </tab-pane>
        
        <tab-pane>
        <span slot="label">
          <i class="now-ui-icons ui-2_favourite-28"></i>Wellness
        </span>

        <SharingCard 
          v-for="post in wellnessPostsList" 
          v-bind:key="post.id" 
          v-bind:post="post"></SharingCard>

        </tab-pane>

        <tab-pane>
        <span slot="label">
          <i class="now-ui-icons media-2_sound-wave"></i>Hygiene
        </span>

        <SharingCard 
          v-for="post in hygienePostsList" 
          v-bind:key="post.id" 
          v-bind:post="post"></SharingCard>

        </tab-pane>

      </tabs>

    </div>
  </div>

    <div v-else class="container">
      <div class="alert alert-danger">Please log in first</div>
    </div>
  </div>
</template>

<script>
import { Tabs, TabPane } from '../components';
import { Button } from '@/components';
import auth, { database } from "../firebase.js";
import SharingCard from "./SharingCard-component.vue";

export default {
  name: "sharing",
  bodyClass: "sharing-page",
  components: {
    Tabs,
    TabPane,
    [Button.name]: Button,
    SharingCard
  },
  data(){
    return{
      allPostsList:[],
      sportsPostsList:[],
      foodPostsList:[],
      wellnessPostsList:[],
      hygienePostsList:[],
      error: ""
    }
  },
  computed: {
    user() {
      return auth.currentUser;
    }
  },
  methods: {
    getAllPosts() {
      database.collection('Posts').orderBy("time", "desc").get()
        .then((querySnapShot) => {
          let post = {}
          querySnapShot.forEach(doc => {
              post = doc.data()
              post.id = doc.id
              post.photo = this.user.photoURL
              this.allPostsList.push(post)
              // Testing
              if (post.sports == true) {
                this.sportsPostsList.push(post)
              } 
              if (post.food == true) {
                this.foodPostsList.push(post)
              }
              if (post.wellness == true) {
                this.wellnessPostsList.push(post)
              }
              if (post.hygiene == true) {
                this.hygienePostsList.push(post)
              }
          })
        })
        .catch((err) => {
          this.error = err.message;
      })
    },
  },
  created() {
    this.getAllPosts();
  }
};
</script>

<style scoped>
.sharing-img {
  height: 10rem;
  width: 10rem;
}
.write-img {
  position: sticky;
  top: 5rem;
  z-index: 1;
  height: 4vw;
  width: 4vw;
  max-height: 8rem;
  max-width: 10rem;
  min-height: 4rem;
  min-width: 5rem;
  margin-top: 1vw;
}
.float-left {
  float:left
}
.float-right {
  float:right
}
</style>
