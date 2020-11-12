<template>
  <div>
    <link rel="stylesheet" type="text/css" href="../title.css">

    <div class="section">

      <div class="container">

        <br>
        <h2 class="line-text">Leaderboard</h2>

        <tabs type="primary" tabContentClasses="tab-subcategories" square centered >
          <tab-pane>
          <span slot="label">
            <i class="now-ui-icons objects_umbrella-13"></i>All
          </span>
          
          <div class="Header"><h1 class="Header__title">Overall Top 10</h1></div>
        
          <div class="CompetitorList">
            <div class="Athlete">
              <div class="Athlete__rank"><h5>Rank</h5></div>
              <h2 class="Athlete__name">Name</h2>
              <h4 class="Athlete__reps">Score</h4>
            </div>

            <div class="Athlete" v-for="(user,index) in top10" :key='user.id'>
                <div class="Athlete__rank"><h5 class="Athlete__rank">{{ index+1 }}</h5></div>
                <h2 class="Athlete__name">{{user.name}}</h2>
                <h4 class="Athlete__reps">{{user.overallScore.toFixed(0)}} </h4>
            </div>       
          </div>
          <!-- Retrieve data for overall ranking and display ranking -->
          </tab-pane>
          


          <tab-pane>
          <span slot="label">
            <i class="now-ui-icons sport_user-run"></i>Sports
          </span>
          <div class="Header"><h1 class="Header__title">Sports Top 10</h1></div>
          <!-- Retrieve data for sports ranking and display ranking -->

          <div class="CompetitorList">
            <div class="Athlete">
              <div class="Athlete__rank"><h5>Rank</h5></div>
              <h2 class="Athlete__name">Name</h2>
              <h4 class="Athlete__reps">Score</h4>
            </div>

            <div class="Athlete" v-for="(user,index) in sportsTop10" :key="user.id2">
                <div class="Athlete__rank"><h5 class="Athlete__rank">{{ index+1 }}</h5></div>
                <h2 class="Athlete__name">{{user.name}}</h2>
                <h4 class="Athlete__reps">{{user.sportsScore.toFixed(0)}} </h4>
            </div>        
          </div>
          </tab-pane>
          

          <tab-pane>
          <span slot="label">
            <i class="now-ui-icons shopping_basket"></i>Food
          </span>
          <div class="Header"><h1 class="Header__title">Food Top 10</h1></div>
          <!-- Retrieve data for food ranking and display ranking -->
          <div class="CompetitorList">
            <div class="Athlete">
              <div class="Athlete__rank"><h5>Rank</h5></div>
              <h2 class="Athlete__name">Name</h2>
              <h4 class="Athlete__reps">Score</h4>
            </div>

            <div class="Athlete" v-for="(user,index) in foodTop10" :key="user.id3">
                <div class="Athlete__rank"><h5 class="Athlete__rank">{{ index+1 }}</h5></div>
                <h2 class="Athlete__name">{{user.name}}</h2>
                <h4 class="Athlete__reps">{{user.foodScore.toFixed(0)}} </h4>
            </div>        
          </div>
          </tab-pane>
          

          <tab-pane>
          <span slot="label">
            <i class="now-ui-icons ui-2_favourite-28"></i>Wellness
          </span>
          <div class="Header"><h1 class="Header__title">Wellness Top 10</h1></div>
          <!-- Retrieve data for wellness ranking and display ranking -->
          <div class="CompetitorList">
            <div class="Athlete">
              <div class="Athlete__rank"><h5>Rank</h5></div>
              <h2 class="Athlete__name">Name</h2>
              <h4 class="Athlete__reps">Score</h4>
            </div>

            <div class="Athlete" v-for="(user,index) in wellnessTop10" :key="user.id4">
                <div class="Athlete__rank"><h5 class="Athlete__rank">{{ index+1 }}</h5></div>
                <h2 class="Athlete__name">{{user.name}}</h2>
                <h4 class="Athlete__reps">{{user.wellnessScore.toFixed(0)}} </h4>
            </div>       
          </div>
          </tab-pane>


          <tab-pane>
          <span slot="label">
            <i class="now-ui-icons media-2_sound-wave"></i>Hygiene
          </span>
          <div class="Header"><h1 class="Header__title">Hygiene Top 10</h1></div>
          <!-- Retrieve data for hygiene ranking and display ranking -->
          <div class="CompetitorList">
            <div class="Athlete">
              <div class="Athlete__rank"><h5>Rank</h5></div>
              <h2 class="Athlete__name">Name</h2>
              <h4 class="Athlete__reps">Score</h4>
            </div>

            <div class="Athlete" v-for="(user,index) in hygieneTop10" :key="user.id5">
                <div class="Athlete__rank"><h5 class="Athlete__rank">{{ index+1 }}</h5></div>
                <h2 class="Athlete__name">{{user.name}}</h2>
                <h4 class="Athlete__reps">{{user.hygieneScore.toFixed(0)}} </h4>
            </div>         
          </div>
          </tab-pane>
        </tabs>
      </div>
    </div>
  </div>
</template>



<script>
import { database } from "../firebase.js"
import { Tabs, TabPane } from '../components';
import moment from "moment";

export default {
  components: {
    Tabs,
    TabPane
  },
  data(){
    return{
      datasets:[],
      top10:[],
      sportsTop10:[],
      foodTop10:[],
      wellnessTop10:[],
      hygieneTop10:[]
    }
  },
  methods: {
    fetchItems: function () {
      database.collection('Users').get().then(querySnapShot => {
        let data = [];
        querySnapShot.forEach(doc => { 
            data.push(doc.data())
        })
        this.datasets = data;
        this.getAll();
        this.getTop();
        this.getSportsTop();
        this.getFoodTop();
        this.getWellnessTop();
        this.getHygieneTop();
      })
    },
    getAll: function(){
      database.collection('Users').get().then(querySnapShot => {
        let data = [];
        querySnapShot.forEach(doc => { 
            data.push(doc.data())
        })
        this.datasets = data;
      })
    },
    getTop: function(){
      var today = String(moment(String(new Date())).format("DDMMYYYY"));
      var top = [];
      for (var i = 0; i < this.datasets.length; i++) {
        if (this.datasets[i].scoreDate == today){
          console.log(this.datasets[i].scoreDate);
          top.push(this.datasets[i]);
        }
      }
      this.top10 = top.sort((a, b) => (a.overallScore > b.overallScore));
    },
    // getTop2: function(){
    //   database.collection('Users').where('scoreDate','==',this.today).orderBy('overallScore','desc').limit(10).get().then(querySnapShot => {
    //     let rank = [];
    //     querySnapShot.forEach(doc => { 
    //         rank.push(doc.data())
    //     })
    //     this.top10 = rank;
    //   })
    // },
    getSportsTop: function(){
      this.sportsTop10 = this.top10.sort((a, b) => (a.sportsScore > b.sportsScore));
    },
    // getSportsTop: function(){
    //   database.collection('Users').orderBy('sportsScore','desc').limit(10).get().then(querySnapShot => {
    //     let rank = [];
    //     querySnapShot.forEach(doc => { 
    //         rank.push(doc.data())
    //     })
    //     this.sportsTop10 = rank;
    //   })
    // },
    getWellnessTop: function(){
      this.wellnessTop10 = this.top10.sort((a, b) => (a.wellnessScore > b.wellnessScore));
    },
    // getWellnessTop: function(){
    //   database.collection('Users').orderBy('wellnessScore','desc').limit(10).get().then(querySnapShot => {
    //     let rank = [];
    //     querySnapShot.forEach(doc => { 
    //         rank.push(doc.data())
    //     })
    //     this.wellnessTop10 = rank;
    //   })
    // },
    getFoodTop: function(){
      this.foodTop10 = this.top10.sort((a, b) => (a.foodScore > b.foodScore));
    },
    // getFoodTop: function(){
    //   database.collection('Users').orderBy('foodScore','desc').limit(10).get().then(querySnapShot => {
    //     let rank = [];
    //     querySnapShot.forEach(doc => { 
    //         rank.push(doc.data())
    //     })
    //     this.foodTop10 = rank;
    //   })
    // },
    getHygieneTop: function(){
      this.hygieneTop10 = this.top10.sort((a, b) => (a.hygieneScore > b.hygieneScore));
    }
    // getHygieneTop: function(){
    //   database.collection('Users').orderBy('hygieneScore','desc').limit(10).get().then(querySnapShot => {
    //     let rank = [];
    //     querySnapShot.forEach(doc => { 
    //         rank.push(doc.data())
    //     })
    //     this.hygieneTop10 = rank;
    //   })
    // }
	},
  created(){
        this.fetchItems();
  },
}

</script>


<style scoped>

@import url('https://fonts.googleapis.com/css2?family=Pacifico&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Catamaran:wght@900&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Rancho&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Molle:ital@1&display=swap');
*, *:before, *:after {
	 box-sizing: border-box;
}
body {
	 margin: 0;
	 font-family: Arial, sans-serif;
	 min-height: 100vh;
	 min-width: 100vw;
	 background-color: #2b2520;
	 display: flex;
	 align-items: center;
	 justify-content: center;
}
.line-text {
	 position: relative; 
	 /* display: inline-block; */
	 font-size: 80px;
	 font-weight: 800;
	 text-transform: uppercase;
	 font-style: italic;
	 color: transparent;
	 -webkit-text-stroke-width: 5.5px;
	 -webkit-text-stroke-color: black;
	 white-space: nowrap;
	 text-shadow: 12px 5px #f96331, 13px 6px #0A96C8, 14px 7px #0A96C8, 15px 8px #0A96C8, 16px 9px #0A96C8, 17px 10px #0A96C8, 18px 11px #0A96C8, 19px 12px #0A96C8, 20px 13px #0A96C8, 21px 14px #0A96C8, 22px 15px #0A96C8, 23px 16px #0A96C8, 24px 17px #0A96C8, 25px 18px #0A96C8;
}


h2 {
  text-align: center;
}
.baseShadow, .Header, .Athlete {
  box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.5); }

.CompetitorList {
  width: 90%;
  max-width: 1000px;
  display: block;
  margin: 0 auto; }

.Header {
  width: 90%;
  z-index: 1;
  max-width: 1000px;
  margin: 0 auto;
  position: relative;
  border-top: 3px solid #f57c37;
  background-color: #FFFFFF; }
  .Header:nth-of-type(2) {
    border-top: 3px solid #F7B80C; }
  .Header .Header__title {
    font-family: 'Open Sans', sans-serif;
    font-weight: 400;
    font-size: 24px;
    color: #333333;
    width: 100%;
    text-align: center;
    text-transform: uppercase;
    margin: 0;
    padding: 12px 0; }
  .Header .Header__image {
    width: 40px;
    height: auto;
    display: block;
    margin: 0 auto;
    padding: 0 0 23px 0; }
  .Header .Header__summary {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 115px; }
  .Header .Header__stat {
    height: auto;
    flex: 1;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center; }
    .Header .Header__stat h3, .Header .Header__stat h4 {
      width: 100%;
      margin: 0;
      padding: 0;
      display: block;
      text-align: center;
      align-self: center; }
    .Header .Header__stat h3 {
      font-family: 'Open Sans', sans-serif;
      font-weight: 400;
      font-size: 24px;
      color: #333333; }
    .Header .Header__stat h4 {
      font-family: 'Open Sans', sans-serif;
      font-weight: 400;
      font-size: 12px;
      color: #333333;
      text-transform: uppercase;
      margin-top: 5px; }

.Athlete {
  width: 100%;
  margin: 1px 0;
  display: flex;
  align-items: center; 
  animation:flipInX .5s ease-in;}
  .Athlete .Athlete__rank {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 68px;
    width: 68px;
    flex-basis: 68px;
    background-color: #0A96C8; }
    .Athlete .Athlete__rank h5 {
      font-family: 'Open Sans', sans-serif;
      font-weight: 400;
      font-size: 20px;
      color: #FFFFFF;
      margin: 0;
      padding: 0; }
  .Athlete .Athlete__name {
    font-family: 'Open Sans', sans-serif;
    font-weight: 400;
    font-size: 20px;
    color: #333333;
    margin: 0;
    padding: 0 0 0 19px;
    flex: 1; }
  .Athlete .Athlete__reps {
    font-family: 'Open Sans', sans-serif;
    font-weight: 400;
    font-size: 20px;
    color: #333333;
    margin: 0;
    padding: 0 19px 0 0;
    flex: 1;
    text-align: right;
    align-self: flex-right; }
  
@-webkit-keyframes flipInX {
  0% {
    -webkit-transform: perspective(400px) rotate3d(1, 0, 0, 90deg);
    transform: perspective(400px) rotate3d(1, 0, 0, 90deg);
    -webkit-animation-timing-function: ease-in;
    animation-timing-function: ease-in;
    opacity: 0;
  }

  100% {
    -webkit-transform: perspective(400px);
    transform: perspective(400px);
  }
}

@keyframes flipInX {
  0% {
    -webkit-transform: perspective(400px) rotate3d(1, 0, 0, 90deg);
    transform: perspective(400px) rotate3d(1, 0, 0, 90deg);
    -webkit-animation-timing-function: ease-in;
    animation-timing-function: ease-in;
    opacity: 0;
  }
  
  100% {
    -webkit-transform: perspective(400px);
    transform: perspective(400px);
  }
}

.flipInX {
  -webkit-backface-visibility: visible !important;
  backface-visibility: visible !important;
  -webkit-animation-name: flipInX;
  animation-name: flipInX;
}

</style>

