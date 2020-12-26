<template>
  <div class="detail">
    <sub-header :title="playlist.name"></sub-header>
    <detail-top :url="playlist.coverImgUrl" ref="top"></detail-top>

    <div class="core-container">
      <ScrollView ref="scrollView">
      <detail-bottom :tracks="playlist.tracks"></detail-bottom>
    </ScrollView>
    </div>
  </div>
</template>

<script>
import SubHeader from '@/components/SubHeader'
import { getPlayListDetail } from '@/api'
import DetailTop from '@/components/DetailTop'
import DetailBottom from '@/components/DetailBottom'
import ScrollView from '@/components/ScrollView'

export default {
  name: 'Detail',
  components: {
    ScrollView,
    DetailBottom,
    DetailTop,
    SubHeader
  },
  data () {
    return {
      playlist: []
    }
  },
  created () {
    // console.log(this.$route.query)
    getPlayListDetail(this.$route.query)
      .then(value => {
        // console.log(value)
        this.playlist = value.playlist
      })
      .catch(reason => { console.log(reason) })
  },
  mounted () {
    const defaultHeight = this.$refs.top.$el.offsetHeight
    console.log(defaultHeight)
    this.$refs.scrollView.scrolling((offset) => {
      if (offset >= 0) {
        const scale = 1 + offset / defaultHeight
        // 让封面图片动态变大
        this.$refs.top.$el.style.transform = `scale(${scale})`
      } else {
        // 上滚，使得 让封面图片动态高斯模糊
        const scale = 20 * Math.abs(offset / defaultHeight)
        this.$refs.top.$el.style.filter = `blur(${scale}px)`
      }
    })
  }
}
</script>

<style scoped lang="scss">
@import "src/assets/css/mixin";

.detail {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  z-index: 999;
  @include bg_sub_color();

  .core-container {
    position: fixed;
    width: 100%;
    top: 500px;
    bottom: 0;
    left: 0;
    right: 0;
    //overflow: hidden;
  }
}

</style>
