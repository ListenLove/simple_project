<template>
  <div class="player-bottom">
    <div class="top">
      <span>00:00</span>
      <div class="progress-bg">
        <div class="progress-line">
          <div class="progress-dot"></div>
        </div>
      </div>
      <span>00:00</span>
    </div>
    <div class="bottom">
      <div class="mode loop" ref="mode" @click="changeMode"></div>
      <div class="prev" ></div>
      <div class="play" @click="play" ref="play"></div>
      <div class="next"></div>
      <div class="un-favorite"></div>
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
      'setModeType'
    ]),
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
    }
  },
  computed: {
    ...mapGetters([
      'PlayerIsPlaying',
      'PlayMode'
    ])
  },
  watch: {
    PlayerIsPlaying: function (newV) {
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
    }
  }
}
</script>

<style scoped lang="scss">
@import "src/assets/css/mixin";
@import "src/assets/css/variable";

.player-bottom {
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
      position: relative;

      .progress-line {
        border-radius: 5px;
        background-color: #999999;
        width: 50%;
        height: 100%;

        .progress-dot {
          position: absolute;
          top: 50%;
          transform: translate(-50%, -50%);
          left: 50%;
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
