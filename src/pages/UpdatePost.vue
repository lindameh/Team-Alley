<template>
    <div class="section">
        <div v-if="user" class="container">
            <div class="row">

                <div v-if="error" class="alert alert-danger">{{error}}</div>

                <div class="col-lg-6 text-center ml-auto mr-auto col-md-8" style="margin-top:10vh">
                    <form>
                    <p>Title</p>
                    <fg-input
                        placeholder="Title"
                        v-model="post.title"
                        required
                    >
                    </fg-input>
                    <p>Category</p>
                    <div class="row category">
                        <n-checkbox class="col-md-3" v-model="post.sports">Sports</n-checkbox>
                        <n-checkbox class="col-md-3" v-model="post.food">Food</n-checkbox>
                        <n-checkbox class="col-md-3" v-model="post.wellness">Wellness</n-checkbox>
                        <n-checkbox class="col-md-3" v-model="post.hygiene">Hygiene</n-checkbox>
                    </div>
                    <p>Content</p>
                    <div class="textarea-container">
                        <textarea
                        class="form-control"
                        name="name"
                        rows="10"
                        cols="100"
                        v-model="post.message"
                        placeholder="Sharing is Caring"
                        required
                        ></textarea>
                    </div>
                    <div class="send-button">
                        <n-button type="primary" round block size="lg"
                                  v-on:click.prevent="updatePost"
                        >Update Post</n-button
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
import auth, { database, storage } from "../firebase.js";
import moment from 'moment';

export default {
    name: 'updatepost',
    bodyClass: 'updatepost-page',
    components: {
        [Button.name]: Button,
        [FormGroupInput.name]: FormGroupInput,
        [Checkbox.name]: Checkbox
    },
    data() {
        return {
            post: {
                username: this.user,
                userEmail: this.email,
                time: '',
                title: '',
                message: '',
                sports: false,
                food: false,
                wellness: false,
                hygiene: false,
                photoURL: ""
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
        getPhoto() {
            this.photo()
            return null;
        }
    },
    methods: {
        photo() {
            if (this.user) {
                storage
                .ref(this.user.photoURL)
                .getDownloadURL()
                .then((url) => {
                    this.post.photoURL = url
                })
                .catch((err) => {
                    this.post.error = err.message;
                })
            }
        },
        format_date(value){
            if (value) {
                return moment(String(value)).format('DD/MM/YYYY hh:mm')
            }
        },
        updatePost() {
            if (
                this.post.title == "" ||
                this.post.message == "" ||
                !(this.post.sports || this.post.food || this.post.wellness || this.post.hygiene)
            ) {
                alert("Please fill in empty fields!");
            } else {
                this.post.username = this.name;
                this.post.userEmail = this.email;            
                this.post.time = this.format_date(new Date());
                this.photo();
                database.collection('Posts').doc(this.$route.params.id).update(this.post)
                    .then((result) => {
                        alert("Post Updated successfully");
                        this.post = {
                            username: '',
                            userEmail: '',
                            time: '',
                            title: '',
                            message: '',
                            sports: false,
                            food: false,
                            wellness: false,
                            hygiene: false,
                            photoURL: ""
                        }
                        this.error = null
                        this.$router.replace({ name: "sharing" });
                    }).catch((err) => {
                        this.post.error = err.message;
                    });
            }
        },
        getPost() {
            database.collection('Posts').doc(this.$route.params.id).get()
                .then((doc) => {
                    this.post = doc.data()
                })
                .catch((err) => {
                    this.post.error = err.message;
                })
        }
    },
    created() {
        this.photo();
        this.getPost();
    }
};
</script>
<style scoped>
.category {
    margin-bottom: 40px;
}
</style>
