<template>
  <div id="wrapper" ref="wrapper">
      <div class="content">
        <slot></slot>
      </div>
    <!--    <slot></slot>-->
  </div>
</template>

<script>
import BScroll from '@better-scroll/core'

export default {
  name: 'ScrollView',
  mounted () {
    // 保证在DOM渲染完毕后初始化better-scroll
    this.scroll = new BScroll(this.$refs.wrapper, {
      probeType: 3,
      autoEndDistance: true
      // disableTouch: false,
      // disableMouse: true
    })
    this.$nextTick(() => {
      this.scroll.refresh()
    })

    /* setTimeout(() => {
      console.log(this.scroll.maxScrollY)
      this.scroll.refresh()
      console.log(this.scroll.maxScrollY)
    }, 5000) */
    /*
    由于网络是异步加载的，在使用better-scroll 插件时，需要借助 MutationObserver
    观察后代姐弟啊、子节点的变化使用 scroll refresh 方法重新计算滚动距离
    */
    const observer = new MutationObserver((mutations, observer) => {
      this.scroll.refresh()
    })
    const config = {
      childList: true, // 监听子节点的变化
      subtree: true // 监听后代节点的变化
    }
    observer.observe(this.$refs.wrapper, config)
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
        this.scroll.refresh()
      }, 100)
    },
    refresh10 () {
      setTimeout(() => {
        this.scroll.refresh()
        console.log('加载完成')
      }, 3000)
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
