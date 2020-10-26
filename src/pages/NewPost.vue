<template>
    <div class="section">
        <div class="container">
            <div class="row">
                <div class="col-lg-6 text-center ml-auto mr-auto col-md-8" style="margin-top:10vh">
                    <p>Title</p>
                    <fg-input
                        class="input-lg"
                        placeholder="Title"
                        v-model="form.title"
                        addon-left-icon="now-ui-icons users_circle-08"
                    >
                    </fg-input>
                    <p>Category</p>
                    <div class="row category">
                        <n-checkbox class="col-md-3" v-model="sport">Sports</n-checkbox>
                        <n-checkbox class="col-md-3" v-model="food">Food</n-checkbox>
                        <n-checkbox class="col-md-3" v-model="wellness">Wellness</n-checkbox>
                        <n-checkbox class="col-md-3" v-model="hygiene">Hygiene</n-checkbox>
                    </div>
                    <p>Content</p>
                    <div class="textarea-container">
                        <textarea
                        class="form-control"
                        name="name"
                        rows="10"
                        cols="100"
                        v-model="form.message"
                        placeholder="Sharing is Caring"
                        ></textarea>
                    </div>
                    <div class="send-button">
                        <n-button type="primary" round block size="lg"
                        >Send Message</n-button
                        >
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { Button, FormGroupInput, Checkbox } from '@/components';
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
        category: {
            sport: false,
            food: false,
            wellness: false,
            hygiene: false
        },
        form: {
            title: '',
            message: ''
        }
    };
  }
};
</script>
<style scoped>
.category {
    margin-bottom: 40px;
}
</style>
