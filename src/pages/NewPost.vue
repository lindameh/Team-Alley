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
                        v-model="newPost.title"
                        required
                    >
                    </fg-input>
                    <p>Category</p>
                    <div class="row category">
                        <n-checkbox class="col-md-3" v-model="newPost.sports">Sports</n-checkbox>
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
                    </div><br>
                    <p>Add Post Picture</p>
                    <div>
                        <form class="form-inline">
                            <input
                                id="photoInput"
                                type="file"
                                class="form-control"
                                accept="image/*"
                                style="width: 100%"
                                @change="chooseBgPic($event)"
                                required
                            />
                        </form>
                    </div>
                    <div class="send-button">
                        <n-button type="primary" round block size="lg"
                                  v-on:click.prevent="uploadNewPost"
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
import auth, { database, storage } from "../firebase.js";
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
                sports: false,
                food: false,
                wellness: false,
                hygiene: false,
                photoURL: "",
                bgRef: "postPicture/sharing-bg.jpg"
            },
            newPhoto: "",
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
        }
    },
    methods: {
        photo() {
            if (this.user) {
                storage
                .ref(this.user.photoURL)
                .getDownloadURL()
                .then((url) => {
                    this.newPost.photoURL = url
                })
                .catch((err) => {
                    this.newPost.error = err.message;
                })
            }
        },
        format_date(value){
            if (value) {
                return moment(String(value)).format('DD/MM/YYYY HH:mm')
            }
        },    
        chooseBgPic(e) {
            var file = e.target.files[0];
            this.newPhoto = file;
        },
        addBgRef() {
            if (this.user) {
                var storageRef = storage.ref("postPicture/" + this.newPhoto.name);
                storageRef.put(this.newPhoto).then();
                this.newPost.bgRef = storageRef.fullPath
            }
        },
        uploadNewPost() {
            if (
                this.newPost.title == "" ||
                this.newPost.message == "" ||
                !(this.newPost.sports || this.newPost.food || this.newPost.wellness || this.newPost.hygiene)
            ) {
                alert("Please fill in empty fields!");
            } else {
                this.newPost.username = this.name;
                this.newPost.userEmail = this.email;
                this.newPost.time = this.format_date(new Date());
                this.photo();
                if (this.newPhoto) this.addBgRef();
                database.collection('Posts').add(this.newPost)
                    .then((result) => {
                        alert("New Post created");
                        this.newPost = {
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
                        this.newPost.error = err.message;
                    });
            }
        }
    },
    created() {
        this.photo();
    }
};
</script>
<style scoped>
.category {
    margin-bottom: 40px;
}
</style>
