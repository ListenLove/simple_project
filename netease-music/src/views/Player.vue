<template>
  <div class="play">
    <PlayerHeader></PlayerHeader>
    <PlayerMiddle></PlayerMiddle>
    <PlayerBottom></PlayerBottom>
  </div>
</template>

<script>
import PlayerHeader from '@/components/Player/PlayerHeader'
import PlayerMiddle from '@/components/Player/PlayerMiddle'
import PlayerBottom from '@/components/Player/PlayerBottom'

export default {
  name: 'PlayView',
  components: {
    PlayerBottom,
    PlayerMiddle,
    PlayerHeader
  }
}
</script>

<style scoped lang="scss">
.play {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: pink;
}
</style>
