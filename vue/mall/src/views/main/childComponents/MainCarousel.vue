<template>
  <carousel>
    <carousel-item v-for="(item,index) in banners" :key="index">
      <a :href="item.link">
        <img :src="item.image" alt="">
      </a>
    </carousel-item>
  </carousel>
</template>

<script>
import {Carousel,CarouselItem} from 'components/common/carousel'

export default {
  name: "MainCarousel",
  props:{
    banners: {
      type: Array,
      default() {
        return []
      }
    }
  },
  components: {
    Carousel,
    CarouselItem
  }
}
</script>

<style scoped>

</style>
