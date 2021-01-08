<template>
  <div class="loading" v-show="isShow">
    <span class="loading-icon">
      <i class="el-icon-loading"></i>
    </span>
  </div>
</template>

<script>
export default {
  name: 'Loading',
  data () {
    return {
      isShow: false
    }
  }
}
</script>

<style scoped lang="scss">
@import "src/assets/css/mixin";

.loading {
  position: absolute;
  z-index: 999;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 200px;
  height: 200px;
  border-radius: 40px;
  text-align: center;

  span {
    font-size: 100px;
    line-height: 200px;
    @include font-color();
  }
}
</style>
