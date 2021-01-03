<template>
  <div class="play" v-show="this.FullScreen">
    <PlayNormal v-show="this.NormalPlayerShow" :songDuration="songDuration"
                :songCurrentTime="songCurrentTime"></PlayNormal>
    <PlayerMini @isShow="isShow" v-show="this.MiniPlayerShow"></PlayerMini>
    <PlayerList ref="playlist"></PlayerList>
    <audio :src="currentSong.url" ref="audio" @timeupdate="playingSong" @ended="songAtEnd"></audio>
  </div>
</template>

<script>
import PlayNormal from '@/components/Player/PlayerNormal'
import PlayerMini from '@/components/Player/PlayerMini'
import PlayerList from '@/components/Player/PlayerList'
import { mapGetters, mapActions } from 'vuex'
import { modeType } from '@/store/modeType'
import { getLocalStorage, getRandomInt, setLocalStorage } from '@/tools/tools'

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
      'setCurrentIndex',
      'setCurrentTime',
      'setFavList',
      'setHistorySong',
      'setHistoryList',
      'setCurrentSong',
      'setIsPlaying'
    ]),
    isShow () {
      this.$refs.playlist.show()
    },
    playingSong (e) {
      this.songCurrentTime = e.target.currentTime
    },
    songAtEnd (e) {
      if (this.Songs.length <= 1 || modeType.one === this.PlayMode) {
        e.target.play()
      } else if (modeType.loop === this.PlayMode) {
        this.setCurrentIndex(this.currentIndex + 1)
      } else if (modeType.random === this.PlayMode) {
        const randIndex = getRandomInt(0, this.Songs.length)
        console.log(randIndex)
        this.setCurrentIndex(randIndex)
      }
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
      'currentTime',
      'PlayMode',
      'Songs',
      'favoriteList',
      'historyList'
    ])
  },
  watch: {
    PlayerIsPlaying (newV) {
      if (newV) {
        this.$refs.audio.play()
        this.setCurrentSong(this.Songs[this.currentIndex])
      } else {
        this.$refs.audio.pause()
      }
    },
    currentIndex () {
      this.$refs.audio.load()
      this.$refs.audio.ondurationchange = () => {
        this.songDuration = this.$refs.audio.duration
        if (this.PlayerIsPlaying) {
          this.$refs.audio.play()
          this.setHistorySong(this.currentSong)
          console.log('done')
        } else {
          this.$refs.audio.pause()
        }
      }
    },
    currentTime (val) {
      this.$refs.audio.currentTime = val
    },
    favoriteList (val) {
      setLocalStorage('favoriteList', val)
    },
    historyList (val) {
      setLocalStorage('historyList', val)
    }
  },
  mounted () {
    this.$refs.audio.ondurationchange = () => {
      this.songDuration = this.$refs.audio.duration
      if (this.PlayerIsPlaying) {
        this.$refs.audio.play()
        this.setHistorySong(this.currentSong)
        console.log('done')
      } else {
        this.$refs.audio.pause()
      }
    }
  },
  created () {
    const favListLocal = getLocalStorage('favoriteList')
    favListLocal && this.setFavList(favListLocal)
    const historyList = getLocalStorage('historyList')
    historyList && this.setHistoryList(historyList)
  }
}
</script>

<style scoped lang="scss">
</style>
