<template>
  <transition
    :css="false"
    @enter="playerEnter"
    @leave="playerLeave">
    <div class="player-list" v-show="this.PlayerListIsShow">
      <div class="top">
        <div class="top-left">
          <div class="play-mode loop" @click="changeMode" ref="mode"></div>
          <p class="play-desc" v-if="this.PlayMode === 0">顺序播放</p>
          <p class="play-desc" v-else-if="this.PlayMode === 1">单曲循环</p>
          <p class="play-desc" v-else-if="this.PlayMode === 2" >随机播放</p>
        </div>
        <p class="top-right"></p>
      </div>
      <div class="middle">
        <ScrollView>
          <ul>
            <li class="item">
              <div class="item-left">
                <div class="play-button"></div>
                <p class="song_name">演员</p>
              </div>
              <div class="item-right">
                <div class="un-favorite"></div>
                <div class="small_close"></div>
              </div>
            </li>
            <li class="item">
              <div class="item-left">
                <div class="play-button"></div>
                <p class="song_name">演员</p>
              </div>
              <div class="item-right">
                <div class="un-favorite"></div>
                <div class="small_close"></div>
              </div>
            </li>
            <li class="item">
              <div class="item-left">
                <div class="play-button"></div>
                <p class="song_name">演员</p>
              </div>
              <div class="item-right">
                <div class="un-favorite"></div>
                <div class="small_close"></div>
              </div>
            </li>
          </ul>
        </ScrollView>
      </div>
      <p class="bottom" @click.stop="hidden">关闭</p>
    </div>
  </transition>
</template>

<script>
import ScrollView from '@/components/ScrollView'
import Velocity from 'velocity-animate'
import 'velocity-animate/velocity.ui'
import { mapGetters, mapActions } from 'vuex'
import { modeType } from '@/store/modeType'

export default {
  name: 'PlayerList',
  components: { ScrollView },
  /* data: function () {
    return {
      isShow: false
    }
  }, */
  computed: {
    ...mapGetters([
      'PlayMode',
      'PlayerListIsShow'
    ])
  },
  methods: {
    ...mapActions([
      'setModeType',
      'setPlayerListShow'
    ]),
    show () {
      this.isShow = true
    },
    hidden () {
      this.setPlayerListShow(false)
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
  watch: {
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
@import "src/assets/css/variable";
@import "src/assets/css/mixin";

.player-list {
  width: 100%;
  position: fixed;
  bottom: 0;
  left: 0;
  @include bg_sub_color();

  .top {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .top-left {
      display: flex;
      align-items: center;
      width: 100%;
      height: 100px;

      .play-mode {
        margin: 0 20px;
        height: 80px;
        width: 80px;
        //@include bg_img('../../assets/images/small_loop')
        &.loop {
          @include bg_img('../../assets/images/small_loop');
        }

        &.one {
          @include bg_img('../../assets/images/small_one');
        }

        &.random {
          @include bg_img('../../assets/images/small_shuffle');
        }
      }

      .play-desc {
        @include font-color();
        @include font_size($font_medium);
      }
    }

    .top-right {
      width: 100px;
      height: 100px;
      @include bg_img('../../assets/images/small_del');
      margin-right: 20px;
    }
  }

  .middle {
    overflow: hidden;

    .item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      height: 100px;
      border: 1px solid #cccccc;

      .item-left {
        display: flex;
        align-items: center;
        margin-left: 20px;

        .play-button {
          width: 80px;
          height: 80px;
          @include bg_img('../../assets/images/small_play');
        }

        .song_name {
          margin-left: 20px;
          @include font_size($font_medium);
          @include font-color();
          opacity: 0.8;
        }
      }

      .item-right {
        display: flex;
        align-items: center;

        .un-favorite {
          width: 80px;
          height: 80px;
          @include bg_img('../../assets/images/small_un_favorite');
        }

        .small_close {
          margin: 0 20px;
          width: 80px;
          height: 80px;
          @include bg_img('../../assets/images/small_close');
        }
      }
    }
  }

  .bottom {
    height: 100px;
    width: 100%;
    display: block;
    line-height: 100px;
    color: #FFFFFF;
    text-align: center;
    @include font_size($font_medium);
    @include bg_color();
  }
}
</style>
