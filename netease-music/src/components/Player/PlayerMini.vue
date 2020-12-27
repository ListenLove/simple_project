<template>
  <div class="mini">
    <div class="wrapper">
      <div class="left">
        <div class="cover" @click="showPlayerNormal">
          <img src="https://p1.music.126.net/WToRhQ-wpL9chpxDd2n-HA==/109951165560539447.jpg" alt="">
        </div>
        <div class="title">
          <h3>演员</h3>
          <p>薛之谦</p>
        </div>
      </div>
      <div class="right">
        <div class="play"></div>
        <div class="list" @click.stop="showList"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'PlayerMini',
  methods: {
    ...mapActions([
      'setPlayerNormal',
      'setMiniPlayer'
    ]),
    showList () {
      console.log('show')
      this.$emit('isShow')
    },
    showPlayerNormal () {
      this.setPlayerNormal(true)
      this.setMiniPlayer(false)
    }
  }
}
</script>

<style scoped lang="scss">
@import "src/assets/css/variable";
@import "src/assets/css/mixin";

.mini {
  height: 150px;
  width: 100%;
  position: fixed;
  bottom: 0;
  @include bg_color();
  border-top: 1px solid #cccccc;

  .wrapper {
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .left {
      margin-left: 40px;
      display: flex;
      justify-content: center;
      align-items: center;

      .cover {
        width: 120px;
        height: 120px;
        border-radius: 50%;
        overflow: hidden;

        img {
          width: 100%;
          height: 100%;
        }
      }

      .title {
        @include font-color();
        margin-left: 20px;

        h3 {
          @include font_size($font_large);
        }

        p {
          @include font_size($font_medium);
          opacity: 0.5;
        }
      }
    }

    .right {
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;

      div {
        width: 100px;
        height: 100px;

        &.play {
          @include bg_img('../../assets/images/play')
        }

        &.list {
          width: 150px;
          height: 150px;
          @include bg_img('../../assets/images/list')
        }
      }
    }
  }
}

</style>
