<template>
  <div class="footer">
    <p>
      <a href="https://beian.miit.gov.cn/">赣ICP备2021000410号</a>
    </p>
  </div>
</template>

<script>

export default {
  name: 'HomepageFooter'
}
</script>

<style scoped lang="scss">
@import "../assets/css/variable";
@import "../assets/css/mixin";

.footer {
  position: relative;
  @include font_size($font_medium);
  @include bg_sub_color();

  p {
    text-align: center;
    height: 100px;

    a {
      line-height: 100px;
      text-decoration: none;
      @include font-color();
    }
  }
}
</style>
