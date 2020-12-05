<template>
  <div id="app">
    <router-view></router-view>
    <ActualTabBar></ActualTabBar>
  </div>
</template>

<script>

import ActualTabBar from "@/components/content/actualTabbar/ActualTabBar";

export default {
  name: 'App',
  components: {
    ActualTabBar
  }
}
</script>

<style>
  @import "assets/css/base.css";
</style>
