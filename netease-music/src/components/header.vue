<template>
  <!--    <div class="header" @click="changeTheme">
          <div class="header-left"></div>
          <p class="header-title">高仿云音乐</p>
          <div class="header-right" @click.stop="toAccount"></div>
      </div>-->
  <MainHeader>
    <div class="header-left" slot="left"></div>
    <p class="header-title" slot="middle">高仿云音乐</p>
    <div class="header-right" @click.stop="toAccount" slot="right"></div>
  </MainHeader>
</template>
<script>
import MainHeader from './MainHeader'

export default {
  name: 'net-header',
  components: {
    MainHeader
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

</style>
