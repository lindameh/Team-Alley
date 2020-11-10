import { Line } from 'vue-chartjs'
import auth from "../firebase.js";
import { database } from "../firebase.js";

export default {
  extends: Line,
  data: function () {
    return {
      datacollection: {
        labels: [],
        datasets: [{
          data: [],
          label: "Calorie Intake (kCal)",
          borderColor: "rgba(235, 35, 48)",
          backgroundColor: "rgba(235, 35, 48, 0.5)",
          borderWidth: 2,
          fill: true
        }]
      },
      options: {
        title: {
          display: true,
          text: 'How much calories did I take in?'
        },
        scales: {
          yAxes: [{
            ticks: { beginAtZero: true }
          }]
        },
        legend: { display: false },
        responsive: true,
        maintainAspectRatio: false,
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
            this.datacollection.datasets[0].data.push(doc.data().calorieTotal)
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