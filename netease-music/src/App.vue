<template>
  <div id="app">
    <net-header></net-header>
    <net-tabbar></net-tabbar>
    <router-view></router-view>
    <Player></Player>
  </div>
</template>
<script>
import NetHeader from './components/header'
import NetTabbar from './components/tabbar'
import Player from '@/views/Player'

export default {
  // eslint-disable-next-line vue/no-unused-components
  components: { Player, NetHeader, NetTabbar }
}

</script>
<style lang="scss">
@import "assets/css/variable";
* {
  margin: 0;
  padding: 0;
}
.button-container {
  position: absolute;
  left: 0;
  bottom: 0;
}
button {
  width: 100px;
  height: 100px;
  &:nth-of-type(1) {
    background-color: $background-color-theme;
  }
  &:nth-of-type(2) {
    background-color: $background-color-theme1;
  }
  &:nth-of-type(3) {
    background-color: $background-color-theme2;
  }
}
</style>
