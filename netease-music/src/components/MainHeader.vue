<template>
  <div class="header" @click.stop="changeTheme">
    <div class="left">
      <slot name="left">左边</slot>
    </div>
    <div class="middle">
      <slot name="middle">中间</slot>
    </div>
    <div class="right">
      <slot name="right">右边</slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MainHeader',
  data: () => {
    return {
      themes: ['theme', 'theme1', 'theme2'],
      index: 0
    }
  },
  methods: {
    changeTheme () {
      document.documentElement.setAttribute('data-theme', this.themes[this.index])
      this.index = (this.index + 1) % 3
    },
    toAccount () {
      this.$router.push('/account')
    }
  }
}
</script>

<style scoped lang="scss">
@import "../assets/css/mixin";
@import "../assets/css/variable";

.header {
    @include bg_color();
    @include font_size($font_medium);
    width: 100%;
    height: 100px;
    display: flex;
    justify-content: space-between;

    .left, .right {
        width: 84px;
        height: 84px;
        margin-top: 8px;
      * {
        width: 100%;
        height: 100%;
      }
    }
}
</style>
