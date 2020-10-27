<template>
  <div>
    <div class="page-header page-header-small clear-filter">
      <parallax
        class="page-header-image"
        style="background-image: url('img/bg3.jpg')"
      >
      </parallax>
      <div class="content-center">
        <div class="container">
          <h1 class="title">User Guide</h1>
        </div>
      </div>
    </div>
    <div class="section section-about-us">
      <div class="container">
        <div class="row">
          <div class="col-md-8 ml-auto mr-auto text-center">
            <h2 class="title">How to use WELIFE?</h2>
            <h5 class="description">
              <ol>
                <li> Input health data (Profile ->  Input/Modify Health Data)</li>
                <li>Set up daily goals (Profile -> Set up/Modify Personal Goals)</li>
                <li>Log daily activities (FORM)</li>
                <li>Track daily progress (ACHIEVEMENT)</li>
                <li>View leaderboard (LEADERBOARD)</li>
                <li>View sharing board (SHARING)</li>
              </ol>
            </h5>                                  
          </div>
        </div>
        <div class="separator separator-primary"></div>
      </div>
    </div>
    <div class="section section-contact-us text-center">
      <div class="container">
        <h2 class="title">Still have questions for us?</h2>
        <p class="description">
          Your feedback is very important to us!<br/> 
          Drop us an email and we will reply you as soon as we can.
        </p>
        <div class="row">
          <div class="col-lg-6 text-center ml-auto mr-auto col-md-8">
            <fg-input
              class="input-lg"
              placeholder="First Name..."
              v-model="form.firstName"
              addon-left-icon="now-ui-icons users_circle-08"
            >
            </fg-input>
            <fg-input
              class="input-lg"
              placeholder="Email Here..."
              v-model="form.email"
              addon-left-icon="now-ui-icons ui-1_email-85"
            >
            </fg-input>
            <div class="textarea-container">
              <textarea
                class="form-control"
                name="name"
                rows="4"
                cols="80"
                v-model="form.message"
                placeholder="Type a message..."
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
  </div>
</template>
<script>
import { Button, FormGroupInput } from '@/components';
export default {
  name: 'guide',
  bodyClass: 'guide-page',
  components: {
    [Button.name]: Button,
    [FormGroupInput.name]: FormGroupInput
  },
  data() {
    return {
      form: {
        firstName: '',
        email: '',
        message: ''
      }
    };
  }
};
</script>
<style></style>
