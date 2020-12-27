<template>
  <div class="header">
    <div class="header-left"></div>
    <div class="header-title">
      <h3>演员</h3>
      <p>薛之谦️</p>
    </div>
    <div class="header-right"></div>
  </div>
</template>

<script>
export default {
  name: 'PlayerHeader'
}
</script>

<style scoped lang="scss">
@import "src/assets/css/variable";
@import "src/assets/css/mixin";

.header {
  @include font_size($font_medium);
  width: 100%;
  height: 100px;
  display: flex;
  justify-content: space-between;

  .header-left, .header-right {
    width: 90px;
    height: 90px;
    margin: 5px 10px;
  }

  .header-title {
    text-align: center;
    color: #FFFFFF;
    width: auto;

    h3 {
      margin-top: 5px;
      @include font_size($font_large);
    }

    p {
      margin-top: 5px;
      @include font_size($font_medium_s);
      opacity: 0.8;
    }
  }

  .header-left {
    $url: '../../assets/images/down';
    @include bg_img($url);
  }

  .header-right {
    $url: '../../assets/images/more';
    @include bg_img($url);
  }
}
</style>
