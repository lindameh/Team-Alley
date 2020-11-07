import { Doughnut } from 'vue-chartjs'
import auth from "../firebase.js";
import { database } from "../firebase.js";

export default {
  extends: Doughnut,
  data: function () {
    return {
      datacollection: {
        labels: [],
        datasets: [{
          backgroundColor: [],
          data: []
        }]
      },
      options: {
        title: {
          display: true,
          text: 'How often did I eat these food items?'
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
        let food = []
        querySnapShot.forEach(doc => {
          if (doc.data().morning) {
            food.push(doc.data().morning.breakfast1)
            food.push(doc.data().morning.breakfast2)
          }
          if (doc.data().afternoon) {
            food.push(doc.data().afternoon.lunch1)
            food.push(doc.data().afternoon.lunch2)
          }
          if (doc.data().evening) {
            food.push(doc.data().evening.dinner1)
            food.push(doc.data().evening.dinner2)
            food.push(doc.data().evening.dinner3)
          }
        })
        var freq = []
        freq = this.freqCount(food)
        this.datacollection.labels = freq[0]
        this.datacollection.datasets[0].data = freq[1]
        this.datacollection.datasets[0].backgroundColor = freq[2]
        this.renderChart(this.datacollection, this.options)
      })
    },
    freqCount(arr) {
      var a = [], b = [], c = [], prev;
      var randomColor = function () {
        var randomNum = Math.random()
        var r = Math.floor(160 + randomNum * 95);
        var g = Math.floor(randomNum * 255);
        var b = Math.floor(randomNum * 255);
        return "rgb(" + r + "," + g + "," + b + ")";
      };
      
      arr.sort();
      for (var i = 0; i < arr.length; i++) {
        if (arr[i] !== prev) {
          a.push(arr[i]);
          b.push(1);
          c.push(randomColor())
        } else {
          b[b.length - 1]++;
        }
        prev = arr[i];
      }
      return [a, b, c];
    }
  },
  created() {
    this.fetchItems()
  }
}