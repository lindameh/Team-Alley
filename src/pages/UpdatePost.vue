<template>
    <div class="section">
        <div v-if="user" class="container">
            <div class="row">

                <div v-if="error" class="alert alert-danger">{{error}}</div>

                <div class="col-lg-8 text-center ml-auto mr-auto col-md-8" style="margin-top:10vh">
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
                    <div class="textarea-container" style="height:20vh">
                        <textarea
                        class="form-control"
                        name="name"
                        rows="20"
                        cols="100"
                        v-model="post.message"
                        placeholder="Sharing is Caring"
                        required
                        ></textarea>
                    </div><br>
                    <p>Update Post Picture</p>
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
import VueSimpleAlert from "vue-simple-alert";

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
                this.post.bgRef = storageRef.fullPath
            }
        },
        updatePost() {
            if (
                this.post.title == "" ||
                this.post.message == "" ||
                !(this.post.sports || this.post.food || this.post.wellness || this.post.hygiene)
            ) {
                VueSimpleAlert.alert("Please fill in empty fields!",'','error');
            } else {
                this.post.username = this.name;
                this.post.userEmail = this.email;            
                this.post.time = this.format_date(new Date());
                this.photo();
                if (this.newPhoto) this.addBgRef();
                database.collection('Posts').doc(this.$route.params.id).update(this.post)
                    .then((result) => {
                        console.log("Post Updated");
                        VueSimpleAlert.alert("Post Updated successfully",'','success');
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
                            photoURL: "",
                            bgRef: ""
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
