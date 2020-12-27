<template>
  <div class="play-normal">
    <div class="play">
      <PlayerHeader></PlayerHeader>
      <PlayerMiddle></PlayerMiddle>
      <PlayerBottom></PlayerBottom>
    </div>
    <div class="bg"><img src="https://p1.music.126.net/vgkXY8jcKXaXdZgkLKTzOw==/109951165561857649.jpg" alt=""></div>
  </div>

</template>

<script>
import PlayerHeader from './PlayerHeader'
import PlayerMiddle from './PlayerMiddle'
import PlayerBottom from './PlayerBottom'

export default {
  name: 'PlayNormal',
  components: {
    PlayerBottom,
    PlayerMiddle,
    PlayerHeader
  }
}
</script>

<style scoped lang="scss">
@import "src/assets/css/mixin";
.play-normal {
  width: 100%;
  height: 100%;
  .play {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 999;
  }

  .bg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    @include bg_sub_color();
    img {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      height: 100%;
      filter: blur(10px) ;
      opacity: 1;
    }
  }
}
</style>
