<template>
  <div class="song">
    <div class="song-top">
      <h3>最新音乐</h3>
    </div>
    <song-list-item :song_list="song_list"></song-list-item>
  </div>
</template>

<script>
import SongListItem from '@/components/Recommend/songListItem'
export default {
  name: 'SongList',
  components: { SongListItem },
  props: {
    song_list: {
      type: Array,
      required: true,
      default: () => []
    }
  }
}
</script>

<style scoped lang="scss">
@import "src/assets/css/mixin";
@import "src/assets/css/variable";

.song {
  @include font-color();
  @include bg_sub_color();

  .song-top {
    line-height: 84px;

    h3 {
      @include font_size($font_large);
    }

    padding-left: 20px;
    border-left: 10px solid #FFFFFF;
    @include border_color();
    border-bottom: 2px solid #cccccc !important;
  }
}
</style>
