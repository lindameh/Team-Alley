import { Bar } from 'vue-chartjs'

export default {
  extends: Bar,
  data: function () {
    return {
      datacollection: {
        labels: ['Sept-17', 'Sept-18', 'Sept-19', 'Sept-20', 'Sept-21', 'Sept-22', 'Sept-23'],
        datasets: [{
          label: "Wellness",
          backgroundColor: "#3e95cd",
          data: [90, 82, 85, 92, 88, 85, 95]
        }]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: { beginAtZero: true }
          }]
        },

        legend: { display: true },
        title: {
          display: true,
          text: 'Work Life Balance Index (Out of 100)'
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