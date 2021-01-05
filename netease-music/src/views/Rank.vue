<template>
  <div class="rank">
    <scroll-view>
      <ul class="wrap">
        <li class="title" v-for="(value, key) in category.titles" :key="key">
          <h2>{{ value }}</h2>
          <ul class="rank-list" v-if="value==='官方榜'">
            <li class="item-lr" v-for="(item, i) in category[key]" :key="i" @click.stop="rankDetail(item.rank.id)">
              <div class="left">
                <img v-lazy="item.rank.coverImgUrl" alt="">
                <p>{{ item.rank.updateFrequency }}</p>
              </div>
              <div class="right">
                <p v-for="(song, index) in item.rank.tracks" :key="index">{{ index + 1 }}-{{
                    song.first
                  }}-{{ song.second }}</p>
              </div>
            </li>
          </ul>
          <ul class="rank-other-list" v-else>
            <li class="item-tb" v-for="(item, i) in category[key]" :key="i" @click.stop="rankDetail(item.rank.id)">
              <div class="top">
                <img v-lazy="item.rank.coverImgUrl" alt="">
                <p>{{ item.rank.updateFrequency }}</p>
              </div>
              <p class="bottom">{{ item.rank.name }}</p>
            </li>
          </ul>
        </li>
      </ul>
    </scroll-view>
    <router-view></router-view>
  </div>
</template>
<script>
import { getAllRankBrief } from '@/api'
import ScrollView from '@/components/ScrollView'

export default {
  name: 'Rank',
  components: {
    ScrollView
  },
  data: function () {
    return {
      category: {}
    }
  },
  methods: {
    rankDetail (id) {
      this.$router.push({
        path: '/rank/detail',
        query: {
          id: id, // 查询 id 参数
          typed: 'rank'
        }
      })
    }
  },
  created () {
    getAllRankBrief()
      .then(value => {
        this.category = value
        console.log(this.category)
      })
      .catch(reason => {
        console.log(reason)
      })
  }
}

</script>

<style scoped lang="scss">
@import '../assets/css/mixin';
@import '../assets/css/variable';

.rank {
  position: fixed;
  top: 184px;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;

  .wrap {
    list-style: none;

    .title {
      @include bg_sub_color();

      h2 {
        position: relative;
        top: 0;
        @include font_size($font_large);
        @include font-color();
        padding: 10px 20px;
        box-sizing: border-box;
      }

      .rank-list {
        .item-lr {
          display: flex;
          justify-content: start;
          align-items: center;

          .left {
            margin: 10px 20px;
            border-radius: 10px;
            height: 200px;
            width: 200px;
            overflow: hidden;
            position: relative;

            img {
              width: 100%;
              height: 100%;
            }

            p {
              position: absolute;
              right: 10px;
              bottom: 5px;
              @include font_size($font_medium_s);
              color: #FFFFFF;
            }
          }

          .right {
            p {
              padding: 10px 20px;
              @include font-color();
              @include font_size($font_medium);
              @include no-wrap();
            }
          }
        }
      }

      .rank-other-list {
        display: flex;
        flex-wrap: wrap;

        .item-tb {

          .top {
            margin: 10px 20px;
            border-radius: 10px;
            height: 200px;
            width: 200px;
            overflow: hidden;
            position: relative;

            img {
              width: 100%;
              height: 100%;
            }

            p {
              position: absolute;
              right: 10px;
              bottom: 5px;
              @include font_size($font_medium_s);
              color: #FFFFFF;
            }
          }

          .bottom {
            text-blink: random(10);
            width: 200px;
            padding: 10px 20px;
            text-align: center;
            @include font-color();
            @include font_size($font_medium_s);
            @include no-wrap();
          }
        }
      }
    }
  }
}
</style>
