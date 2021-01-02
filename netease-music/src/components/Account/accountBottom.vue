<template>
  <div class="account-bottom">
    <div class="play-all">
      <span></span>
      <p>播放全部</p>
    </div>
    <div class="account-list">
      <scroll-view ref="scroll">
        <song-list-item :song_list="songs_list"></song-list-item>
      </scroll-view>
    </div>

  </div>
</template>

<script>
import ScrollView from '@/components/ScrollView'
import SongListItem from '@/components/Recommend/songListItem'

export default {
  name: 'accountBottom',
  components: {
    SongListItem,
    ScrollView
  },
  props: {
    songs_list: {
      type: Array,
      default: () => [],
      required: true
    }
  },
  updated () {
    this.$refs.scroll.refresh10()
  }
}
</script>

<style scoped lang="scss">
@import "src/assets/css/variable";
@import "src/assets/css/mixin";

.account-bottom {
  @include bg_sub_color();

  .play-all {
    margin: 10px auto;
    width: 260px;
    height: 80px;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid #FFFFFF;
    border-radius: 40px;
    @include border_color();

    span {
      display: block;
      width: 60px;
      height: 60px;
      @include bg_img("../../assets/images/small_play");
      margin: 0 20px
    }

    p {
      @include font_size($font_medium);
      padding-right: 20px;
    }
  }

  .account-list {
    border-top: #cccccc 2px solid;
    position: fixed;
    top: 200px;
    bottom: 0;
    left: 0;
    right: 0;
    overflow: hidden;
  }
}
</style>
