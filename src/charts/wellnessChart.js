import { Bar } from 'vue-chartjs'
import auth from "../firebase.js";
import { database } from "../firebase.js";

export default {
  extends: Bar,
  data: function () {
    return {
      datacollection: {
        labels: [],
        datasets: [{
          label: "Work Hours",
          backgroundColor: "#0c6dad",
          data: []
        },
        {
          label: "Leisure Hours",
          backgroundColor: "#7cbce6",
          data: []
        }]
      },
      options: {
        scales: {
          xAxes: [{
            stacked: true
          }],
          yAxes: [{
            ticks: { beginAtZero: true },
            stacked: true
          }]
        },

        legend: { display: true },
        title: {
          display: true,
          text: 'Did I have work life balance?'
        },
        responsive: true,
        maintainAspectRatio: false
      }
    }
  },
  computed: {
    user() {
      return auth.currentUser;
    },
    email() {
      var email;
      if (this.user) {
        email = this.user.email;
      }
      return email;
    },
  },
  methods: {
    fetchItems: function () {
      database.collection('Users').doc(this.email).collection("Daily").orderBy('time').limit(7).get().then(querySnapShot => {
        querySnapShot.forEach(doc => {
          if (doc.data().evening) {
            this.datacollection.labels.push(doc.data().time)
            this.datacollection.datasets[0].data.push(doc.data().evening.work)
            this.datacollection.datasets[1].data.push(doc.data().evening.leisure)
          }
        })
        this.renderChart(this.datacollection, this.options)
      })
    }
  },
  created() {
    this.fetchItems()
  }
}