<template>
  <div id="main" class="home-nav">
    <nav-bar>
      <div slot="center">Shopping mall</div>
    </nav-bar>
  </div>

</template>

<script>
  import NavBar from "components/common/navbar/NavBar";
  import {getMainMultiData} from "network/main";

  export default {
    name: "Main",
    components:{
      NavBar
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
        console.log(this.banners)
        console.log(this.recommends)
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
