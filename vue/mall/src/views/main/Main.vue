<template>
  <div id="main" >
    <nav-bar class="main-nav">
      <div slot="center">Shopping mall</div>
    </nav-bar>
    <main-carousel :banners="banners"/>
    <main-recommendations-view :recommends="recommends"/>
    <main-trends-view/>
    <tab-control :titles="['Trends','New','Most View']"/>
  </div>

</template>

<script>
  import NavBar from "components/common/navbar/NavBar";
  import TabControl from "components/content/tabControl/TabControl";

  import MainCarousel from "./childComponents/MainCarousel";
  import MainRecommendationsView from "./childComponents/MainRecommendationsView";
  import MainTrendsView from "./childComponents/MainTrendsView";

  import {getMainMultiData,getMainGoods} from "network/main";

  export default {
    name: "Main",
    components:{
      NavBar,
      TabControl,
      MainCarousel,
      MainRecommendationsView,
      MainTrendsView
    },
    data() {
      return {
        banners:[],
        recommends:[],
        goods:{
          'pop':{page:0,items:[]},
          'new':{page:0,items:[]},
          'sell':{page:0,items:[]}
        }
      }
    },
    created(){
      this.getMainMultiData()

      // this.getMainGoods('pop')
      // this.getMainGoods('new')
      // this.getMainGoods('sell')
    },
    methods: {
      getMainMultiData(){
        getMainMultiData().then(res => {
          this.banners = res.data.banner.list
          this.recommends = res.data.recommend.list
        })
      },

      getMainGoods(type){
        console.log(this.goods[type].page)
        const page = this.goods[type].page + 1

        getMainGoods(type,page).then(res => {
          console.log(res)
          this.goods[type].items.push(...res.data.list)
          this.goods[type].page += 1
        })
      }
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
