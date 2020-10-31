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
        </tab-pane>
        
        <tab-pane>
        <span slot="label">
          <i class="now-ui-icons sport_user-run"></i>Sport
        </span>
        <!--Card-->
        <div class="col-md-10 mr-auto ml-auto">
          <card class="container" >
            <div class="row">
              <!--Image Here-->
              <div class="col-md-3">
                <img slot="image" class="card-img-top sharing-img" src='img/ryan.jpg' alt="">
              </div>
              <!--Content Here-->
              <div class="col-md-9">
                <h5 class="card-title">Tips to lose Weight</h5>
                <p class="card-text">I have been using my time in quarantine to research on the best weight losing method!</p>
                <n-button type="primary">See More</n-button>                
              </div>
            </div>
          </card>
        </div>
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

      <h5>
        {{ get }}
      <ol>
          <li v-for="post in postsList" v-bind:key="post.id">
              <h2>{{post.title}}</h2>
              <h6>By: {{post.username}} Posted on: {{post.time}}</h6>
              <p>{{post.message}}</p>
              <img v-bind:src="post.photo"/>
          </li>
      </ol>
      </h5>


      <!--Card-->
      <div class="col-md-10 mr-auto ml-auto">
        <card class="container" >
          <div class="row">
            <!--Image Here-->
            <div class="col-md-3">
              <img slot="image" class="card-img-top sharing-img" src='img/ryan.jpg' alt="">
            </div>
            <!--Content Here-->
            <div class="col-md-9">
              <h5 class="card-title">Tips to lose Weight</h5>
              <p class="card-text">I have been using my time in quarantine to research on the best weight losing method!</p>
              <n-button type="primary">See More</n-button>                
            </div>
          </div>
        </card>
      </div>

      <!--Card-->
      <div class="col-md-10 mr-auto ml-auto">
        <card class="container" >
          <div class="row">
            <!--Image Here-->
            <div class="col-md-3">
              <img slot="image" class="card-img-top sharing-img" src='img/eva.jpg' alt="">
            </div>
            <!--Content Here-->
            <div class="col-md-9">
              <h5 class="card-title">My Diet Progress</h5>
              <p class="card-text">Join me on my dieting journey and road to losing weight!</p>
              <n-button type="primary">See More</n-button>                
            </div>
          </div>
        </card>
      </div>

      <!--Card-->
      <div class="col-md-10 mr-auto ml-auto">
        <card class="container" >
          <div class="row">
            <!--Image Here-->
            <div class="col-md-3">
              <img slot="image" class="card-img-top sharing-img" src='img/julie.jpg' alt="">
            </div>
            <!--Content Here-->
            <div class="col-md-9">
              <h5 class="card-title">Healthy and Tasty recipes</h5>
              <p class="card-text">Here are some healthy but Tasty recipes you guys can try out!</p>
              <n-button type="primary">See More</n-button>                   
            </div>
          </div>
        </card>
      </div>

    </div>

    <!--<div v-else class="container">
      <div class="alert alert-danger">Please log in first</div>
    </div>-->
  </div>
</template>

<script>
import { Card, Tabs, TabPane } from '../components';
import { Button } from '@/components';
import auth, { database } from "../firebase.js";

export default {
  name: "sharing",
  bodyClass: "sharing-page",
  components: {
    Card,
    Tabs,
    TabPane,
    [Button.name]: Button
  },
  data(){
    return{
      postsList:[{
                        username: 'tom',
                        id: 1,
                        userEmail: '',
                        time: 'DD/MM/YYYY',
                        title: 'sports',
                        message: 'stuff',
                        sport: false,
                        food: false,
                        wellness: false,
                        hygiene: false,
                    },
                    {
                        username: 'Tim',
                        id: 2,
                        userEmail: '',
                        time: 'DD/MM/YYYY',
                        title: 'Food',
                        message: 'Chicken',
                        sport: false,
                        food: false,
                        wellness: false,
                        hygiene: false,
                    }],
    }
  },
  computed: {
    user() {
      return auth.currentUser;
    },
    get() {
      this.getPosts();
      return null;
    }
  },
  methods: {
    getPosts() {
      // #TODO: Load data from firebase
      // Check if there are any sharing
      // render each sharing into a card component
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
    created: function() {
      console.log("created")
      this.getPosts()
    },
    mounted: function() {
      console.log("mounted")
      this.getPosts()
    },
    beforeCreate: function() {
      console.log("beforeCreate()")
      this.getPosts()
    },
    beforeMount: function() {
      console.log("beforeMount()");
      this.getPosts()
    },
    beforeUpdate: function() {
      console.log("beforeUpdate()")
      this.getPosts()
    },
    updated: function() {
      this.getPosts()
      console.log("updated()")
    },
    beforeDestroy: function() {
      console.log("beforeDestroy()")
      this.getPosts()
    }
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
