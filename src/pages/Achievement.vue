<template>
  <div>
    <div class="section">
      <div class="container">
        <h3 class="title">My Progress</h3>
        <!--Remove after testing-->
        {{getSportsAmountToday}}
        {{getSportsGoalToday}}
        <br/>
        {{email}}
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
      sportsGoal: 0
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
    dateToday() {
      return format_date(new Date())
    },
    dailySportsProgress() {
      return this.getSportsAmountToday / this.getSportsGoalToday * 100; 
    },
    getSportsAmountToday() {
      //TODO
      return 5
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
        return moment(String(value)).format('DD/MM/YYYY')
      }
    },
    getSportsGoal() {
      database.collection("Users").doc(this.email).get()
        // .then((querySnapshot) => {
        //   querySnapshot.forEach((doc) => {
        //     console.log(doc.data())
        //   })
        // })
        .then((doc) => {
          if (doc.exists) console.log('exisits')
          console.log(doc)
          data = doc.data()
          console.log(data)
          this.sportsGoal = user.dailyTarget.exercise
        })
        .catch((err) => {
          console.log("Error getting document:", err);
        });
    },
    getSportsData() {
      database.collection("Users").doc(this.email).collection("Daily").doc(this.dateToday).get()
        .then((snapShot) => {
          doc = snapShot.doc
          sportsToday = 0
          if (doc.evening.exercise) {
            sportsToday = doc.evening.exercise
          }
          this.sportsAmountToday = sportsToday
        })
        .catch((err) => {
          this.newPost.error = err.message;
        });
    }
  }
};
</script>
<style></style>
