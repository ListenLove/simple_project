<template>
  <div class="recommend">
    <Banner :banners="banners"></Banner>
    <Personalized :result="result" :title="'推荐歌单'"></Personalized>
    <Personalized :result="album" :title="'最新专辑'"></Personalized>
    <SongList :song_list="songs_list"></SongList>
  </div>
</template>

<script>
import { getNewAlbum, getNewSongList, getPersonalized, getRecommendBanner } from '@/api'
import Banner from '@/components/Recommend/Banner'
import Personalized from '@/components/Recommend/Personalized'
import SongList from '@/components/Recommend/SongList'

export default {
  name: 'Recommend',
  components: {
    SongList,
    Personalized,
    Banner
  },
  created () {
    getRecommendBanner()
      .then(value => {
        // console.log(value)
        this.result = value.result
      })
      .catch(reason => {
        console.log(reason)
      })
    getPersonalized()
      .then(value => {
        // console.log(value)
        this.result = value.result
      })
      .catch(reason => {
        console.log(reason)
      })
    getNewAlbum()
      .then(value => {
        // console.log(value)
        this.album = value.albums.splice(0, 6)
      })
      .catch(reason => {
        console.log(reason)
      })
    getNewSongList()
      .then(value => {
        console.log(value)
        this.songs_list = value.result
      })
      .catch(reason => {
        console.log(reason)
      })
  },
  data () {
    return {
      banners: [],
      result: [],
      album: [],
      songs_list: []
    }
  }
}
</script>

<style scoped>

</style>
