<template>
  <tab-bar>
    <tab-bar-item path="/main" activeColor="red">
      <img slot="item-icon" src="~assets/img/tabbar/home.svg"/>
      <img slot="item-icon-active" src="~assets/img/tabbar/home_active.svg"/>
      <div slot="item-text">Main</div>
    </tab-bar-item>
    <tab-bar-item path="/category">
      <img slot="item-icon" src="~assets/img/tabbar/category.svg"/>
      <img slot="item-icon-active" src="~assets/img/tabbar/category_active.svg"/>
      <div slot="item-text">Category</div>
    </tab-bar-item>
    <tab-bar-item path="/cart">
      <img slot="item-icon" src="~assets/img/tabbar/shopcart.svg"/>
      <img slot="item-icon-active" src="~assets/img/tabbar/shopcart_active.svg"/>

      <div slot="item-text">Cart</div>
    </tab-bar-item>
    <tab-bar-item path="/profile">
      <img slot="item-icon" src="~assets/img/tabbar/profile.svg"/>
      <img slot="item-icon-active" src="~assets/img/tabbar/profile_active.svg"/>
      <div slot="item-text">Profile</div>
    </tab-bar-item>
  </tab-bar>
</template>

<script>

import TabBar from "components/common/tabbar/TabBar";
import TabBarItem from "components/common/tabbar/TabBarItem";

export default {
  name: "ActualTabBar",
  components:{
    TabBar,
    TabBarItem
  }
}
</script>

<style scoped>

</style>
