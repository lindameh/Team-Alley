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
              v-model="item.handMorning"
            />
          </div>
        </div>

        <button
          type="submit"
          class="btn btn-primary btn-round"
          v-on:click="addMorning"
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
              v-model="item.handAfternoon"
            />
          </div>
        </div>

        <button
          type="submit"
          class="btn btn-primary btn-round"
          v-on:click="addAfternoon"
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
              type="text"
              class="form-control"
              id="inputHand"
              placeholder="3"
              v-model="item.handEvening"
            />
          </div>
          <div class="form-group col-md-4">
            <label for="inputTemperature" style="color: black"
              >No. of times of taking temperature today*</label
            >
            <input
              type="text"
              class="form-control"
              id="inputTemperature"
              placeholder="2"
              v-model="item.temperature"
            />
          </div>
          <div class="form-group col-md-4">
            <label for="inputMask" style="color: black"
              >No. of times of of washing masks today*</label
            >
            <input
              type="text"
              class="form-control"
              id="inputMask"
              placeholder="1"
              v-model="item.mask"
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
              v-model="item.work"
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
              v-model="item.leisure"
            />
          </div>
          <div class="form-group col-md-4">
            <label for="inputTemperature" style="color: black"
              >Duration of exercise today (min)*</label
            >
            <input
              type="float"
              class="form-control"
              id="inputExercise"
              placeholder="80"
              v-model="item.exercise"
            />
          </div>
        </div>
        <button class="btn btn-primary btn-round" v-on:click="addEvening">
          Submit for Evening
        </button>
      </form>
    </div>
  </div>
</template>
<script>
//import { Tabs, TabPane } from '@/components';
import auth, { database } from "../firebase.js";
import moment from "moment";

export default {
  name: "form",
  bodyClass: "form-page",
  components: {
    //Tabs,
    //TabPane
  },
  data() {
    return {
      item: {
        time: "",
        breakfast1: "",
        breakfast2: "",
        handMorning: "",
        lunch1: "",
        lunch2: "",
        handAfternoon: "",
        dinner1: "",
        dinner2: "",
        dinner3: "",
        exercise: "",
        work: "",
        leisure: "",
        temperature: "",
        handEvening: "",
        mask: "",
        unique: "",
      },
    };
  },
  methods: {
    format_date(value) {
      if (value) {
        return moment(String(value)).format("DD/MM/YYYY");
      }
    },

    addMorning() {
      this.item.unique = String(moment(String(new Date())).format("DDMMYYYY"));
      if (
        this.item.breakfast1 == "" ||
        this.item.handMorning == ""
      ) {
        alert("Please fill in empty fields!");
      } else {
        this.item.time = this.format_date(new Date());

        alert("You have successfully submitted morning log!");
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
        console.log("successful log morning data");
      }
    },

    addAfternoon() {
      this.item.unique = String(moment(String(new Date())).format("DDMMYYYY"));
      if (
        this.item.lunch1 == "" ||
        this.item.handAfternoon == ""
      ) {
        alert("Please fill in empty fields!");
      } else {
        alert("You have successfully submitted afternoon log!");
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
          console.log("successful log afternoon data");
      }
    },

    addEvening() {
      this.item.unique = String(moment(String(new Date())).format("DDMMYYYY"));
      if (
        this.item.dinner1 == "" ||
        this.item.handEvening == "" ||
        this.item.exercise == "" ||
        this.item.mask == "" ||
        this.item.temperature == "" ||
        this.item.leisure == "" ||
        this.item.work == ""
      ) {
        alert("Please fill in empty fields!");
      } else {
        alert("You have successfully submitted evening log!");
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
          console.log("successful log evening data");
      }
    },
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