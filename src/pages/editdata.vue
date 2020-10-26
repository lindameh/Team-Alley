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
            <select id="inputGender" class="form-control">
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
          />
        </div>
        <div class="form-group">
          <label for="inputWeight" style="color: black">Weight (kg)*</label>
          <input
            type="float"
            class="form-control"
            id="inputWeight"
            placeholder="60.0"
          />
        </div>

        <div class="form-group">
          <label for="inputPhysicalActivity" style="color: black"
            >Physical Activity Level*</label
          >
          <select id="inputPhysicalActivity" class="form-control">
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
          />
        </div>
        <button class="btn btn-primary btn-round" @click="alertMsg">
          SUBMIT
        </button>
      </form>
    </div>
  </div>
</template>
<script>
//import { Tabs, TabPane } from '@/components';

export default {
  name: "editdata",
  bodyClass: "form-page",
  components: {
    //Tabs,
    //TabPane
  },
  methods: {
    alertMsg() {
      alert("You have successfully submitted health data!");
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
