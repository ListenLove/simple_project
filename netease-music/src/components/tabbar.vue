<template>
  <div class="tab-bar">
    <router-link tag="div" to="/recommend" class="item">
      <span>推荐</span>
    </router-link>
    <router-link tag="div" to="/singers" class="item">
      <span>歌手</span>
    </router-link>
    <router-link tag="div" to="/rank" class="item">
      <span>排行</span>
    </router-link>
    <router-link tag="div" to="/search" class="item">
      <span>搜索</span>
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'net-tabbar'
}
</script>

<style scoped lang="scss">
@import "../assets/css/mixin";
@import "../assets/css/variable";

.tab-bar {
  display: flex;
  justify-content: space-around;
  width: 100%;
  height: 84px;
  @include font_size($font_medium);
  @include bg_sub_color();

  .item {
    width: 16%;
    span {
      display: block;
      text-align: center;
      width: 100%;
      height: 84px;
      line-height: 84px;
      @include font_color();
    }
    // 点击激活字体样式
    &.router-link-active {
      span {
        @include font_active_color();
      }
      border-bottom: 8px solid #000000;
      @include border_color();
    }
  }
}
</style>
