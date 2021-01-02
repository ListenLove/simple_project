<template>
  <transition
    enter-active-class="animate__animated animate__slideInRight"
    appear>
    <div class="account">
      <account-header @switchNum="switchNum"></account-header>
      <account-bottom :songs_list="tabNum === 0?favoriteList:historyList"></account-bottom>
    </div>
  </transition>
</template>

<script>
import 'animate.css/animate.min.css'
import AccountHeader from '@/components/Account/AccountHeader'
import AccountBottom from '@/components/Account/accountBottom'
import { mapGetters } from 'vuex'

export default {
  name: 'Account',
  components: {
    AccountBottom,
    AccountHeader
  },
  data: () => {
    return {
      tabNum: 0
    }
  },
  methods: {
    switchNum (num) {
      this.tabNum = num
      console.log(this.tabNum)
    }
  },
  computed: {
    ...mapGetters([
      'historyList',
      'favoriteList'
    ])
  }
}
</script>

<style scoped lang="scss">
@import "src/assets/css/mixin";

.account {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  @include bg_sub_color();
}
</style>
