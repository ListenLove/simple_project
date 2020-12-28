<template>
  <div class="play" v-show="this.FullScreen">
    <PlayNormal v-show="this.NormalPlayerShow"></PlayNormal>
    <PlayerMini @isShow="isShow" v-show="this.MiniPlayerShow"></PlayerMini>
    <PlayerList ref="playlist"></PlayerList>
  </div>
</template>

<script>
import PlayNormal from '@/components/Player/PlayerNormal'
import PlayerMini from '@/components/Player/PlayerMini'
import PlayerList from '@/components/Player/PlayerList'
import { mapGetters } from 'vuex'

export default {
  name: 'PlayView',
  components: {
    PlayerList,
    PlayerMini,
    PlayNormal
  },
  methods: {
    isShow () {
      this.$refs.playlist.show()
    }
  },
  computed: {
    ...mapGetters([
      'FullScreen',
      'NormalPlayerShow',
      'MiniPlayerShow'
    ])
  }
}
</script>

<style scoped lang="scss">
</style>
