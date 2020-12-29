<template>
  <swiper :options="swiperOption"
          :auto-update="true"
          :auto-destroy="true"
          class="middle">
    <swiper-slide class="play-home">
      <div class="cover play" ref="cover">
        <img :src="currentSong.picUrl" alt="">
      </div>
    </swiper-slide>
    <swiper-slide class="lyric">
          <ScrollView ref="scroll_lyric">
          <ul>
            <li v-for="(value, index) in currentLyric" :key="index">{{ value }}</li>
          </ul>
        </ScrollView>
    </swiper-slide>
    <div class="swiper-pagination" slot="pagination"></div>
  </swiper>
</template>
<script>
import { directive, Swiper, SwiperSlide } from 'vue-awesome-swiper'
import { mapGetters, mapActions } from 'vuex'

// import style (<= Swiper 5.x)
import 'swiper/css/swiper.css'
import ScrollView from '@/components/ScrollView'
// import style (>= Swiper 6.x)
// import 'swiper/swiper-bundle.css'
export default {
  name: 'PlayerMiddle',
  components: {
    ScrollView,
    Swiper,
    SwiperSlide
  },
  data () {
    return {
      swiperOption: {
        // 如果需要分页器
        pagination: {
          el: '.swiper-pagination',
          bulletClass: 'player-middle-bullet',
          bulletActiveClass: 'player-middle-active-bullet'
        },
        observer: true,
        observeParents: true,
        observeSlideChildren: true,
        directives: {
          swiper: directive
        }
      }
    }
  },
  computed: {
    ...mapGetters([
      'PlayerIsPlaying',
      'currentSong',
      'currentLyric'
    ])
  },
  watch: {
    PlayerIsPlaying: function (newV) {
      if (newV) {
        this.$refs.cover.classList.add('pause')
      } else {
        this.$refs.cover.classList.remove('pause')
      }
    },
    currentSong (newV, oldV) {
      if (!newV.id) return
      this.setSongLyric(newV.id)
    },
    currentLyric (newV, oldV) {
      if (newV) {
        const observer = new MutationObserver(() => {
          this.$refs.scroll_lyric.refresh10()
        })
        observer.observe(this.$refs.scroll_lyric.$el, {
          childList: true,
          subtree: true
        })
      }
    }
  },
  methods: {
    ...mapActions([
      'setSongLyric'
    ])
  }
}
</script>
<style scoped lang="scss">
@import "src/assets/css/variable";
@import "src/assets/css/mixin";

.middle {
  position: fixed;
  top: 120px;
  bottom: 200px;
  left: 0;
  right: 0;
  overflow: hidden;

  .lyric {
    width: 100%;
    height: 100%;
    & li {
      list-style: none;
      @include font_size($font_medium);
      @include font-color();
      opacity: 0.8;
      line-height: 80px;
      text-align: center;

      &:last-of-type {
        padding-bottom: 50px;
      }
    }
  }
}

.cover {
  width: 500px;
  height: 500px;
  border-radius: 50%;
  border: 54px solid #FFFFFF;
  margin: 0 auto;
  margin-top: 150px;
  margin-bottom: 280px;
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

@keyframes coverRotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
<style lang="scss">
/*
覆盖 swiper 样式，不能添加scoped属性
 */
@import "../../assets/css/mixin";
@import "../../assets/css/variable";

.middle {
  .swiper-pagination {
    bottom: -30px;
  }

  .player-middle-bullet {
    border-radius: 10px;
    display: inline-block;
    height: 20px;
    width: 20px;
    opacity: 1;
    background-color: #fff;
    margin: 0 16px;
  }

  .player-middle-active-bullet {
    width: 60px;
    @include bg_color;
  }
}
</style>
