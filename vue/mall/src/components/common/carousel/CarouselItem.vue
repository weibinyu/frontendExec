<template>
  <div class="carouselItem">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "CarouselItem"
}
</script>

<style scoped>
.carouselItem {
  width: 100%;
  flex-shrink: 0;
}

.carouselItem img {
  width: 100%;
}
</style>
