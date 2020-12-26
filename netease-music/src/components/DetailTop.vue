<template>
  <div class="detail-top">
    <img :src="url" alt="">
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
  }
}
</script>

<style scoped lang="scss">
.detail-top {
  width: 100%;
  height: 500px;
  overflow: hidden;
  img {
    width: 100%;
  }
}
</style>
