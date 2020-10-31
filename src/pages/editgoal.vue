<template>
  <div>
    <div class="page-header clear-filter" color="orange">
      <div
        class="page-header-image"
        style="background-image: url('img/inputdata-bg.jpg'); opacity: 0.4"
        v-bind:style="(height = '100px')"
      ></div>

      <form>
        <h3 class="greeting" style="color: black">
          Set up your goals and start tracking!
        </h3>
        <h2 style="color: black">Exercise</h2>

        <div class="form-group">
          <label for="inputExerciseDuration" style="color: black"
            >Duration of Exercise (min/day)*</label
          >
          <input
            type="number"
            class="form-control"
            id="inputExerciseDuration"
            placeholder="45"
            v-model="item.exercise"
            required
          />
        </div>

        <h2 style="color: black">Wellness</h2>
        <div class="form-group">
          <label for="inputWorkDuration" style="color: black"
            >Duration of Working (hr/day)*</label
          >
          <input
            type="float"
            class="form-control"
            id="inputWorkDuration"
            placeholder="7"
            v-model="item.work"
            required
          />
        </div>

        <div class="form-group">
          <label for="inputLeisureDuration" style="color: black"
            >Duration of Leisure (hr/day)*</label
          >
          <input
            type="float"
            class="form-control"
            id="inputLeisureDuration"
            placeholder="1.5"
            v-model="item.leisure"
            required
          />
        </div>
        <h2 style="color: black">Hygiene</h2>
        <div class="form-row">
          <div class="form-group col-md-4">
            <label for="inputTemperature" style="color: black"
              >Temperature Taking (times/day)*</label
            >
            <input
              type="number"
              class="form-control"
              id="inputTemperature"
              placeholder="2"
              v-model="item.temperature"
              required
            />
          </div>
          <div class="form-group col-md-4">
            <label for="inputMask" style="color: black"
              >Washing masks (times/day)*</label
            >
            <input
              type="number"
              class="form-control"
              id="inputMask"
              placeholder="1"
              v-model="item.mask"
              required
            />
          </div>
          <div class="form-group col-md-4">
            <label for="inputHands" style="color: black"
              >Wasing hands (times/day)*</label
            >
            <input
              type="number"
              class="form-control"
              id="inputHands"
              placeholder="5"
              v-model="item.hand"
              required
            />
          </div>
        </div>

        <h2 style="color: black">Food</h2>
        <h5 style="color: black">
          Choose a level between our recommended range:
        </h5>

        <div class="form-group">
          <label for="inputCalory" style="color: black"
            >Daily calories intake (kCal/day) *</label
          >
          <input
            type="number"
            class="form-control"
            id="inputHands"
            placeholder="1850"
            v-model="item.calorie"
            required
          />
        </div>

        <button class="btn btn-primary btn-round" v-on:click="addItem">
          SUBMIT
        </button>
      </form>
    </div>
  </div>
</template>
<script>
//import { Tabs, TabPane } from '@/components';
import auth, { database } from "../firebase.js";

export default {
  name: "editgoal",
  bodyClass: "form-page",
  components: {
    //Tabs,
    //TabPane
  },
  data() {
    return {
      item: {
        exercise: "",
        work: "",
        leisure: "",
        mask: "",
        temperature: "",
        calorie: "",
        hand: "",
      },
    };
  },
  methods: {
    addItem() {
      const usersRef = database.collection("Users").doc(auth.currentUser.email);
      usersRef.get().then((docSnapshot) => {
        if (docSnapshot.exists) {
          this.item.flag = true;
        } else {
          this.item.flag = false;
        }
      });
      
      if (
        this.item.exercise == "" ||
        this.item.work == "" ||
        this.item.leisure == "" ||
        this.item.mask == "" ||
        this.item.temperature == "" ||
        this.item.calorie == "" ||
        this.item.hand == ""
      ) {
        alert("Please fill in empty fields!");
      } else if (!this.item.flag) {
        console.log("Health data is empty");
        alert("Please fill in health data first!");
      } else {
        console.log("User daily goals input");
        alert("You have successfully submitted daily goals!");
        database
          .collection("Users")
          .doc(auth.currentUser.email)
          .update({
            dailyTarget: {
              exercise: this.item.exercise,
              work: this.item.work,
              leisure: this.item.leisure,
              mask: this.item.mask,
              temperature: this.item.temperature,
              calorie: this.item.calorie,
              hand: this.item.hand,
            },
          })
          .catch((err) => {
            this.item.error = err.message;
          });
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
