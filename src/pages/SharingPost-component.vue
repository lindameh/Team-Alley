<template>
  
  <div>
      <div class="section">
        <div v-if="user" class="container">
          <div>
            <card type="blog" style="width: 100%;" plain>
              <img id="bgPic" slot="image" class="img rounded img-raised" v-bind:src="this.bgURL" alt=""/>
              <img v-if="!this.bgURL" slot="image" class="img rounded img-raised " 
                src="https://demos.creative-tim.com/vue-now-ui-kit-pro/img/project13.jpg" alt="">
              <div class="card-body ml-auto mr-auto">
                <h6 class="category text-warning">
                  <i class="now-ui-icons business_bulb-63"></i> {{this.categories}}
                </h6>
                  <h1 class="p-3 mb-2 text-center"><strong>{{post.title}}</strong></h1>
                <div class="photo-container" id='element3'>
                  <img
                    class="profilePic"
                    v-bind:src="this.post.photoURL"
                    alt=""
                  />
                </div>
                <p class="card-description text-left" id='element1'>{{post.username}}</p>
                <p class="card-description text-left" id='element2'>{{post.time}}</p>
              </div>
              <div v-if="this.post.bgRef">{{f}}</div>
              <h4 class="test">
                <pre class="col-md-12 ml-auto mr-auto text-justify">{{this.textbody}}</pre>
              </h4>
            </card>

          </div>

          <div v-if="name==this.post.username" class="buttons">
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
import auth, { database, storage } from "../firebase.js";
import { Card } from '../components';

export default {
  name: "post-body",
  bodyClass: "post-body-page",
  components: {
    Card,
    [Button.name]: Button,
  },
  data() {
    return {
      post: {},
      textbody: "",
      categories: "",
      bgURL: ""
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
    f() {
      this.bgPhoto();
      return null;
    }
  },
  methods: {
    bgPhoto() {
      var ref = this.post.bgRef
      storage
        .ref(ref)
        .getDownloadURL()
        .then((url) => {
          this.bgURL = url;          
        })
        .catch((err) => {
          console.log(err.message)
        });
    },
    getPost() {
      database.collection('Posts').doc(this.$route.params.id).get()
        .then((doc) => {
          this.post = doc.data()
          this.textbody = doc.data().message.replaceAll("\\n", "\n")
          if (this.post.food == true) this.categories += "FOOD "
          if (this.post.hygiene == true) this.categories += "HYGIENE "
          if (this.post.sports == true) this.categories += "SPORTS "
          if (this.post.wellness == true) this.categories += "WELLNESS "
          console.log(this.categories)
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
  created() {
    this.getPost();
  }
};
</script>

<style scoped>
.float-right {
  float:right
}
.profilePic {
  border-radius: 50%;
  height: 3vh;
  width: 3vh;
  display: block;
  /* margin-left: auto;
  margin-right: auto; */
}
.buttons {
  margin-top: 10vh;
}
n-button {
  margin-left: 10px;
}
pre {
  overflow-x: auto;
  white-space: pre-wrap;
  white-space: -moz-pre-wrap;
  white-space: -pre-wrap;
  white-space: -o-pre-wrap;
  word-wrap: break-word;
  font-family: Arial;
}
.test {
  margin-top: 0px;
}

#element1 {display:inline-block;margin-right:3px; width:70px;} 
#element2 {display:inline-block; width:200px;}
#element3 {display:inline-block; width:30px;}

</style>
