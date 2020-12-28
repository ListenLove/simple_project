<template>
  <transition
    :css="false"
    @enter="playerEnter"
    @leave="playerLeave"
  >
    <div class="mini">
      <div class="wrapper">
        <div class="left">
          <div class="cover play" @click="showPlayerNormal" ref="cover">
            <img src="https://p1.music.126.net/WToRhQ-wpL9chpxDd2n-HA==/109951165560539447.jpg" alt="">
          </div>
          <div class="title">
            <h3>演员</h3>
            <p>薛之谦</p>
          </div>
        </div>
        <div class="right">
          <div class="play" @click="play" ref="play"></div>
          <div class="list" @click.stop="showList"></div>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import Velocity from 'velocity-animate'
import 'velocity-animate/velocity.ui'

export default {
  name: 'PlayerMini',
  methods: {
    ...mapActions([
      'setPlayerNormal',
      'setMiniPlayer',
      'setIsPlaying',
      'setPlayerListShow'
    ]),
    showList () {
      this.setPlayerListShow(true)
    },
    showPlayerNormal () {
      this.setPlayerNormal(true)
      this.setMiniPlayer(false)
    },
    // 播放器进入时动画
    playerEnter (el, done) {
      Velocity(
        el,
        'transition.slideUpBigIn',
        { duration: 300 },
        function () {
          done()
        })
    },
    // 播放器关闭时动画
    playerLeave (el, done) {
      Velocity(el,
        'transition.slideDownOut',
        { duration: 300 },
        function () {
          done()
        })
    },
    // 点击播放按钮
    play () {
      this.setIsPlaying(!this.PlayerIsPlaying)
    }
  },
  computed: {
    ...mapGetters([
      'PlayerIsPlaying'
    ])
  },
  watch: {
    PlayerIsPlaying: function (newV, oldV) {
      if (newV) {
        this.$refs.play.classList.add('pause')
        this.$refs.cover.classList.add('pause')
      } else {
        this.$refs.play.classList.remove('pause')
        this.$refs.cover.classList.remove('pause')
      }
    }
  }
}
</script>

<style scoped lang="scss">
@import "src/assets/css/variable";
@import "src/assets/css/mixin";

.mini {
  height: 150px;
  width: 100%;
  position: fixed;
  bottom: 0;
  @include bg_color();
  border-top: 1px solid #cccccc;

  .wrapper {
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .left {
      margin-left: 40px;
      display: flex;
      justify-content: center;
      align-items: center;

      .cover {
        width: 120px;
        height: 120px;
        border-radius: 50%;
        overflow: hidden;
        animation: coverRotate 8s linear infinite;

        &.play {
          animation-play-state: paused;

          &.pause {
            animation-play-state: running;
          }
        }

        img {
          width: 100%;
          height: 100%;
        }
      }

      .title {
        @include font-color();
        margin-left: 20px;

        h3 {
          @include font_size($font_large);
        }

        p {
          @include font_size($font_medium);
          opacity: 0.5;
        }
      }
    }

    .right {
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;

      div {
        width: 100px;
        height: 100px;

        &.play {
          @include bg_img('../../assets/images/play');

          &.pause {
            @include bg_img('../../assets/images/pause')
          }
        }

        &.list {
          width: 150px;
          height: 150px;
          @include bg_img('../../assets/images/list')
        }
      }
    }
  }
}

@keyframes coverRotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
