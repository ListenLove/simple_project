<template>
  <div class="player-bottom">
    <div class="top">
      <span>00:00</span>
      <div class="progress-bg">
        <div class="progress-line">
          <div class="progress-dot"></div>
        </div>
      </div>
      <span>00:00</span>
    </div>
    <div class="bottom">
      <div class="mode"></div>
      <div class="prev"></div>
      <div class="play"></div>
      <div class="next"></div>
      <div class="un-favorite"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PlayerBottom'
}
</script>

<style scoped lang="scss">
@import "src/assets/css/mixin";
@import "src/assets/css/variable";

.player-bottom {
  width: 100%;
  margin-top: 20px;

  .top {
    width: 90%;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;

    span {
      @include font_size($font_medium_s);
      @include font-color();
      opacity: 0.8;
      margin: 0 10px;
    }

    .progress-bg {
      border-radius: 5px;
      width: 80%;
      height: 10px;
      background-color: #FFFFFF;
      position: relative;

      .progress-line {
        border-radius: 5px;
        background-color: #999999;
        width: 50%;
        height: 100%;

        .progress-dot {
          position: absolute;
          top: 50%;
          transform: translate(-50%, -50%);
          left: 50%;
          width: 24px;
          height: 24px;
          margin: 0 auto;
          border-radius: 50%;
          background-color: #FFFFFF;
        }
      }
    }
  }

  .bottom {
    margin-top: 16px;
    display: flex;
    justify-content: space-around;
    align-items: center;

    div {
      width: 100px;
      height: 100px;
      //background-color: #aaa;
      &.mode {
        @include bg_img('../../assets/images/loop')
      }

      &.prev {
        @include bg_img('../../assets/images/prev')
      }

      &.play {
        @include bg_img('../../assets/images/play')
      }

      &.next {
        @include bg_img('../../assets/images/next')
      }

      &.un-favorite {
        @include bg_img('../../assets/images/un_favorite');
      }

      &.favorite {
        @include bg_img('../../assets/images/favorite');
      }
    }
  }
}
</style>
