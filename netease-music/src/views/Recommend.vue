<template>
  <div class="recommend">
    <!--    <div class="core-container">-->
    <div class="recommend-wrap">
      <ScrollView>
        <Banner :banners="banners"></Banner>
        <Personalized :result="result" :title="'推荐歌单'" @selectId="selectSongDetail"
                      :typed="'personalized'"></Personalized>
        <Personalized :result="album" :title="'最新专辑'" @selectId="selectSongDetail" :typed="'album'"></Personalized>
        <SongList :song_list="songs_list"></SongList>
      </ScrollView>
    </div>
    <!--    </div>-->
    <transition>
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
import { getNewAlbum, getNewSongList, getPersonalized, getRecommendBanner } from '@/api'
import Banner from '@/components/Recommend/Banner'
import Personalized from '@/components/Recommend/Personalized'
import SongList from '@/components/Recommend/SongList'
import ScrollView from '@/components/ScrollView'

export default {
  name: 'Recommend',
  components: {
    ScrollView,
    SongList,
    Personalized,
    Banner
  },
  created () {
    getRecommendBanner()
      .then(value => {
        // console.log(value)
        this.banners = value.banners
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
        // console.log(value)
        const result = []
        value.result.forEach(function (value) {
          const obj = {}
          obj.id = value.id
          obj.name = value.name
          obj.picUrl = value.picUrl
          obj.singer = ''
          for (let i = 0; i < value.song.artists.length; i++) {
            if (i === 0) {
              obj.singer += value.song.artists[i].name
            } else {
              obj.singer += '-' + value.song.artists[i].name
            }
          }
          if (obj.id !== null && obj.id !== undefined) {
            result.push(obj)
          }
        })
        this.songs_list = result
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
  },
  methods: {
    selectSongDetail (id, typed) {
      // console.log(id)
      this.$router.push({
        path: '/recommend/detail/' + typed,
        query: {
          id: id, // 查询 id 参数
          typed: typed
        }
      })
    }
  }
}
</script>

<style scoped lang="scss">
.recommend {
  width: 100%;
  height: 100%;

  .recommend-wrap {
    position: absolute;
    top: 184px;
    left: 0;
    bottom: 0;
    overflow: hidden;
    width: 100%;
  }
}

.v-enter {
  transform: translateX(100%);
}

.v-enter-to {
  transform: translateX(0);

}

.v-enter-active {
  transition: all 1s;
}

.v-leave {
  transform: translateX(0);

}

.v-leave-to {
  transform: translateX(100%);
}

.v-leave-active {
  transition: all 1s;
}

</style>
