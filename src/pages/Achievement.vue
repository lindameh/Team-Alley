<template>
  <div>
    <div class="section">
      <div class="container">
        <h3 class="title">Progress to My Goal</h3>
        <h3>{{ todayDate() }}</h3>
        <h4>Sports</h4>
        <n-progress
          type="primary"
          :value="parseInt(sportsScore)"
          :height="5"
          show-value
        >
        </n-progress>
        <h4>Food</h4>
        <n-progress
          type="warning"
          :value="parseInt(foodScore)"
          :height="5"
          show-value
        >
        </n-progress>
        <h4>Wellness</h4>
        <n-progress
          type="info"
          :value="parseInt(wellnessScore)"
          :height="5"
          show-value
        >
        </n-progress>
        <h4>Hygiene</h4>
        <n-progress
          type="success"
          :value="parseInt(hygieneScore)"
          :height="5"
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
            <linechart></linechart>
          </card>
          <card class="container">
            <doughnut></doughnut>
          </card>
        </div>

        <div class="col-md-6">
          <card class="container">
            <barchart></barchart>
          </card>
          <card class="container">
            <piechart></piechart>
          </card>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import piechart from "../charts/piechart.js";
import barchart from "../charts/barchart.js";
import doughnut from "../charts/doughnut.js";
import linechart from "../charts/linechart.js";
import { Progress, Card } from "@/components";
import auth from "../firebase.js";
import { database } from "../firebase.js";
import moment from "moment";

export default {
  name: "achievement",
  components: {
    [Progress.name]: Progress,
    Card,
    piechart,
    barchart,
    doughnut,
    linechart,
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
    // getWeeklyData(){
    //   database.collection('Users').doc(this.email).collection("Daily").orderBy('time').limit(7).get().then(querySnapShot => {
    //     let weeklyData = [];
    //     querySnapShot.forEach(doc => {
    //         rank.push(doc.data())
    //     })
    //     this.top10 = rank;
    //   })
    // },
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
