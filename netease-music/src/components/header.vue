<template>
    <div class="header" @click="changeTheme">
        <div class="header-left"></div>
        <p class="header-title">高仿云音乐</p>
        <div class="header-right" @click.stop="toAccount"></div>
    </div>
</template>
<script>
export default {
  name: 'net-header',
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

<style lang="scss" scoped>
@import "../assets/css/mixin";
@import "../assets/css/variable";

.header {
    @include bg_color();
    @include font_size($font_medium);
    width: 100%;
    height: 100px;
    display: flex;
    justify-content: space-between;

    .header-left, .header-right {
        width: 84px;
        height: 84px;
        margin-top: 8px;
    }

    .header-title {
        text-align: center;
        line-height: 100px;
        font-weight: bold;
        color: white;
        width: auto;
    }

    .header-left {
        $url: '../assets/images/logo';
        @include bg_img($url);
    }

    .header-right {
        $url: '../assets/images/account';
        @include bg_img($url);
    }
}
</style>
