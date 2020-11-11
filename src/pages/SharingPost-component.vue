<template>
  
  <div>
    {{get}}
      <div class="section">
        <div v-if="user" class="container">

          <div class="container">
            <div class="photo-container">
              <img v-bind:src="post.photo" alt="" />
            </div>
            <h1 class="p-3 mb-2 text-center"><strong>{{post.title}}</strong></h1>
            <h3 class="text-muted text-center">{{post.username}}</h3>
          </div>

          <p class="text-center">{{post.time}}</p>
          <div class="border border-warning">
            <!-- <h3 class="col-md-12 ml-auto mr-auto text-justify">{{post.message}}</h3> -->
            <h3 class="col-md-12 ml-auto mr-auto text-justify">{{this.textbody}}</h3>
          </div>

          <div v-if="name==this.post.username">
            <n-button type="danger" class="float-right" v-on:click.prevent.once="deletePost" outline round>
              <i class="now-ui-icons ui-1_simple-remove"></i> Delete Post
            </n-button>
            <n-button type="info" class="float-right" v-on:click.prevent.once="goToUpdate" outline round>
              <i class="now-ui-icons arrows-1_cloud-upload-94"></i> Update Post
            </n-button>
          </div>
        </div>

        <div v-else class="container">
          <div class="alert alert-danger">Please log in first</div>
        </div>
      </div>
  </div>

</template>
<script>
import { Button } from '@/components';
import auth, { database } from "../firebase.js";

export default {
  name: "post-body",
  bodyClass: "post-body-page",
  components: {
    [Button.name]: Button,
  },
  data() {
    return {
      post: {},
      textbody: "",
      error: "",
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
          this.textbody = doc.data().message.replaceAll("\\n", "\n")
          console.log(doc.data())
        })
        .catch((err) => {
          this.error = err.message;
      })
    },
    deletePost() {
      database.collection('Posts').doc(this.$route.params.id).delete()
        .then(() => {
          this.$router.replace({ name: "sharing" });
        })
        .catch((err) => {
          this.error = err.message;
      })
    },
    goToUpdate() {
      this.$router.replace({ path: `/update/${this.$route.params.id}` });
    }
  },
};
</script>
<style scoped>
.float-right {
  float:right
}
</style>
