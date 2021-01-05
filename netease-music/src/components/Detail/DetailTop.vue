<template>
  <div class="detail-top">
    <img :src="url" alt="" ref="img">
    <div class="mask" ref="mask"></div>
  </div>
</template>

<script>
export default {
  name: 'DetailTop',
  props: {
    url: {
      type: String,
      required: true,
      default: ''
    }
  },
  methods: {
    changeMask (op) {
      this.$refs.mask.style.opacity = op
    }
  }
}
</script>

<style scoped lang="scss">
.detail-top {
  width: 100%;
  height: 500px;
  overflow: hidden;
  position: absolute;
  top: 0;

  img {
    width: 100%;
    transform: translateY(-150px);
  }

  .mask {
    position: absolute;
    top: 0;
    height: 100%;
    opacity: 0;
    width: 100%;
    background-color: #000000;
  }
}
</style>
