<template>
    <div class="subheader" @click="changeTheme">
        <div class="subheader-left" @click.stop="backToPrePage"></div>
        <p class="subheader-title">{{ title }}</p>
        <div class="subheader-right"></div>
    </div>
</template>

<script>
export default {
  name: 'SubHeader',
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
    backToPrePage () {
      // console.log('back to pre page')
      window.history.back()
    }
  },
  props: ['title']
}
</script>

<style lang="scss" scoped>
@import "../../assets/css/mixin";
@import "../../assets/css/variable";

.subheader {
    @include bg_color();
    @include font_size($font_medium);
    width: 100%;
    height: 100px;
    display: flex;
    justify-content: space-between;

    .subheader-left, .subheader-right {
        width: 84px;
        height: 84px;
        margin-top: 8px;
    }

    .subheader-title {
        text-align: center;
        line-height: 100px;
        font-weight: bold;
        color: white;
        width: auto;
      @include no-wrap();
    }

    .subheader-left {
        $url: '../../assets/images/back';
        @include bg_img($url);
    }

    .subheader-right {
        $url: '../../assets/images/more';
        @include bg_img($url);
    }
}
</style>
