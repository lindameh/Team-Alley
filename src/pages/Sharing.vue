<template>

  <div class="section">
    <div class="container">

      <tabs type="primary" tabContentClasses="tab-subcategories"
            square centered class="row">
            
        <tab-pane>
        <span slot="label">
          <i class="now-ui-icons objects_umbrella-13"></i>All
        </span>
        </tab-pane>
        
        <tab-pane>
        <span slot="label">
          <i class="now-ui-icons sport_user-run"></i>Sport
        </span>
        <!--Card-->
        <div class="col-md-10 mr-auto ml-auto">
          <card class="container" >
            <div class="row">
              <!--Image Here-->
              <div class="col-md-3">
                <img slot="image" class="card-img-top sharing-img" src='img/ryan.jpg' alt="">
              </div>
              <!--Content Here-->
              <div class="col-md-9">
                <h5 class="card-title">Tips to lose Weight</h5>
                <p class="card-text">I have been using my time in quarantine to research on the best weight losing method!</p>
                <n-button type="primary">See More</n-button>                
              </div>
            </div>
          </card>
        </div>
        </tab-pane>
        
        <tab-pane>
        <span slot="label">
          <i class="now-ui-icons shopping_basket"></i>Food
        </span>
        </tab-pane>
        
        <tab-pane>
        <span slot="label">
          <i class="now-ui-icons ui-2_favourite-28"></i>Wellness
        </span>
        </tab-pane>

        <tab-pane>
        <span slot="label">
          <i class="now-ui-icons media-2_sound-wave"></i>Hygiene
        </span>
        </tab-pane>

      </tabs>

      <!--Card-->
      <div class="col-md-10 mr-auto ml-auto">
        <card class="container" >
          <div class="row">
            <!--Image Here-->
            <div class="col-md-3">
              <img slot="image" class="card-img-top sharing-img" src='img/ryan.jpg' alt="">
            </div>
            <!--Content Here-->
            <div class="col-md-9">
              <h5 class="card-title">Tips to lose Weight</h5>
              <p class="card-text">I have been using my time in quarantine to research on the best weight losing method!</p>
              <n-button type="primary">See More</n-button>                
            </div>
          </div>
        </card>
      </div>

      <!--Card-->
      <div class="col-md-10 mr-auto ml-auto">
        <card class="container" >
          <div class="row">
            <!--Image Here-->
            <div class="col-md-3">
              <img slot="image" class="card-img-top sharing-img" src='img/eva.jpg' alt="">
            </div>
            <!--Content Here-->
            <div class="col-md-9">
              <h5 class="card-title">My Diet Progress</h5>
              <p class="card-text">Join me on my dieting journey and road to losing weight!</p>
              <n-button type="primary">See More</n-button>                
            </div>
          </div>
        </card>
      </div>

      <!--Card-->
      <div class="col-md-10 mr-auto ml-auto">
        <card class="container" >
          <div class="row">
            <!--Image Here-->
            <div class="col-md-3">
              <img slot="image" class="card-img-top sharing-img" src='img/julie.jpg' alt="">
            </div>
            <!--Content Here-->
            <div class="col-md-9">
              <h5 class="card-title">Healthy and Tasty recipes</h5>
              <p class="card-text">Here are some healthy but Tasty recipes you guys can try out!</p>
              <n-button type="primary">See More</n-button>                   
            </div>
          </div>
        </card>
      </div>

    </div>
  </div>
</template>

<script>
import { Card, Tabs, TabPane } from '../components'
import { Button } from '@/components'

export default {
  name: "sharing",
  bodyClass: "sharing-page",
  components: {
    Card,
    Tabs,
    TabPane,
    [Button.name]: Button
  },
  methods: {
    // getSharings() {
    //   #TODO: Load data from firebase
    //   Check if there are ang sharing
    //   render each sharing into a card component
    // },
  },
};
</script>

<style>
.sharing-img {
  height: 10rem;
  width: 10rem;
}
.float-left {
  float:left
}
.float-right {
  float:right
}
</style>
