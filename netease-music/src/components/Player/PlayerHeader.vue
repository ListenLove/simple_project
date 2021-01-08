<template>
  <!--  <div class="header">
      <div class="header-left" @click="hiddenPlayerNormal"></div>
      <div class="header-title">
        <h3>{{ currentSong.name }}</h3>
        <p>{{ currentSong.singer }}</p>
      </div>
      <div class="header-right"></div>
    </div>-->
  <MainHeader>
    <div class="header-left" @click="hiddenPlayerNormal" slot="left"></div>
    <div class="header-title" slot="middle">
      <h3>{{ currentSong.name }}</h3>
      <p>{{ currentSong.singer }}</p>
    </div>
    <div class="header-right" slot="right"></div>
  </MainHeader>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import MainHeader from '@/components/MainHeader'

export default {
  name: 'PlayerHeader',
  components: {
    MainHeader
  },
  methods: {
    ...mapActions([
      'setPlayerNormal',
      'setMiniPlayer'
    ]),
    hiddenPlayerNormal () {
      this.setPlayerNormal(false)
      this.setMiniPlayer(true)
      console.log('close player normal')
    }
  },
  computed: {
    ...mapGetters([
      'currentSong'
    ])
  }
}
</script>

<style scoped lang="scss">
@import "src/assets/css/variable";
@import "src/assets/css/mixin";

.header-title {
  text-align: center;
  color: #FFFFFF;
  width: auto;

  h3 {
    margin-top: 5px;
    @include font_size($font_large);
  }

  p {
    margin-top: 5px;
    @include font_size($font_medium_s);
    opacity: 0.8;
  }
}

.header-left {
  $url: '../../assets/images/down';
  @include bg_img($url);
}

.header-right {
  $url: '../../assets/images/more';
  @include bg_img($url);
}

</style>
