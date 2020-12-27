<template>
  <div class="personalized">
    <div class="personalized-title">
      <h3>{{ title }}</h3>
    </div>
    <div class="result_list" >
      <div class="item" v-for="r in result" :key="r.id" @click="selectId(r.id, typed)">
<!--        <img :src="r.picUrl" :alt="r.copywriter">-->
                <img v-lazy="r.picUrl" :alt="r.copywriter">
        <p>{{ r.name }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Personalized',
  props: {
    result: {
      type: Array,
      required: true,
      default: () => { return [] }
    },
    title: {
      type: String,
      required: true,
      default: ''
    },
    typed: {
      type: String,
      required: true,
      default: ''
    }
  },
  methods: {
    selectId (id, typed) {
      this.$emit('selectId', id, typed)
    }
  }

}
</script>

<style scoped lang="scss">
@import "src/assets/css/mixin";
@import "src/assets/css/variable";

.personalized {
  @include font-color();
  @include bg_sub_color();

  h3 {
    line-height: 84px;
    @include font_size($font_large);
    padding-left: 20px;
    border-left: 10px solid #FFFFFF;
    @include border_color();
    border-bottom: 2px solid #cccccc !important;
  }

  .result_list {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;

    .item {
      margin-top: 10px;
      width: 200px;
      height: 300px;

      img {
        width: 200px;
        height: 200px;
        border-radius: 12%;
      }

      p {
        position: relative;
        top: -20px;
        padding: 0 8px;
        @include clamp(2);
        @include font-color();
        @include font_size($font_medium_s)
      }
    }
  }
}

</style>
