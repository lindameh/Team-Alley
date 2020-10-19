<template>
  <div>
    <div class="section">
      <div class="container">
        <h3 class="title">My Progress</h3>
        <h3>{{ todaydate }}</h3>
        <h4>Sports</h4>
        <n-progress type="primary" :value="60" show-value> </n-progress>
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
    };
  },
};
</script>
<style></style>
