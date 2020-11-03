<template>
  <div>
    <div class="section">
      <div class="container">
        <h3 class="title">My Progress</h3>
        <!--Remove after testing-->
        {{getSportsAmountToday}}
        {{getSportsGoalToday}}
        <!--Testing until here-->
        <h3>{{ todaydate }}</h3>
        <h4>Sports</h4>
        <n-progress type="primary" :value="dailySportsProgress" show-value> </n-progress>
        <h4>Food</h4>
        <n-progress type="warning" :value="80" show-value> </n-progress>
        <h4>Wellness</h4>
        <n-progress type="info" :value="40" show-value> </n-progress>
        <h4>Hygiene</h4>
        <n-progress type="success" :value="100" show-value> </n-progress>
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
import moment from 'moment';

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
      todaydate: "23 Sept 2020",
      sportsAmountToday: 0,
      sportsGoal: 0,
      sportsData: {},
      data: {}
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
    dailySportsProgress() {
      var progress = this.getSportsAmountToday / this.getSportsGoalToday * 100;
      return progress.toFixed(2); 
    },
    getSportsAmountToday() {
      this.getSportsData()
      return this.sportsAmountToday
      //return 5
    },
    getSportsGoalToday() {
      this.getSportsGoal()
      return this.sportsGoal
      //return 10
    }
  },
  methods: {
    format_date(value){
      if (value) {
        return moment(String(value)).format('DDMMYYYY')
      }
    },
    getSportsGoal() {
      database.collection("Users").doc(this.email).get()
        .then((doc) => {
          this.sportsData = doc.data()
          this.sportsGoal = this.sportsData.dailyTarget.exercise
        })
        .catch((err) => {
          console.log("Error getting document:", err);
        });
    },
    getSportsData() {
      database.collection("Users").doc(this.email).collection("Daily").doc(this.format_date(new Date())).get()
      //database.collection("Users").doc(this.email).collection("Daily").doc("02112020").get()
        .then((doc) => {
          this.data = doc.data()
          console.log(this.format_date(new Date()))
          console.log(this.data)
          console.log(this.data.evening.exercise)
          this.sportsAmountToday = this.data.evening.exercise
        })        
        .catch((err) => {
          this.newPost.error = err.message;
        });
    }
  }
};
</script>
<style></style>
