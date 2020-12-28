<template>
  <swiper :options="swiperOption"
          :auto-update="true"
          :auto-destroy="true"
          class="middle">
    <swiper-slide class="play-home">
      <div class="cover play" ref="cover">
        <img src="https://p1.music.126.net/vgkXY8jcKXaXdZgkLKTzOw==/109951165561857649.jpg" alt="">
      </div>
    </swiper-slide>
    <swiper-slide>
      <div class="lyric">
        <ScrollView>
          <ul>
            <li>我是第1个li</li>
            <li>我是第2个li</li>
            <li>我是第3个li</li>
            <li>我是第4个li</li>
            <li>我是第5个li</li>
            <li>我是第6个li</li>
            <li>我是第7个li</li>
            <li>我是第8个li</li>
            <li>我是第9个li</li>
            <li>我是第10个li</li>
            <li>我是第11个li</li>
            <li>我是第12个li</li>
            <li>我是第13个li</li>
            <li>我是第14个li</li>
            <li>我是第15个li</li>
            <li>我是第16个li</li>
            <li>我是第17个li</li>
            <li>我是第18个li</li>
            <li>我是第19个li</li>
            <li>我是第20个li</li>
            <li>我是第21个li</li>
            <li>我是第22个li</li>
            <li>我是第23个li</li>
            <li>我是第24个li</li>
            <li>我是第25个li</li>
            <li>我是第26个li</li>
            <li>我是第27个li</li>
            <li>我是第28个li</li>
            <li>我是第29个li</li>
            <li>我是第30个li</li>
            <li>我是第31个li</li>
            <li>我是第32个li</li>
            <li>我是第33个li</li>
            <li>我是第34个li</li>
            <li>我是第35个li</li>
            <li>我是第36个li</li>
            <li>我是第37个li</li>
            <li>我是第38个li</li>
            <li>我是第39个li</li>
            <li>我是第40个li</li>
            <li>我是第41个li</li>
            <li>我是第42个li</li>
            <li>我是第43个li</li>
            <li>我是第44个li</li>
            <li>我是第45个li</li>
            <li>我是第46个li</li>
            <li>我是第47个li</li>
            <li>我是第48个li</li>
            <li>我是第49个li</li>
            <li>我是第50个li</li>
          </ul>
        </ScrollView>
      </div>
    </swiper-slide>
    <div class="swiper-pagination" slot="pagination"></div>
  </swiper>
</template>
<script>
import { directive, Swiper, SwiperSlide } from 'vue-awesome-swiper'
import { mapGetters } from 'vuex'

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
      'PlayerIsPlaying'
    ])
  },
  watch: {
    PlayerIsPlaying: function (newV) {
      if (newV) {
        this.$refs.cover.classList.add('pause')
      } else {
        this.$refs.cover.classList.remove('pause')
      }
    }
  }
}
</script>
<style scoped lang="scss">
@import "src/assets/css/variable";
@import "src/assets/css/mixin";

.middle {
  position: relative;
  left: 0;
  right: 0;

  .lyric {
    position: fixed;
    width: 100%;
    height: 100%;
    overflow: hidden;

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
