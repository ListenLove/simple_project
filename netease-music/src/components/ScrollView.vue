<template>
  <div id="wrapper" ref="wrapper">
    <div class="content" ref="ul">
      <slot></slot>
    </div>
    <!--    <slot></slot>-->
  </div>
</template>

<script>
import BScroll from '@better-scroll/core'

export default {
  name: 'ScrollView',
  dara: () => {
    return {
      observer: null
    }
  },
  mounted () {
    // 保证在DOM渲染完毕后初始化better-scroll
    this.scroll = new BScroll(this.$refs.wrapper, {
      probeType: 3,
      autoEndDistance: true,
      observeDOM: true
    })
    this.observer = new MutationObserver(() => {
      this.scroll.refresh()
    })
    const config = {
      childList: true, // 监听子节点的变化
      subtree: true, // 监听后代节点的变化
      attributeFilter: ['height', 'offsetHeight'] // 观察特定属性
    }
    this.observer.observe(this.$refs.wrapper, config)
  },
  methods: {
    // 定义监听 scroll 滚动的事件，将在Y轴上滚动的运动坐标传递给回调函数
    scrolling (fn) {
      this.scroll.on('scroll', function () {
        fn(this.y)
      })
    },
    refresh () {
      setTimeout(() => {
        // this.scroll.refresh()
        const observer = new MutationObserver(() => {
          this.scroll.refresh()
        })
        const config = {
          childList: true, // 监听子节点的变化
          subtree: true, // 监听后代节点的变化
          attributeFilter: ['height', 'offsetHeight'] // 观察特定属性
        }
        observer.observe(this.$refs.ul, config)
      }, 300)
    },
    refresh10 () {
      setTimeout(() => {
        this.scroll.refresh()
      }, 300)
    },
    scrollTo (x, y, time) {
      this.scroll.scrollTo(x, y, time)
      // 执行完滚动后，禁止回弹
      setTimeout(() => {
        this.scroll.stop()
      }, time)
    }
  }
}

</script>

<style scoped lang="scss">
#wrapper {
  width: 100%;
  height: 100%;
}
</style>
