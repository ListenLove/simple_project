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
          <p class="play-desc" v-else-if="this.PlayMode === 2">随机播放</p>
        </div>
        <p class="top-right" @click="delAllSongs"></p>
      </div>
      <div class="middle">
        <ScrollView ref="scroll_song_list">
          <ul ref="item_ul">
            <li class="item" v-for="(value, index) in Songs" :key="index" @click.stop="selectSong(index)">
              <div class="item-left">
                <div class="play-button" v-show="currentIndex === index"></div>
                <p class="song_name">{{ value.name }}</p>
              </div>
              <div class="item-right">
                <div class="un-favorite"></div>
                <div class="small_close" @click.stop="delSong(index)"></div>
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
      'PlayerListIsShow',
      'Songs',
      'currentIndex',
      'PlayerIsPlaying'
    ])
  },
  methods: {
    ...mapActions([
      'setModeType',
      'setPlayerListShow',
      'delSongFromSongList',
      'setSongDetail',
      'setIsPlaying',
      'setCurrentIndex'
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
    },
    delAllSongs () {
      this.delSongFromSongList()
    },
    delSong (index) {
      this.delSongFromSongList(index)
    },
    selectSong (index) {
      if (index === this.currentIndex) {
        if (this.$refs.item_ul.classList.contains('pause')) {
          this.$refs.item_ul.classList.remove('pause')
        } else {
          this.$refs.item_ul.classList.add('pause')
        }
      } else {
        this.setCurrentIndex(index)
        this.$refs.item_ul.classList.remove('pause')
        this.$refs.item_ul.classList.add('pause')
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
    },
    PlayerListIsShow (newV) {
      if (newV) {
        this.$refs.scroll_song_list.refresh()
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
  top: 700px;
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
    width: 100%;
    height: 100%;
    overflow: hidden;

    ul {
      li {
        & .play-button {
          width: 80px;
          height: 80px;
          @include bg_img('../../assets/images/small_play');
        }
      }

      &.pause {
        li {
          & .play-button {
            width: 80px;
            height: 80px;
            @include bg_img('../../assets/images/small_pause');
          }
        }
      }
    }

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

      &:last-of-type {
        // 列表最后一首歌应当高过关闭按钮
        padding-bottom: 200px;
      }
    }
  }

  .bottom {
    position: fixed;
    left: 0;
    bottom: 0;
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
