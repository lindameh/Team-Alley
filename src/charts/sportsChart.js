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
          label: "Exercise Duration (min)",
          borderColor: "rgba(245, 203, 37)",
          backgroundColor: "rgba(245, 203, 37, 0.5)",
          borderWidth: 2,
          fill: true
        }]
      },
      options: {
        title: {
          display: true,
          text: 'How many minutes did I exercise?'
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
            this.datacollection.datasets[0].data.push(doc.data().evening.exercise)
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