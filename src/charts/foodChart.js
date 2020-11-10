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
      
      arr.sort();
      for (var i = 0; i < arr.length; i++) {
        if (arr[i] !== prev) {
          a.push(arr[i]);
          b.push(1);
        } else {
          b[b.length - 1]++;
        }
        prev = arr[i];
      }

      for (var i = 0; i < a.length; i++) {
        c.push(this.rainbow(a.length, i));
      }

      return [a, b, c];
    },

    rainbow(numOfSteps, step) {
        var r, g, b;
        var h = step / numOfSteps;
        var i = ~~(h * 6);
        var f = h * 6 - i;
        var q = 1 - f;
        switch(i % 6){
            case 0: r = 1; g = f; b = 0; break;
            case 1: r = q; g = 1; b = 0; break;
            case 2: r = 0; g = 1; b = f; break;
            case 3: r = 0; g = q; b = 1; break;
            case 4: r = f; g = 0; b = 1; break;
            case 5: r = 1; g = 0; b = q; break;
        }
        return "rgb(" + parseInt(r*255) + "," + parseInt(g*255) + "," + parseInt(b*255) + "," + 0.7 + ")";
    }
  },
  created() {
    this.fetchItems()
  }
}