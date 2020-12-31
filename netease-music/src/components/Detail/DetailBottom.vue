<template>
  <ul class="detail-bottom">
    <li class="detail-bottom-top">
      <div class="bg-img" @click="playAll"></div>
      <div>播放全部</div>
    </li>
    <li class="item" v-for="track in tracks" :key="track.id" @click.stop="selectSong(track.id)">
      <h3>{{ track.name }}</h3>
      <p>{{ track.al.name }}-{{ track.ar[0].name }}</p>
    </li>
  </ul>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'DetailBottom',
  props: {
    tracks: {
      type: Array,
      required: true,
      default: () => []
    }
  },
  methods: {
    ...mapActions([
      'setFullScreen',
      'setMiniPlayer',
      'setSongDetail',
      'setIsPlaying'
    ]),
    async selectSong (id) {
      this.setFullScreen(true)
      this.setMiniPlayer(true)
      // console.log('set full screen')
      await this.setSongDetail(id)
      this.setIsPlaying(true)
    },
    async playAll () {
      this.setMiniPlayer(true)
      const ids = this.tracks.map(function (value) {
        return value.id
      })
      await this.setSongDetail(this.tracks[0].id)
      this.setIsPlaying(true)
      await this.setSongDetail(ids)
    }
  },
  computed: {
    ...mapGetters([
      'currentSong'
    ])
  }
}
</script>

<style scoped lang="scss">
@import "../../assets/css/mixin";
@import "../../assets/css/variable";

ul.detail-bottom {
  @include font-color();
  width: 100%;
  padding-bottom: 150px;

  li {
    @include bg_sub_color();
    border: 2px solid #cccccc;
    box-sizing: border-box;
  }

  li.detail-bottom-top {
    width: 100%;
    height: 100px;
    display: flex;
    align-items: center;
    border-top-left-radius: 50px;
    border-top-right-radius: 50px;

    .bg-img {
      width: 78px;
      height: 78px;
      margin: 0 20px;
      @include bg_img('../../assets/images/small_play');

      &.active {
        @include bg_img('../../assets/images/small_pause');

      }
    }

    div {
      @include font_size($font_large)
    }
  }

  .item {
    display: flex;
    flex-direction: column;

    h3 {
      @include font_size($font_large);
      margin: 10px 0 0 20px;
    }

    p {
      @include font_size($font_medium_s);
      opacity: 0.8;
      margin: 10px 0 10px 20px;
    }
  }
}

</style>
