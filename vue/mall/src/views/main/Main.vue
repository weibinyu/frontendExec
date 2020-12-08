<template>
  <div id="main" >
    <nav-bar class="main-nav">
      <div slot="center">Shopping mall</div>
    </nav-bar>
    <main-carousel :banners="banners"/>
    <main-recommendations-view :recommends="recommends"/>
    <main-trends-view/>
  </div>

</template>

<script>
  import NavBar from "components/common/navbar/NavBar";
  import MainCarousel from "./childComponents/MainCarousel";
  import MainRecommendationsView from "./childComponents/MainRecommendationsView";
  import MainTrendsView from "./childComponents/MainTrendsView";
  import {getMainMultiData} from "network/main";

  export default {
    name: "Main",
    components:{
      NavBar,
      MainCarousel,
      MainRecommendationsView,
      MainTrendsView
    },
    data() {
      return {
        banners:[],
        recommends:[],
      }
    },
    created(){
      getMainMultiData().then(res => {
        this.banners = res.data.banner.list
        this.recommends = res.data.recommend.list
      })
    }
  }
</script>

<style scoped>
  #main{
    padding-top: 44px;
  }

  .main-nav {
    background-color: var(--color-tint);
    color: white;
    position: fixed;
    left: 0;
    right: 0;
    top:0;
    z-index: 9;
  }
</style>
