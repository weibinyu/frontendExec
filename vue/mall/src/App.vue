<template>
  <div id="app">
    <tab-bar>
      <tab-bar-item>
        <img slot="item-icon" src="~assets/img/tabbar/home.svg"/>
        <div slot="item-text">Main</div>
      </tab-bar-item>
      <tab-bar-item>
        <img slot="item-icon" src="~assets/img/tabbar/category.svg"/>
        <div slot="item-text">Category</div>
      </tab-bar-item>
      <tab-bar-item>
        <img slot="item-icon" src="~assets/img/tabbar/shopcart.svg"/>
        <div slot="item-text">Cart</div>
      </tab-bar-item>
      <tab-bar-item>
        <img slot="item-icon" src="~assets/img/tabbar/profile.svg"/>
        <div slot="item-text">Profile</div>
      </tab-bar-item>
    </tab-bar>
  </div>
</template>

<script>
  import TabBar from "@/components/common/tabbar/TabBar";
  import TabBarItem from "@/components/common/tabbar/TabBarItem";
export default {
  name: 'App',
  components: {
    TabBar,
    TabBarItem
  }
}
</script>

<style>
  @import "assets/css/base.css";
</style>
