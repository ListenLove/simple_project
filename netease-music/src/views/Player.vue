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
      'setFavList'
    ]),
    getRandomInt (min, max) {
      min = Math.ceil(min)
      max = Math.floor(max)
      return Math.floor(Math.random() * (max - min)) + min // 不含最大值，含最小值
    },
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
        const randIndex = this.getRandomInt(0, this.Songs.length)
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
      'favoriteList'
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
    },
    favoriteList (val) {
      window.localStorage.setItem('favoriteList', JSON.stringify(val))
    }
  },
  mounted () {
    this.$refs.audio.oncanplay = () => {
      this.songDuration = this.$refs.audio.duration
    }
  },
  created () {
    const favListLocal = JSON.parse(window.localStorage.getItem('favoriteList'))
    console.log(favListLocal)
    favListLocal && this.setFavList(favListLocal)
  }
}
</script>

<style scoped lang="scss">
</style>
