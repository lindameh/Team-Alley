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
          label: "Temperature Taking",
          borderColor: "rgba(245, 203, 37)",
          fill: false
        },
        {
          data: [],
          label: "Mask Washing",
          borderColor: "rgba(103, 214, 190)",
          fill: false
        },
        {
          data: [],
          label: "Hand Washing",
          borderColor: "rgba(37, 158, 245)", 
          fill: false
        }]
      },
      options: {
        title: {
          display: true,
          text: 'How many times did I do protective measures during COVID?'
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
            this.datacollection.datasets[0].data.push(doc.data().evening.temperature)
            this.datacollection.datasets[1].data.push(doc.data().evening.mask)
            this.datacollection.datasets[2].data.push(doc.data().handTotal)
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