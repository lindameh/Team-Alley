<template>
    <div class="section">
        <div v-if="user" class="container">
            <div class="row">

                <div v-if="error" class="alert alert-danger">{{error}}</div>

                <div class="col-lg-6 text-center ml-auto mr-auto col-md-8" style="margin-top:10vh">
                    <form>
                    <!--TODO Make the fields required-->
                    <p>Title</p>
                    <fg-input
                        placeholder="Title"
                        v-model="newPost.title"
                        required
                    >
                    </fg-input>
                    <p>Category</p>
                    <div class="row category">
                        <n-checkbox class="col-md-3" v-model="newPost.sport">Sports</n-checkbox>
                        <n-checkbox class="col-md-3" v-model="newPost.food">Food</n-checkbox>
                        <n-checkbox class="col-md-3" v-model="newPost.wellness">Wellness</n-checkbox>
                        <n-checkbox class="col-md-3" v-model="newPost.hygiene">Hygiene</n-checkbox>
                    </div>
                    <p>Content</p>
                    <div class="textarea-container">
                        <textarea
                        class="form-control"
                        name="name"
                        rows="10"
                        cols="100"
                        v-model="newPost.message"
                        placeholder="Sharing is Caring"
                        required
                        ></textarea>
                    </div>
                    <div class="send-button">
                        <n-button type="primary" round block size="lg"
                                  v-on:click.prevent.once="uploadNewPost"
                        >Send Message</n-button
                        >
                    </div>
                    </form>
                </div>
            </div>
        </div>

        <div v-else class="container">
            <div class="alert alert-danger">Please log in first</div>
        </div>
    </div>
</template>
<script>
import { Button, FormGroupInput, Checkbox } from '@/components';
import auth, { database } from "../firebase.js";
import moment from 'moment';

export default {
    name: 'newpost',
    bodyClass: 'newpost-page',
    components: {
        [Button.name]: Button,
        [FormGroupInput.name]: FormGroupInput,
        [Checkbox.name]: Checkbox
    },
    data() {
        return {
            newPost: {
                username: this.user,
                userEmail: this.email,
                time: '',
                title: '',
                message: '',
                sport: false,
                food: false,
                wellness: false,
                hygiene: false,
            },
            error: null
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
        format_date(value){
            if (value) {
                return moment(String(value)).format('DD/MM/YYYY hh:mm')
            }
        },
        uploadNewPost() {
            this.newPost.username = this.name;
            this.newPost.userEmail = this.email;            
            this.newPost.time = this.format_date(new Date());
            database.collection('Posts').add(this.newPost)
                .then((result) => {
                    console.log("New Post created");
                    alert("New Post created");
                    this.newPost = {
                        username: '',
                        userEmail: '',
                        time: '',
                        title: '',
                        message: '',
                        sport: false,
                        food: false,
                        wellness: false,
                        hygiene: false,
                        error: null
                    }
                }).catch((err) => {
                    this.newPost.error = err.message;
                });
        },
        deletePost() {
            //TODO
        }
  }
};
</script>
<style scoped>
.category {
    margin-bottom: 40px;
}
</style>
