<template>
  <div class="song">
    <div class="song-top">
      <h3>最新音乐</h3>
    </div>
    <ul class="song-list">
      <li v-for="item in song_list" :key="item.id" >
<!--        <img :src="item.picUrl" alt="">-->
         <img v-lazy="item.picUrl" alt="" @click="selectSongDetail(item.id)">
        <div class="desc" @click.stop="selectSong(item.id)">
          <h3>{{ item.song.name }}</h3>
          <p>{{ item.song.artists[0].name }}</p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'SongList',
  methods: {
    ...mapActions([
      'setFullScreen',
      'setMiniPlayer',
      'setSongDetail',
      'setPlayerNormal',
      'setIsPlaying'
    ]),
    selectId (id) {
      this.$emit('selectId', id)
    },
    async selectSong (id) {
      await this.setSongDetail(id)
      this.setMiniPlayer(true)
      this.setIsPlaying(true)
    },
    async selectSongDetail (id) {
      await this.setSongDetail(id)
      this.setPlayerNormal(true)
      this.setIsPlaying(true)
    }
  },
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

  .song-list {
    width: 100%;

    li {
      padding-left: 10px;
      margin-top: 10px;
      padding-bottom: 10px;
      width: 100%;
      height: 150px;
      display: flex;

      border-bottom: 2px solid #cccccc;
      img {
        width: 150px;
        height: 150px;
        border-radius: 10px;
      }

      .desc {
        margin-left: 20px;
        h3 {
          @include font_size($font_large);
          margin-top: 30px;
        }

        p {
          margin-top: 20px;
          @include font_size($font_medium_s);
          opacity: 0.7;
        }
      }
    }
  }

}
</style>
