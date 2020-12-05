<template>
  <div id="main" class="home-nav">
    <nav-bar>
      <div slot="center">Shopping mall</div>
    </nav-bar>
  </div>

</template>

<script>
  import NavBar from "@/components/common/navbar/NavBar";
  export default {
    name: "Main",
    components:{
      NavBar
    }
  }
</script>

<style scoped>
  .home-nav {
    background-color: var(--color-tint);
    color: white;
  }
</style>
