<template>
  <div id="wb-carousel">
    <div class="carousel" @touchstart="touchStart" @touchmove="touchMove" @touchend="touchEnd">
      <slot></slot>
    </div>
    <div class="indicator">
      <slot name="indicator" v-if="showIndicator && carouselItemCount > 1">
        <div v-for="(item,index) in carouselItemCount" class="indicator-item"
             :class="{active: index === currentIndex -1}" :key="index">
        </div>
      </slot>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Carousel",
    props: {
      interval: {
        type: Number,
        default: 3000
      },
      transitionDuration: {
        type: Number,
        default: 300
      },
      jumpToNextRatio: {
        type: Number,
        default: 0.25
      },
      showIndicator: {
        type: Boolean,
        default: true
      }
    },
    data(){
      return {
        carouselItemCount: 0,
        carouselWidth: 0,
        carouselStyle: {},
        currentIndex: 1,
        scrolling: false
      }
    },
    mounted() {
      setTimeout(() => {

        this.handleDom()
        this.startTimer()
      },3000)
    },
    methods:{
      handleDom() {

        let carouselEl = document.querySelector('.carousel')
        let carouselItemEls = carouselEl.getElementsByClassName('carouselItem')

        this.carouselItemCount = carouselItemEls.length
         if(this.carouselItemCount > 1){
           let cloneFirst = carouselItemEls[0].cloneNode(true)
           let cloneLast = carouselItemEls[this.carouselItemCount-1].cloneNode(true)
           carouselEl.insertBefore(cloneLast,carouselItemEls[0])
           carouselEl.appendChild(cloneFirst)
           this.carouselWidth = carouselEl.offsetWidth
           this.carouselStyle = carouselEl.style
         }
        this.setTransform(-this.carouselWidth)
      },
      startTimer() {
        this.playingTimer = window.setInterval(() => {
          this.currentIndex++
          this.scrollContent(-this.currentIndex * this.carouselWidth)
        },this.interval)
      },
      stopTimer() {
        window.clearInterval(this.playingTimer)
      },
      scrollContent(currentPosition) {
        this.scrolling = true

        this.carouselStyle.transition = 'transform ' + this.transitionDuration + 'ms'
        this.setTransform(currentPosition)

        this.checkPosition()
        this.scrolling = false
      },
      checkPosition() {
        window.setTimeout(() => {
          this.carouselStyle.transition = '0ms'
          if(this.currentIndex >= this.carouselItemCount + 1) {
            this.currentIndex = 1
            this.setTransform(-this.currentIndex * this.carouselWidth)
          } else if (this.currentIndex <= 0){
            this.currentIndex = this.carouselItemCount
            this.setTransform(-this.currentIndex * this.carouselWidth)
          }

          this.$emit('transitionEnd',this.currentIndex - 1)
        },this.transitionDuration)
      },
      setTransform(position) {
        this.carouselStyle.transform = `translate3d(${position}px,0,0)`
        this.carouselStyle['-webkit-transform'] = `translate3d(${position}px),0,0`
        this.carouselStyle['-ms-transform'] = `translate3d(${position}px),0,0`
      },
      touchStart(e) {
        if (this.scrolling) return
        this.stopTimer()
        this.startX = e.touches[0].pageX
      },
      touchMove(e) {
        this.currentX = e.touches[0].pageX
        this.distance = this.currentX - this.startX
        let currentPosition = -this.currentIndex * this.carouselWidth
        let moveDistance = this.distance + currentPosition

        this.setTransform(moveDistance)
      },
      touchEnd(){
        let currentMove = Math.abs(this.distance)
        if (this.distance === 0) {
          return
        } else if (this.distance > 0 && currentMove > this.carouselWidth * this.jumpToNextRatio) {
          this.currentIndex--
        } else if (this.distance < 0 && currentMove > this.carouselWidth * this.jumpToNextRatio) {
          this.currentIndex++
        }
        this.scrollContent(-this.currentIndex * this.carouselWidth)
        this.startTimer()
      },
      previous() {
        this.changeItem(-1)
      },
      next(){
        this.changeItem(1)
      },
      changeItem(num){
        this.stopTimer()
        this.currentIndex += num
        this.scrollContent(-this.currentIndex * this.carouselWidth)
        this.startTimer()
      }
    }
  }
</script>

<style scoped>
  #wb-carousel {
    overflow: hidden;
    position: relative;
  }

  .carousel{
    display: flex;
  }

  .indicator {
    display: flex;
    justify-content: center;
    position: absolute;
    width: 100%;
    bottom: 8px;
  }

  .indicator-item {
    box-sizing: border-box;
    width: 8px;
    height: 8px;
    border-radius: 4px;
    background-color: #fff;
    line-height: 8px;
    text-align: center;
    font-size: 12px;
    margin: 0 5px;
  }

  .indicator-item.active {
    background-color: rgba(212,62,46,1.0);
  }

</style>
