<template>
  <div class="play" v-show="this.FullScreen">
    <PlayNormal v-show="this.NormalPlayerShow" :songDuration="songDuration"
                :songCurrentTime="songCurrentTime"></PlayNormal>
    <PlayerMini @isShow="isShow" v-show="this.MiniPlayerShow"></PlayerMini>
    <PlayerList ref="playlist"></PlayerList>
    <audio :src="currentSong.url" ref="audio" @timeupdate="playingSong"></audio>
  </div>
</template>

<script>
import PlayNormal from '@/components/Player/PlayerNormal'
import PlayerMini from '@/components/Player/PlayerMini'
import PlayerList from '@/components/Player/PlayerList'
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'PlayView',
  data () {
    return {
      songDuration: 0,
      songCurrentTime: 0
    }
  },
  components: {
    PlayerList,
    PlayerMini,
    PlayNormal
  },
  methods: {
    ...mapActions([
      'setCurrentIndex'
    ]),
    isShow () {
      this.$refs.playlist.show()
    },
    playingSong (e) {
      this.songCurrentTime = e.target.currentTime
    }
  },
  computed: {
    ...mapGetters([
      'FullScreen',
      'NormalPlayerShow',
      'MiniPlayerShow',
      'currentSong',
      'PlayerIsPlaying',
      'currentIndex',
      'currentTime'
    ])
  },
  watch: {
    PlayerIsPlaying (newV, oldV) {
      if (newV) {
        this.$refs.audio.play()
      } else {
        this.$refs.audio.pause()
      }
    },
    currentIndex () {
      this.$refs.audio.oncanplay = () => {
        if (!this.$refs.audio.src) {
          console.log('没有此歌曲，跳过')
          this.setCurrentIndex(this.currentIndex + 1)
        }
        this.songDuration = this.$refs.audio.duration
        if (this.PlayerIsPlaying) {
          this.$refs.audio.play()
        } else {
          this.$refs.audio.pause()
        }
      }
    },
    currentTime (val) {
      this.$refs.audio.currentTime = val
    }
  },
  mounted () {
    this.$refs.audio.oncanplay = () => {
      this.songDuration = this.$refs.audio.duration
    }
  }
}
</script>

<style scoped lang="scss">
</style>
