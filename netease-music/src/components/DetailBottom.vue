<template>
  <ul class="detail-bottom">
    <li class="detail-bottom-top">
      <div class="bg-img"></div>
      <div>播放全部</div>
    </li>
    <li class="item" v-for="track in tracks" :key="track.id">
      <h3>{{ track.name }}</h3>
      <p>{{ track.al.name }}-{{ track.ar[0].name }}</p>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'DetailBottom',
  props: {
    tracks: {
      type: Array,
      required: true,
      default: () => []
    }
  }
}
</script>

<style scoped lang="scss">
@import "src/assets/css/mixin";
@import "src/assets/css/variable";

ul.detail-bottom {
  @include font-color();
  width: 100%;

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
    border-top-left-radius: 20%;
    border-top-right-radius: 20%;

    .bg-img {
      width: 78px;
      height: 78px;
      margin: 0 20px;
      @include bg_img('../assets/images/small_play');
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
