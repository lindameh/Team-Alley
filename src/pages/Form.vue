<template>
  <div>
    <div class="page-header clear-filter" color="orange">
      <div
        class="page-header-image"
        style="background-image: url('img/form-bg.jpg'); opacity: 0.5"
        v-bind:style="(height = '100px')"
      ></div>

      <form>
        <h2 class="greeting" style="color: black">Good Morning!</h2>
        <div class="form-row">
          <div class="form-group col-md-4">
            <label for="inputBreakfast" style="color: black"
              >Breakfast Food #1*</label
            >
            <input
              type="text"
              class="form-control"
              id="inputBreakfast"
              placeholder="Bread"
              v-model="item.breakfast1"
            />
          </div>
          <div class="form-group col-md-4">
            <label for="inputBreakfast" style="color: black"
              >Breakfast Food #2*</label
            >
            <input
              type="text"
              class="form-control"
              id="inputBreakfast"
              placeholder="Milk"
              v-model="item.breakfast2"
            />
          </div>
          <div class="form-group col-md-4">
            <label for="inputWashHands" style="color: black"
              >No. of times of washing hands in the morning*</label
            >
            <input
              type="number"
              class="form-control"
              id="inputHand"
              placeholder="3"
              v-model.number="item.handMorning"
            />
          </div>
        </div>

        <button
          type="submit"
          class="btn btn-primary btn-round"
          v-on:click.prevent="addMorning"
        >
          Submit for Morning
        </button>

        <br /><br />
        <h2 class="greeting" style="color: black">Good Afternoon!</h2>
        <div class="form-row">
          <div class="form-group col-md-4">
            <label for="inputLunch" style="color: black">Lunch Food #1*</label>
            <input
              type="text"
              class="form-control"
              id="inputLunch"
              placeholder="chicken"
              v-model="item.lunch1"
            />
          </div>
          <div class="form-group col-md-4">
            <label for="inputLunch" style="color: black">Lunch Food #2*</label>
            <input
              type="text"
              class="form-control"
              id="inputLunch"
              placeholder="rice"
              v-model="item.lunch2"
            />
          </div>
          <div class="form-group col-md-4">
            <label for="inputHand" style="color: black"
              >No. of times of washing hands in the afternoon*</label
            >
            <input
              type="number"
              class="form-control"
              id="inputHand"
              placeholder="6"
              v-model.number="item.handAfternoon"
            />
          </div>
        </div>

        <button
          type="submit"
          class="btn btn-primary btn-round"
          v-on:click.prevent="addAfternoon"
        >
          Submit for Afternoon
        </button>

        <br /><br />
        <h2 class="greeting" style="color: black">Good Evening!</h2>
        <div class="form-row">
          <div class="form-group col-md-4">
            <label for="inputDinner" style="color: black"
              >Dinner Food #1*</label
            >
            <input
              type="text"
              class="form-control"
              id="inputDinner"
              placeholder="Ramen"
              v-model="item.dinner1"
            />
          </div>
          <div class="form-group col-md-4">
            <label for="inputDinner" style="color: black"
              >Dinner Food #2*</label
            >
            <input
              type="text"
              class="form-control"
              id="inputDinner"
              placeholder="Kimchi"
              v-model="item.dinner2"
            />
          </div>
          <div class="form-group col-md-4">
            <label for="inputDinner" style="color: black"
              >Dinner Food #3*</label
            >
            <input
              type="text"
              class="form-control"
              id="inputDinner"
              placeholder="Beer"
              v-model="item.dinner3"
            />
          </div>
        </div>
        <div class="form-row">
          <div class="form-group col-md-4">
            <label for="inputWashHands" style="color: black"
              >No. of times of washing hands in the evening*</label
            >
            <input
              type="number"
              class="form-control"
              id="inputHand"
              placeholder="3"
              v-model.number="item.handEvening"
            />
          </div>
          <div class="form-group col-md-4">
            <label for="inputTemperature" style="color: black"
              >No. of times of taking temperature today*</label
            >
            <input
              type="number"
              class="form-control"
              id="inputTemperature"
              placeholder="2"
              v-model.number="item.temperature"
            />
          </div>
          <div class="form-group col-md-4">
            <label for="inputMask" style="color: black"
              >No. of times of of washing masks today*</label
            >
            <input
              type="number"
              class="form-control"
              id="inputMask"
              placeholder="1"
              v-model.number="item.mask"
            />
          </div>
        </div>
        <div class="form-row">
          <div class="form-group col-md-4">
            <label for="inputWorkDuration" style="color: black"
              >Duration of work today (hour)*</label
            >
            <input
              type="number"
              class="form-control"
              id="inputWorkDuration"
              placeholder="7"
              v-model.number="item.work"
            />
          </div>
          <div class="form-group col-md-4">
            <label for="inputLeisureDuration" style="color: black"
              >Duration of leisure today (hour)*</label
            >
            <input
              type="number"
              class="form-control"
              id="inputLeisureDuration"
              placeholder="1"
              v-model.number="item.leisure"
            />
          </div>
          <div class="form-group col-md-4">
            <label for="inputTemperature" style="color: black"
              >Duration of exercise today (min)*</label
            >
            <input
              type="number"
              class="form-control"
              id="inputExercise"
              placeholder="80"
              v-model.number="item.exercise"
            />
          </div>
        </div>
        <button
          class="btn btn-primary btn-round"
          v-on:click.prevent="addEvening"
        >
          Submit for Evening
        </button>
      </form>
    </div>
  </div>
</template>
<script>
import auth, { database } from "../firebase.js";
import moment from "moment";

export default {
  name: "dailyForm",
  bodyClass: "form-page",
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
  data() {
    return {
      item: {
        time: "",
        breakfast1: "",
        breakfast2: "",
        handMorning: 0,
        lunch1: "",
        lunch2: "",
        handAfternoon: 0,
        dinner1: "",
        dinner2: "",
        dinner3: "",
        exercise: 0,
        work: 0,
        leisure: 0,
        temperature: 0,
        handEvening: 0,
        mask: 0,
        unique: "",
      },
      goals: {},
      dailyData: {},
    };
  },
  methods: {
    format_date(value) {
      if (value) {
        return moment(String(value)).format("YYYYMMDD");
      }
    },

    addMorning() {
      this.item.unique = String(moment(String(new Date())).format("YYYYMMDD"));
      if (this.item.handMorning === "") {
        alert("Please fill in empty fields!");
      } else {
        this.item.time = this.format_date(new Date());
        alert("You have successfully submitted morning log!");
        this.dailyData.morning = {
          breakfast1: this.item.breakfast1,
          breakfast2: this.item.breakfast2,
          handMorning: this.item.handMorning,
        };
        database
          .collection("Users")
          .doc(auth.currentUser.email)
          .collection("Daily")
          .doc(this.item.unique)
          .set({
            time: this.item.time,
            morning: {
              breakfast1: this.item.breakfast1,
              breakfast2: this.item.breakfast2,
              handMorning: this.item.handMorning,
            },
          })
          .catch((err) => {
            this.item.error = err.message;
          });
        this.updateScore();
        console.log("successful log morning data");
      }
    },

    addAfternoon() {
      this.item.unique = String(moment(String(new Date())).format("DDMMYYYY"));
      if ( this.item.handAfternoon === "") {
        alert("Please fill in empty fields!");
      } else {
        alert("You have successfully submitted afternoon log!");
        this.dailyData.afternoon = {
          lunch1: this.item.lunch1,
          lunch2: this.item.lunch2,
          handAfternoon: this.item.handAfternoon,
        };
        database
          .collection("Users")
          .doc(auth.currentUser.email)
          .collection("Daily")
          .doc(this.item.unique)
          .update({
            afternoon: {
              lunch1: this.item.lunch1,
              lunch2: this.item.lunch2,
              handAfternoon: this.item.handAfternoon,
            },
          })
          .catch((err) => {
            this.item.error = err.message;
          });
        this.updateScore();
        console.log("successful log afternoon data");
      }
    },

    addEvening() {
      this.item.unique = String(moment(String(new Date())).format("DDMMYYYY"));
      if (
        
        this.item.handEvening === "" ||
        this.item.exercise === "" ||
        this.item.mask === "" ||
        this.item.temperature === "" ||
        this.item.leisure === "" ||
        this.item.work === ""
      ) {
        alert("Please fill in empty fields!");
      } else {
        alert("You have successfully submitted evening log!");
        this.dailyData.evening = {
          dinner1: this.item.dinner1,
          dinner2: this.item.dinner2,
          dinner3: this.item.dinner3,
          handEvening: this.item.handEvening,
          exercise: this.item.exercise,
          work: this.item.work,
          mask: this.item.mask,
          temperature: this.item.temperature,
          leisure: this.item.leisure,
        };
        database
          .collection("Users")
          .doc(auth.currentUser.email)
          .collection("Daily")
          .doc(this.item.unique)
          .update({
            evening: {
              dinner1: this.item.dinner1,
              dinner2: this.item.dinner2,
              dinner3: this.item.dinner3,
              handEvening: this.item.handEvening,
              exercise: this.item.exercise,
              work: this.item.work,
              mask: this.item.mask,
              temperature: this.item.temperature,
              leisure: this.item.leisure,
            },
          })
          .catch((err) => {
            this.item.error = err.message;
          });
        this.updateScore();
        console.log("successful log evening data");
      }
    },

    //method to update score after user submit morning, afternoon or evening form
    updateScore() {
      var foodProgress = 0;
      var handProgress = 0;
      var temperatureProgress = 0;
      var maskProgress = 0;
      var workProgress = 0;
      var leisureProgress = 0;
      var sportsProgress = 0;
      if (this.dailyData.morning) {
        foodProgress = foodProgress + 300;
        handProgress = handProgress + this.dailyData.morning.handMorning;
      }
      if (this.dailyData.afternoon) {
        foodProgress = foodProgress + 500;
        handProgress = handProgress + this.dailyData.afternoon.handAfternoon;
      }
      if (this.dailyData.evening) {
        foodProgress = foodProgress + 500;
        handProgress = handProgress + this.dailyData.evening.handEvening;
        temperatureProgress =
          temperatureProgress + this.dailyData.evening.temperature;
        maskProgress = maskProgress + this.dailyData.evening.mask;
        workProgress = workProgress + this.dailyData.evening.work;
        leisureProgress = leisureProgress + this.dailyData.evening.leisure;
        sportsProgress = sportsProgress + this.dailyData.evening.exercise;
      }
      var sportsScore = Math.min(sportsProgress / this.goals.exercise, 1) * 100;
      var hygieneScore = Math.min(maskProgress / this.goals.mask, 1) * 50 + Math.min(handProgress / this.goals.hand, 1) * 50;
      var wellnessScore = Math.min(leisureProgress / this.goals.leisure, 1) * 50 + Math.min(temperatureProgress / this.goals.temperature, 1) * 50;
      var foodScore = Math.min(Math.max(1 - Math.abs(foodProgress - this.goals.calorie) / this.goals.calorie, 0), 1) * 100;
      var overallScore =
        (sportsScore + hygieneScore + wellnessScore + foodScore) / 4;
      database
        .collection("Users")
        .doc(auth.currentUser.email)
        .collection("Daily")
        .doc(this.item.unique)
        .update({
          sportsScore: sportsScore,
          hygieneScore: hygieneScore,
          wellnessScore: wellnessScore,
          foodScore: foodScore,
          overallScore: overallScore,
        })
        .catch((err) => {
          this.item.error = err.message;
        });
      database
        .collection("Users")
        .doc(auth.currentUser.email)
        .update({
            sportsScore: sportsScore,
            hygieneScore: hygieneScore,
            wellnessScore: wellnessScore,
            foodScore: foodScore,
            overallScore: overallScore,
            scoreDate: this.item.unique,
        })
        .catch((err) => {
          this.item.error = err.message;
        });
      console.log("Update score successfully");
    },

    //method to get user daily goal from firebase
    getGoals() {
      database
        .collection("Users")
        .doc(this.email)
        .get()
        .then((doc) => {
          if (doc.exists) {
            this.goals = doc.data().dailyTarget;
            console.log("Get goal successfully");
          } else {
            console.log("no goal");
          }
        })
        .catch((err) => {
          console.log("Error getting document:", err);
        });
    },

    // method to get user daily data from firebase
    getData() {
      database
        .collection("Users")
        .doc(this.email)
        .collection("Daily")
        .doc(this.format_date(new Date()))
        .get()
        //database.collection("Users").doc(this.email).collection("Daily").doc("03112020").get()
        .then((doc) => {
          if (doc.exists) {
            this.dailyData = doc.data();
            console.log("Get daily data successfully");
          } else {
            console.log("no daily data");
          }
        })
        .catch((err) => {
          this.newPost.error = err.message;
        });
    },
  },
  created() {
    this.getGoals();
    this.getData();
  },
};
</script>
<style scoped>
form {
  padding-top: 80px;
  padding-bottom: 0px;
  padding-left: 50px;
  padding-right: 50px;
  width: 90%;
  height: 1500px;
  min-height: calc(100vh - 80px);
}
.form-control {
  height: 80%;
}
</style>