import { Line } from 'vue-chartjs'

export default {
  extends: Line,
  data: function () {
    return {
      datacollection: {
        labels: ['Sept-17', 'Sept-18', 'Sept-19', 'Sept-20', 'Sept-21', 'Sept-22', 'Sept-23'],
        datasets: [{
          data: [50,30,40,20,60,70,25],
          label: "Sports",
          borderColor: "#c45850",
          fill: false
        }]
      },
      options: {
        title: {
          display: true,
          text: 'Exercise Duration (in minutes)'
        },
        responsive: true,
        maintainAspectRatio: false
      }
    }
  },
  mounted() {
    this.renderChart(this.datacollection, this.options)
  }
}