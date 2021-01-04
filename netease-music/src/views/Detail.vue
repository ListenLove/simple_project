<template>
  <div class="detail">
    <sub-header :title="playlist.name"></sub-header>
    <div class="core-container">
      <detail-top :url="playlist.coverImgUrl" ref="top"></detail-top>
      <div class="container">
        <ScrollView ref="scrollView">
          <detail-bottom :tracks="playlist.tracks"></detail-bottom>
        </ScrollView>
      </div>
    </div>
  </div>
</template>

<script>
import SubHeader from '@/components/Detail/DetailHeader'
import {
  getAlbumListDetail,
  getPlayListDetail,
  getSingerDetailAndDetail
} from '@/api'
import DetailTop from '@/components/Detail/DetailTop'
import DetailBottom from '@/components/Detail/DetailBottom'
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
      playlist: {}
    }
  },
  created () {
    // console.log(this.$route.query)
    if (this.$route.query.typed === 'personalized') {
      getPlayListDetail({ id: this.$route.query.id })
        .then(value => {
          // console.log(value)
          this.playlist = value.playlist
        })
        .catch(reason => { console.log(reason) })
    } else if (this.$route.query.typed === 'album') {
      getAlbumListDetail({ id: this.$route.query.id })
        .then(value => {
          // console.log(value)
          this.playlist = {
            name: value.album.name,
            coverImgUrl: value.album.picUrl,
            tracks: value.songs
          }
        })
        .catch(reason => { console.log(reason) })
    } else if (this.$route.query.typed === 'singer') {
      getSingerDetailAndDetail({ id: this.$route.query.id })
        .then(value => {
          this.playlist = {
            name: value.artist.name,
            coverImgUrl: value.artist.cover,
            tracks: value.songs
          }
        })
        .catch(reason => { console.log(reason) })
    }
  },
  mounted () {
    const defaultHeight = this.$refs.top.$el.offsetHeight
    this.$refs.scrollView.scrolling((offset) => {
      if (offset >= 0) {
        const scale = 1 + offset / defaultHeight
        // 让封面图片动态变大
        this.$refs.top.$el.style.transform = `scale(${scale})`
      } else {
        // 上滚，使得 让封面图片动态高斯模糊
        const scale = Math.abs(offset / defaultHeight)
        // this.$refs.top.$el.style.filter = `blur(${scale}px)`
        this.$refs.top.changeMask(scale)
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
    position: absolute;
    width: 100%;
    top: 100px;
    bottom: 0;
    left: 0;
    right: 0;
    overflow: hidden;

    .container {
      position: absolute;
      top: 400px;
      left: 0;
      bottom: 0;
      right: 0;
    }
  }
}

</style>
