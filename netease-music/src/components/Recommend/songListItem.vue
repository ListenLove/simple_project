<template>
  <ul class="song-list">
    <li v-for="item in song_list" :key="item.id">
      <!--        <img :src="item.picUrl" alt="">-->
      <img v-lazy="item.picUrl" alt="" @click="selectSongDetail(item.id)">
      <div class="desc" @click.stop="selectSong(item.id)">
        <h3>{{ item.name }}</h3>
        <p>{{ item.singer }}</p>
      </div>
    </li>
    <li>
      <p>已经到底了 =≡Σ((( つ•̀ω•́)つ</p>
    </li>
  </ul>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'songListItem',
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
      setTimeout(() => {
        this.setPlayerNormal(true)
        this.setIsPlaying(true)
      }, 50)
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
<style lang="scss">
@import "src/assets/css/mixin";
@import "src/assets/css/variable";

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

    &:last-of-type {
      p {
        @include font_size($font_medium);
        line-height: 160px;
        margin: auto;
      }
    }

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
</style>
