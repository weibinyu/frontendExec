<template>
  <div id="main" >
    <div class="home-nav">
      <nav-bar>
        <div slot="center">Shopping mall</div>
      </nav-bar>
    </div>
    <MainCarousel :banners="banners"/>
    <MainRecommendationsView :recommends="recommends"/>
  </div>

</template>

<script>
  import NavBar from "components/common/navbar/NavBar";
  import MainCarousel from "./childComponents/MainCarousel";
  import MainRecommendationsView from "@/views/main/childComponents/MainRecommendationsView";

  import {getMainMultiData} from "network/main";

  export default {
    name: "Main",
    components:{
      NavBar,
      MainCarousel,
      MainRecommendationsView
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
  .home-nav {
    background-color: var(--color-tint);
    color: white;
  }
</style>
