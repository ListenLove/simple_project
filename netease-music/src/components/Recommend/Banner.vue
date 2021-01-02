<template>
  <swiper :options="swiperOption"
          :auto-update="true"
          :auto-destroy="true"
          class="banner"
          v-if="banners.length > 1">
    <swiper-slide v-for="banner in banners" :key="banner.bannerId">
      <a :href="banner.url">
<!--        <img :src="banner.pic" alt="">-->
                <img v-lazy="banner.pic" alt="">
      </a>
    </swiper-slide>
    <div class="swiper-pagination" slot="pagination"></div>
  </swiper>
</template>

<script>
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
// import Swiper2, { Navigation, Pagination, Autoplay } from 'swiper'

// import style (<= Swiper 5.x)
import 'swiper/css/swiper.css'
// import style (>= Swiper 6.x)
// import 'swiper/swiper-bundle.css'
// Swiper2.use([Autoplay, Navigation, Pagination])
export default {
  name: 'Banner',
  components: {
    Swiper,
    SwiperSlide
  },
  data () {
    return {
      swiperOption: {
        loop: true,
        autoplay: {
          delay: 1000, // 自动切换的时间间隔，单位ms
          stopOnLastSlide: false, // 当切换到最后一个slide时停止自动切换
          disableOnInteraction: false // 用户操作swiper之后，是否禁止autoplay。
        },
        // 如果需要分页器
        pagination: {
          el: '.swiper-pagination'
          // type: 'bullets'
        },
        observer: true,
        observeParents: true,
        observeSlideChildren: true
      }
    }
  },
  props: {
    banners: {
      type: Array,
      required: true,
      default: () => []
    }
  }
}

</script>

<style scoped lang="scss">

.banner {
  width: 100%;
  height: 300px;
  img {
    width: 100%;
    height: 100%;
  }
}

</style>
<style lang="scss">
/*
覆盖 swiper 样式，不能添加scoped属性
 */
@import "../../assets/css/mixin";
@import "../../assets/css/variable";

.banner {
    .swiper-pagination {
    bottom: -20px;
  }
  .swiper-pagination-bullet {
    display: inline-block;
    height: $font_medium;
    width: $font_medium;
    opacity: 1;
    background-color: #fff;
  }

  .swiper-pagination-bullet-active {
    @include bg_color;
  }
}
</style>
