<template>
  <div>
    <div class="page-header clear-filter" color="orange">
      <div
        class="page-header-image"
        style="background-image: url('img/inputdata-bg.jpg'); opacity: 0.4"
        v-bind:style="(height = '100px')"
      ></div>

      <form>
        <h2 class="greeting" style="color: black">We need your health data!</h2>
        <div class="form-row">
          <div class="form-group col-md-6">
            <label for="inputGender" style="color: black">Gender*</label>
            <select
              id="inputGender"
              class="form-control"
              v-model="item.gender"
              required
            >
              <option selected>FEMALE</option>
              <option>MALE</option>
            </select>
          </div>
          <div class="form-group col-md-6">
            <label for="inputAge" style="color: black">Age*</label>
            <input
              type="number"
              class="form-control"
              id="inputAge"
              v-model="item.age"
              required
              placeholder="30"
            />
          </div>
        </div>

        <div class="form-group">
          <label for="inputHeight" style="color: black">Height (cm)*</label>
          <input
            type="number"
            class="form-control"
            id="inputTemperature"
            placeholder="170"
            v-model="item.height"
            required
          />
        </div>
        <div class="form-group">
          <label for="inputWeight" style="color: black">Weight (kg)*</label>
          <input
            type="float"
            class="form-control"
            id="inputWeight"
            placeholder="60.0"
            v-model="item.weight"
            required
          />
        </div>

        <div class="form-group">
          <label for="inputPhysicalActivity" style="color: black"
            >Physical Activity Level*</label
          >
          <select
            id="inputPhysicalActivity"
            class="form-control"
            v-model="item.pal"
            required
          >
            <option selected>Sedentary (little or no exercise)</option>
            <option>Moderately active</option>
            <option>Vigorously active</option>
            <option>Extremely active</option>
          </select>
        </div>
        <div class="form-group">
          <label for="inputWeightGoal" style="color: black"
            >Weight Goal (kg)*</label
          >
          <input
            type="float"
            class="form-control"
            id="inputExerciseDuration"
            placeholder="60.0"
            v-model="item.weightGoal"
            required
          />
        </div>
        <div class="form-group">
          <label for="inputSpecialCondition" style="color: black"
            >Special Physical Condition*</label
          >
          <input
            type="text"
            class="form-control"
            id="inputExerciseDuration"
            placeholder="None"
            v-model="item.specialPhysicalCondition"
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
import auth, { database } from "../firebase.js";

export default {
  name: "editdata",
  bodyClass: "form-page",
  components: {},
  data() {
    return {
      item: {
        name: "",
        gender: "",
        height: "",
        weight: "",
        pal: "",
        weightGoal: "",
        specialPhysicalCondition: "",
        age: "",
        calorieMax: "",
        calorieMin: "",
        l: 0,
        s:0,
        BMR:0,

      },
    };
  },
  methods: {
    computeCal() {
      if (this.item.pal == "Sedentary (little or no exercise)") {
        this.item.l = 1.2;
      } else if (this.item.pal == "Moderately active") {
        this.item.l = 1.375;
      } else if (this.item.pal == "Vigorously active") {
        this.item.l = 1.55;
      } else {
        this.item.l = 1.8;
      }

      if (this.item.gender == "FEMALE") {
        this.item.s = -161;
      } else {
        this.item.s = 5;
      }
      this.item.BMR =
        (10 * this.item.weight +
          6.25 * this.item.height -
          5 * this.item.age +
          this.item.s) *
        this.item.l;
      this.item.calorieMax = this.item.BMR + 500;
      this.item.calorieMin = this.item.BMR - 500;
    },
    addItem() {
      if (
        this.item.gender == "" ||
        this.item.height == "" ||
        this.item.weight == "" ||
        this.item.pal == "" ||
        this.item.weightGoal == "" ||
        this.item.specialPhysicalCondition == "" ||
        this.item.age == ""
      ) {
        alert("Please fill in empty fields!");
      } else {
        console.log("User health data input");
        alert("You have successfully submitted health data!");
        this.computeCal();
        database
          .collection("Users")
          .doc(auth.currentUser.email)
          .update({
            gender: this.item.gender,
            height: this.item.height,
            weight: this.item.weight,
            pal: this.item.pal,
            weightGoal: this.item.weightGoal,
            specialPhysicalCondition: this.item.specialPhysicalCondition,
            age: this.item.age,
            calorieMax: this.item.calorieMax,
            calorieMin: this.item.calorieMin,
            name: auth.currentUser.displayName,
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
