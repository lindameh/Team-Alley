<template>
  <div>
    <div class="section">
      <div class="container">
        <div id="chart">
          <piechart></piechart>
        </div>
        <div id="chart">
          <barchart></barchart>
        </div>
        <div id="chart">
          <doughnut></doughnut>
        </div>
        <div id="chart">
          <linechart></linechart>
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

export default {
  name: "achievement",
  components: {
    piechart,
    barchart,
    doughnut,
    linechart
  },
};
</script>
<style></style>
