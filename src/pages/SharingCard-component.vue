<template>

    <!--Card-->
    <div class="col-md-10 mr-auto ml-auto">
    <card v-if="user" class="container" >
        <div class="row">
        <!--Image Here-->
        <div class="col-md-3">
            <img slot="image" class="card-img-top sharing-img" v-bind:src="post.photoURL" alt="">
        </div>
        <!--Content Here-->
        <div class="col-md-9">
            <h5 class="card-title">{{post.title}}</h5>
            <p class="card-text">By: {{post.username}}</p>
            <p class="card-text">Posted on: {{post.time}}</p>              
            <n-button type="primary" v-on:click.prevent.once="navigate">See More</n-button>                   
        </div>
        </div>
    </card>

    <div v-else class="container">
      <div class="alert alert-danger">Please log in first</div>
    </div>
    </div>

</template>

<script>
import { Card } from '../components';
import { Button } from '@/components';
import auth from "../firebase.js";

export default {
  name: "sharing-card",
  bodyClass: "sharing-card",
  components: {
    Card,
    [Button.name]: Button
  },
  props: {
      post: {
          type: Object
      }
  },
  computed: {
    user() {
      return auth.currentUser;
    }
  },  
  methods: {
      navigate() {
          this.$router.push({ path: `/post/${this.post.id}` })
      }
  }
}
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
