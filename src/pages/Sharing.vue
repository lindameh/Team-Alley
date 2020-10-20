<template>
  <div>
    <div class="page-header clear-filter" color="orange">
      <div
        class="page-header-image"
        style="background-image: url('img/sharing-bg.jpg'); opacity: 0.5"
      ></div>
      <br><br><br><br><br><br><br>
        <div class="col-md-10 ml-auto col-xl-6 mr-auto">
          <p class="category">Tabs with Icons on Card</p>
          <!-- Nav tabs -->
          <card>
              <div class="section">
                    <h5 class="description">tesating</h5>
              </div>
          </card>
        </div>

      
    </div>
  </div>
</template>
<script>
import {Card} from '../components'

export default {
  name: "sharing",
  bodyClass: "sharing-page",
  components: {
    Card
  },
  methods: {
    // alertMsg() {
    //   alert(
    //     "You have submitted the form successfully!" + "\n" + "Continue Logging!"
    //   );
    // },
  },
};
</script>

<style>
</style>
