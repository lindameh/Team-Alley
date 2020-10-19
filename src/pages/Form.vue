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
              >What did you eat for breakfast?*</label
            >
            <input
              type="text"
              class="form-control"
              id="inputBreakfast"
              placeholder="Log your breakfast here!"
            />
          </div>
          <div class="form-group col-md-4">
            <label for="inputWashHands" style="color: black"
              >Did you wash your hands before breakfast?*</label
            >
            <select id="inputWashHands" class="form-control">
              <option selected>YES</option>
              <option>NO</option>
            </select>
          </div>
          <div class="form-group col-md-4">
            <label for="inputTemperature" style="color: black"
              >Body Temperature(°C)*</label
            >
            <input
              type="float"
              class="form-control"
              id="inputTemperature"
              placeholder="36.5"
            />
          </div>
        </div>

        <button
          type="submit"
          class="btn btn-primary btn-round"
          @click="alertMsg"
        >
          Submit for Morning
        </button>

        <br /><br />
        <h2 class="greeting" style="color: black">Good Afternoon!</h2>
        <div class="form-row">
          <div class="form-group col-md-4">
            <label for="inputLunch" style="color: black"
              >What did you eat for lunch?*</label
            >
            <input
              type="text"
              class="form-control"
              id="inputLunch"
              placeholder="Log your lunch here!"
            />
          </div>
          <div class="form-group col-md-4">
            <label for="inputWashHands" style="color: black"
              >Did you wash your hands before lunch?*</label
            >
            <select id="inputWashHands" class="form-control">
              <option selected>YES</option>
              <option>NO</option>
            </select>
          </div>
          <div class="form-group col-md-4">
            <label for="inputExerciseDuration" style="color: black"
              >Duration of Exercise (min)*</label
            >
            <input
              type="number"
              class="form-control"
              id="inputExerciseDuration"
              placeholder="10"
            />
          </div>
        </div>
        <div class="form-row">
          <div class="form-group col-md-6">
            <label for="inputWorkDuration" style="color: black"
              >Duration of Work (hour)*</label
            >
            <input
              type="number"
              class="form-control"
              id="inputWorkDuration"
              placeholder="3"
            />
          </div>
          <div class="form-group col-md-6">
            <label for="inputLeisureDuration" style="color: black"
              >Duration of Leisure (hour)*</label
            >
            <input
              type="number"
              class="form-control"
              id="inputLeisureDuration"
              placeholder="1"
            />
          </div>
        </div>
        <button
          type="submit"
          class="btn btn-primary btn-round"
          @click="alertMsg"
        >
          Submit for Afternoon
        </button>

        <br /><br />
        <h2 class="greeting" style="color: black">Good Evening!</h2>
        <div class="form-row">
          <div class="form-group col-md-4">
            <label for="inputDinner" style="color: black"
              >What did you eat for dinner?*</label
            >
            <input
              type="text"
              class="form-control"
              id="inputDinner"
              placeholder="Log your dinner here!"
            />
          </div>
          <div class="form-group col-md-4">
            <label for="inputWashHands" style="color: black"
              >Did you wash your hands before dinner?*</label
            >
            <select id="inputWashHands" class="form-control">
              <option selected>YES</option>
              <option>NO</option>
            </select>
          </div>
          <div class="form-group col-md-4">
            <label for="inputExerciseDuration" style="color: black"
              >Duration of Exercise (min)*</label
            >
            <input
              type="number"
              class="form-control"
              id="inputExerciseDuration"
              placeholder="10"
            />
          </div>
        </div>
        <div class="form-row">
          <div class="form-group col-md-4">
            <label for="inputWorkDuration" style="color: black"
              >Duration of Work (hour)*</label
            >
            <input
              type="number"
              class="form-control"
              id="inputWorkDuration"
              placeholder="3"
            />
          </div>
          <div class="form-group col-md-4">
            <label for="inputLeisureDuration" style="color: black"
              >Duration of Leisure (hour)*</label
            >
            <input
              type="number"
              class="form-control"
              id="inputLeisureDuration"
              placeholder="1"
            />
          </div>
          <div class="form-group col-md-4">
            <label for="inputTemperature" style="color: black"
              >Body Temperature(°C)*</label
            >
            <input
              type="float"
              class="form-control"
              id="inputTemperature"
              placeholder="36.5"
            />
          </div>
        </div>
        <button class="btn btn-primary btn-round" @click="alertMsg">
          Submit for Evening
        </button>
      </form>
    </div>
  </div>
</template>
<script>
//import { Tabs, TabPane } from '@/components';

export default {
  name: "form",
  bodyClass: "form-page",
  components: {
    //Tabs,
    //TabPane
  },
  methods: {
    alertMsg() {
      alert(
        "You have submitted the form successfully!" + "\n" + "Continue Logging!"
      );
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
