<template>
  <!--  <div class="account-header" @click="changeTheme">
      <div class="account-header-left" @click.stop="backToPrePage"></div>
      <ul class="account-header-title">
        <li :class="{'active': 0 === activeButtonNum}" @click.stop="switchNum(0)">我喜欢的</li>
        <li :class="{'active': 1 === activeButtonNum}" @click.stop="switchNum(1)">最近听的</li>
      </ul>
      <div class="account-header-right"></div>
    </div>-->
  <MainHeader>
    <div class="account-header-left" @click.stop="backToPrePage" slot="left"></div>
    <ul class="account-header-title" slot="middle">
      <li :class="{'active': 0 === activeButtonNum}" @click.stop="switchNum(0)">我喜欢的</li>
      <li :class="{'active': 1 === activeButtonNum}" @click.stop="switchNum(1)">最近听的</li>
    </ul>
    <div class="account-header-right" slot="right"></div>
  </MainHeader>
</template>

<script>
import MainHeader from '@/components/MainHeader'

export default {
  name: 'AccountHeader',
  components: {
    MainHeader
  },
  data: () => {
    return {
      activeButtonNum: 0
    }
  },
  methods: {
    backToPrePage () {
      window.history.back()
    },
    switchNum (num) {
      this.activeButtonNum = num
      this.$emit('switchNum', num)
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../assets/css/mixin";
@import "../../assets/css/variable";

ul {
  &.account-header-title {
    height: 60px;
    text-align: center;
    line-height: 100px;
    font-weight: bold;
    color: white;
    width: auto;
    display: flex;
    align-items: center;
    @include no-wrap();
    border-radius: 10px;
    border: 2px solid #FFFFFF;
    list-style: none;
    margin-top: 20px;
  }

  li {
    padding: 10px 20px;
    height: 40px;
    line-height: 40px;
    @include font_size($font_medium);

    &:nth-of-type(1) {
      border-right: 2px solid #FFFFFF;
    }

    &.active {
      background-color: rgba(255, 255, 255, 0.3);
    }
  }
}

.account-header-left {
  $url: '../../assets/images/back';
  @include bg_img($url);
}

.account-header-right {
  $url: '../../assets/images/more';
  @include bg_img($url);
}

</style>
