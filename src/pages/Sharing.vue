<template>

  <div class="section">
    <!--<div v-if="user" class="container">-->
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

        <!--Get Posts from firebase-->
        {{ getAll }}
        <!--Render posts into cards-->
        <SharingCard 
          v-for="post in postsList" 
          v-bind:key="post.id" 
          v-bind:post="post"></SharingCard>

        </tab-pane>
        
        <tab-pane>
        <span slot="label">
          <i class="now-ui-icons sport_user-run"></i>Sports
        </span>
        </tab-pane>
        
        <tab-pane>
        <span slot="label">
          <i class="now-ui-icons shopping_basket"></i>Food
        </span>
        </tab-pane>
        
        <tab-pane>
        <span slot="label">
          <i class="now-ui-icons ui-2_favourite-28"></i>Wellness
        </span>
        </tab-pane>

        <tab-pane>
        <span slot="label">
          <i class="now-ui-icons media-2_sound-wave"></i>Hygiene
        </span>
        </tab-pane>

      </tabs>

    </div>

    <!--<div v-else class="container">
      <div class="alert alert-danger">Please log in first</div>
    </div>-->
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
      postsList:[],
    }
  },
  computed: {
    user() {
      return auth.currentUser;
    },
    getAll() {
      this.getAllPosts();
      return null;
    }
  },
  methods: {
    getAllPosts() {
      database.collection('Posts').get()
        .then((querySnapShot) => {
          let post = {}
          querySnapShot.forEach(doc => {
              post = doc.data()
              post.id = doc.id
              post.photo = this.user.photoURL
              console.log(post)
              this.postsList.push(post)      
        })
        .catch((err) => {
          console.log("Error getting documents: " + err)
        })
      })
      console.log("Getting Posts from method")
    },
    getSportsPosts() {
      database.collection('Posts').get()
        .then((querySnapShot) => {
          let post = {}
          querySnapShot.forEach(doc => {
              post = doc.data()
              post.id = doc.id
              post.photo = this.user.photoURL
              console.log(post)
              this.postsList.push(post)      
        })
        .catch((err) => {
          console.log("Error getting documents: " + err)
        })
      })
      console.log("Getting Posts from method")
    },
  },
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
