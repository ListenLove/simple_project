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
      'setSongDetail',
      'setCurrentTime',
      'setFavList',
      'setHistorySong',
      'setHistoryList',
      'setCurrentSong'
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
    currentIndex (newV) {
      this.setCurrentSong(this.Songs[newV])
      this.songDuration = this.$refs.audio.duration
    },
    currentTime (val) {
      this.$refs.audio.currentTime = val
    },
    favoriteList (val) {
      setLocalStorage('favoriteList', val)
    },
    currentSong (val) {
      console.log(val)
      this.setHistorySong(val)
      /* if (!this.$refs.audio.src) {
        console.log('没有此歌曲，跳过')
        this.setCurrentIndex(this.currentIndex + 1)
      } */
      if (this.PlayerIsPlaying) {
        this.$refs.audio.play()
      }
    },
    historyList (val) {
      setLocalStorage('historyList', val)
    }
  },
  mounted () {
    this.$refs.audio.oncanplay = () => {
      this.songDuration = this.$refs.audio.duration
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
