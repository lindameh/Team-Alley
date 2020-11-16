<template>
  <div>
    <div class="page-header page-header-small clear-filter">
      <parallax
        class="page-header-image"
        style="background-image: url('img/wellness2.png')"
      >
      </parallax>
      <div class="content-center">
        <div class="container">
          <h1 class="title">Need some help?</h1>
        </div>
      </div>
    </div>
    <div class="section section-about-us">
      <div class="container">
        <div class="col-md-8 ml-auto mr-auto text-center">
          <h2 class="title">To get started:</h2>
          <h5>
            <ol>
              <li>Input your health data & set up your daily goals in the PROFILE page</li>
              <br><br>
              <img src="img/SetGoals.gif">
              <br><br><br>

              <li>Record your daily activities in the FORM page</li>
              <br><br>
              <img src="img/FillForm.gif">
              <br><br><br>

              <li>Track your daily & weekly progress in the ACHIEVEMENT page</li>
              <br><br>
              <img src="img/achievement.gif">
              <br><br><br>

              <li>View top achievers in each category in the LEADERBOARD page</li>
              <br><br>
              <img src="img/leaderboard.gif">
              <br><br><br>
              
              <li>Share your experience with the community in the SHARING page</li>
              <br><br>
              <img src="img/sharing.gif">
              <br><br><br>
            </ol>
          </h5>
        </div>
      </div>
    </div>

    <div class="container text-center">
      <h2 class="title">Still have questions for us?</h2>
      <p class="description">
        Your feedback is very important to us!<br />
        Drop us an email and we will reply you as soon as we can.
      </p>
      <div class="row">
        <div class="col-lg-6 text-center ml-auto mr-auto col-md-8">
          <fg-input
            class="input-lg"
            placeholder="How should we address you?"
            v-model="form.firstName"
            addon-left-icon="now-ui-icons users_circle-08"
          >
          </fg-input>
          <fg-input
            class="input-lg"
            placeholder="Share your email with us so we can get back to you!"
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
            <n-button type="primary" round block size="lg" v-on:click.prevent="submit"
              >Send Message</n-button
            >
          </div>
          <br><br><br><br><br>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { Button, FormGroupInput } from "@/components";
export default {
  name: "guide",
  bodyClass: "guide-page",
  components: {
    [Button.name]: Button,
    [FormGroupInput.name]: FormGroupInput,
  },
  data() {
    return {
      form: {
        firstName: "",
        email: "",
        message: ""
      },
    };
  },
  methods: {
    submit() {
      alert("Thank you for your question! We will get back to you shortly.")
      this.form = {
        firstName: "",
        email: "",
        message: ""
      }
    }
  }
};
</script>

<style scoped>
h1 {
  text-align: right;
}
</style>
