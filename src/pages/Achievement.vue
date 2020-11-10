<template>
  <div>
    <div class="section">
      <div class="container">
        <h3 class="title">Progress to My Goal</h3>
        <h3>{{ todayDate() }}</h3>
        <h4>Sports</h4>
        <n-progress
          type="warning"
          :value="parseInt(sportsScore)"
          :height="8"
          show-value
        >
        </n-progress>
        <h4>Food</h4>
        <n-progress
          type="primary"
          :value="parseInt(foodScore)"
          :height="8"
          show-value
        >
        </n-progress>
        <h4>Wellness</h4>
        <n-progress
          type="info"
          :value="parseInt(wellnessScore)"
          :height="8"
          show-value
        >
        </n-progress>
        <h4>Hygiene</h4>
        <n-progress
          type="success"
          :value="parseInt(hygieneScore)"
          :height="8"
          show-value
        >
        </n-progress>
      </div>
    </div>

    <div class="container">
      <h3>Last Week</h3>
      <div class="row">
        <div class="col-md-6">
          <card class="container">
            <sportsChart></sportsChart>
          </card>
          <card class="container">
            <foodChart></foodChart>
          </card>
          <card class="container">
            <hygieneChart></hygieneChart>
          </card>
        </div>

        <div class="col-md-6">
          <card class="container">
            <calorieChart></calorieChart>
          </card>
          <card class="container">
            <wellnessChart></wellnessChart>
          </card>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import sportsChart from "../charts/sportsChart.js";
import hygieneChart from "../charts/hygieneChart.js";
import wellnessChart from "../charts/wellnessChart.js";
import foodChart from "../charts/foodChart.js";
import calorieChart from "../charts/calorieChart.js";
import { Progress, Card } from "@/components";
import auth from "../firebase.js";
import { database } from "../firebase.js";
import moment from "moment";

export default {
  name: "achievement",
  components: {
    [Progress.name]: Progress,
    Card,
    sportsChart,
    hygieneChart,
    wellnessChart,
    foodChart,
    calorieChart
  },
  data() {
    return {
      sportsScore: 0,
      foodScore: 0,
      hygieneScore: 0,
      wellnessScore: 0,
      error: null,
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
    todayDate() {
      return moment(String(new Date())).format("D MMM YYYY");
    },
    getTodayScore() {
      database
        .collection("Users")
        .doc(this.email)
        .collection("Daily")
        .doc(moment(String(new Date())).format("DDMMYYYY"))
        .get()
        .then((doc) => {
          this.sportsScore = doc.data().sportsScore;
          this.foodScore = doc.data().foodScore;
          this.wellnessScore = doc.data().wellnessScore;
          this.hygieneScore = doc.data().hygieneScore;
        })
        .catch((err) => {
          this.error = err.message;
        });
    },
  },
  created() {
    this.getTodayScore();
  },
};
</script>
<style></style>
