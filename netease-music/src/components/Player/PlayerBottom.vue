<template>
  <div class="player-bottom">
    <div class="top">
      <span ref="currentTimeSpan">00:00</span>
      <div class="progress-bg" @click="progressClick" ref="progressBg">
        <div class="progress-line" ref="progressLine">
          <div class="progress-dot"></div>
        </div>
      </div>
      <span ref="durationSpan">00:00</span>
    </div>
    <div class="bottom">
      <div class="mode loop" ref="mode" @click="changeMode"></div>
      <div class="prev" @click="prevSong"></div>
      <div class="play" @click="play" ref="play"></div>
      <div class="next" @click="nextSong"></div>
      <div class="un-favorite" @click.stop="changeFavorite" :class="{'favorite': isFavorite(this.currentSong) }"
           ref="favorite"></div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { modeType } from '@/store/modeType'

export default {
  name: 'PlayerBottom',
  methods: {
    ...mapActions([
      'setIsPlaying',
      'setModeType',
      'setCurrentIndex',
      'setCurrentTime',
      'addToFavoriteList',
      'removeFromFavoriteList',
      'setCurrentTime'
    ]),
    parseTime (time) {
      const seconds = parseInt(time)
      let min = Math.floor(seconds / 60)
      min = min < 10 ? '0' + min : min
      let second = seconds % 60
      second = second < 10 ? '0' + second : second
      return min + ':' + second // 返回 03:10, 02:01的形式
    },
    play () {
      this.setIsPlaying(!this.PlayerIsPlaying)
    },
    changeMode () {
      if (this.PlayMode === modeType.loop) {
        this.setModeType(modeType.one)
        this.$refs.mode.classList.remove('loop')
        this.$refs.mode.classList.add('one')
      } else if (this.PlayMode === modeType.one) {
        this.setModeType(modeType.random)
        this.$refs.mode.classList.remove('one')
        this.$refs.mode.classList.add('random')
      } else if (this.PlayMode === modeType.random) {
        this.setModeType(modeType.loop)
        this.$refs.mode.classList.remove('random')
        this.$refs.mode.classList.add('loop')
      }
    },
    prevSong () {
      this.setCurrentIndex(this.currentIndex - 1)
      // this.setIsPlaying(true)
    },
    nextSong () {
      this.setCurrentIndex(this.currentIndex + 1)
      // this.setIsPlaying(true)
    },
    progressClick (e) {
      const offsetLeft = e.target.offsetLeft
      const offsetWidth = this.$refs.progressBg.offsetWidth
      const clickX = e.pageX
      const value = (clickX - offsetLeft) / offsetWidth
      this.$refs.progressLine.style.width = 100 * value + '%'
      this.setCurrentTime(value * this.songDuration)
    },
    changeFavorite () {
      const result = this.favoriteList.find(value => {
        if (value.id === this.currentSong.id) return true
      })
      if (result) {
        this.removeFromFavoriteList(this.currentSong)
        // this.$refs.favorite.classList.remove('favorite')
      } else {
        this.addToFavoriteList(this.currentSong)
        // this.$refs.favorite.classList.add('favorite')
      }
    },
    isFavorite (value) {
      return this.favoriteList.find(val => {
        if (val.id === value.id) return true
      })
    }
  },
  computed: {
    ...mapGetters([
      'PlayerIsPlaying',
      'PlayMode',
      'currentIndex',
      'favoriteList',
      'currentSong'
    ])
  },
  watch: {
    PlayerIsPlaying (newV) {
      if (newV) {
        this.$refs.play.classList.add('pause')
      } else {
        this.$refs.play.classList.remove('pause')
      }
    },
    PlayMode (newV, oldV) {
      if (oldV === modeType.loop) {
        this.setModeType(modeType.one)
        this.$refs.mode.classList.remove('loop')
        this.$refs.mode.classList.add('one')
      } else if (oldV === modeType.one) {
        this.setModeType(modeType.random)
        this.$refs.mode.classList.remove('one')
        this.$refs.mode.classList.add('random')
      } else if (oldV === modeType.random) {
        this.setModeType(modeType.loop)
        this.$refs.mode.classList.remove('random')
        this.$refs.mode.classList.add('loop')
      }
    },
    songDuration (newV) {
      // eslint-disable-next-line vue/no-mutating-props
      this.songDuration = newV
      this.$refs.durationSpan.innerHTML = this.parseTime(this.songDuration)
    },
    songCurrentTime (newV) {
      // eslint-disable-next-line vue/no-mutating-props
      this.songCurrentTime = newV
      this.$refs.currentTimeSpan.innerHTML = this.parseTime(this.songCurrentTime)
      const width = (this.songCurrentTime / this.songDuration) * 100
      this.$refs.progressLine.style.width = width + '%'
    }
  },
  props: {
    songDuration: {
      type: Number,
      default: 0
    },
    songCurrentTime: {
      type: Number,
      default: 0
    }
  }
}
</script>

<style scoped lang="scss">
@import "src/assets/css/mixin";
@import "src/assets/css/variable";

.player-bottom {
  position: fixed;
  bottom: 30px;
  width: 100%;
  margin-top: 20px;

  .top {
    width: 90%;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;

    span {
      @include font_size($font_medium_s);
      @include font-color();
      opacity: 0.8;
      margin: 0 10px;
    }

    .progress-bg {
      border-radius: 5px;
      width: 80%;
      height: 10px;
      background-color: #FFFFFF;

      .progress-line {
        border-radius: 5px;
        background-color: #999999;
        width: 0;
        height: 100%;
        position: relative;

        .progress-dot {
          position: absolute;
          top: 50%;
          transform: translate(-50%, -50%);
          left: 100%;
          width: 24px;
          height: 24px;
          margin: 0 auto;
          border-radius: 50%;
          background-color: #FFFFFF;
        }
      }
    }
  }

  .bottom {
    margin-top: 16px;
    display: flex;
    justify-content: space-around;
    align-items: center;

    div {
      width: 100px;
      height: 100px;
      //background-color: #aaa;
      &.mode {
        //@include bg_img('../../assets/images/loop')
        &.loop {
          @include bg_img('../../assets/images/loop');
        }

        &.one {
          @include bg_img('../../assets/images/one');
        }

        &.random {
          @include bg_img('../../assets/images/shuffle');
        }
      }

      &.prev {
        @include bg_img('../../assets/images/prev')
      }

      &.play {
        @include bg_img('../../assets/images/play');

        &.pause {
          @include bg_img('../../assets/images/pause')
        }
      }

      &.next {
        @include bg_img('../../assets/images/next')
      }

      &.un-favorite {
        @include bg_img('../../assets/images/un_favorite');
      }

      &.favorite {
        @include bg_img('../../assets/images/favorite');
      }
    }
  }
}
</style>
