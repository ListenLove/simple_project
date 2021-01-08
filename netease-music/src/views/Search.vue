<template>
  <div class="search">
    <div class="search-wrap">
      <div class="search-box">
        <span class="search-btn"><i class="el-icon-search"></i></span>
        <input type="text" v-model="keywords" placeholder="搜索歌曲、歌手、专辑" v-throttle="searchKW" v-focus ref="searchInput">
        <transition enter-active-class="animate__animated animate__bounceIn"
                    leave-active-class="animate__animated animate__bounceOut"
                    :duration="{ enter: 500, leave: 150 }"><span
          class="search-btn" @click.stop="searchClear" v-show="keywords !== ''"><i class="el-icon-close"></i></span>
        </transition>
      </div>

      <div class="search-result" v-show="keywords !== ''">
        <scroll-view ref="scroll">
          <ul>
            <transition-group
              enter-active-class="animate__animated animate__zoomInRight"
              leave-active-class="animate__animated animate__zoomOutLeft"
              mode="out-in">
              <li v-for="item in this.searchResult" :key="item.id" @click.stop="searchResultDetail(item.id)">
                <div class="result-item">
                  <!--              <span class="result-btn"><i class="el-icon-search"></i></span>-->
                  <span class="item-pic"><img :src="item.al.picUrl"
                                              alt=""></span>
                  <span class="result">{{ item.name }} - {{ item.ar[0].name }}</span>
                </div>
              </li>
            </transition-group>
          </ul>
        </scroll-view>
      </div>
      <div class="search-hot">
        <h3>热门搜索</h3>
        <ul>
          <li v-for="(item,index) in hots" :key="index" @click.stop="clickHotSearch(item.first)">{{ item.first }}</li>
        </ul>
      </div>
      <ul class="search-history">
        <li v-for="value in this.searchHistory" :key="value">
          <span><i class="el-icon-alarm-clock"></i></span>
          <p @click.stop="serachIt(value)">{{ value }}</p>
          <span class="delHistory" @click.stop="delHistoryItem(value)"><i class="el-icon-close"></i></span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import ScrollView from '@/components/ScrollView'
import 'animate.css/animate.min.css'
import { getSearchHot, getSearchSuggest } from '@/api'
import { mapActions } from 'vuex'
// eslint-disable-next-line no-unused-vars
import { getLocalStorage, setLocalStorage } from '@/tools/tools'

export default {
  name: 'Search',
  components: { ScrollView },
  data () {
    return {
      keywords: '',
      searchResult: [],
      hots: [],
      searchHistory: []
    }
  },
  watch: {
    keywords () {
      this.$refs.scroll.refresh10()
    },
    searchHistory (newV) {
      setLocalStorage('searchHistory', newV)
    }
  },
  methods: {
    ...mapActions([
      'setSongDetail',
      'setPlayerNormal',
      'setIsPlaying'
    ]),
    searchClear () {
      this.keywords = ''
      this.$refs.searchInput.focus()
    },
    searchKW () {
      if (this.keywords) {
        getSearchSuggest({ keywords: this.keywords })
          .then(value => {
            this.searchResult = value.result.songs
          })
          .catch(reason => {
            console.log(reason)
          })
      }
    },
    searchResultDetail (id) {
      this.setSongDetail(id)
      this.setPlayerNormal(true)
      this.setIsPlaying(true)
      const index = this.searchHistory.findIndex(value => {
        return value === this.keywords
      })
      console.log(index)
      if (index !== -1) this.searchHistory.splice(index, 1)
      this.searchHistory.unshift(this.keywords)
    },
    clickHotSearch (keywords) {
      this.keywords = keywords
      this.searchKW()
    },
    delHistoryItem (value) {
      this.searchHistory = this.searchHistory.filter(value1 => {
        return value1 !== value
      })
    },
    serachIt (value) {
      this.keywords = value
      this.searchKW()
    }
  },
  created () {
    getSearchHot()
      .then(value => {
        this.hots = value.result.hots
      })
      .catch(reason => {
        console.log(reason)
      })
    // 获取历史搜索记录
    this.searchHistory = getLocalStorage('searchHistory') || []
  },
  directives: {
    throttle: {
      inserted: (el, binding) => {
        let flag = true
        let timer = null
        el.addEventListener('input', function () {
          if (!flag) { return }
          flag = true
          timer && clearTimeout(timer)
          timer = setTimeout(function () {
            flag = true
            binding.value()
          }, 500)
        })
      }
    },
    focus: {
      // 指令的定义
      inserted: function (el) {
        el.focus()
      }
    }
  }
}
</script>

<style scoped lang="scss">
@import "src/assets/css/variable";
@import "src/assets/css/mixin";

.search {
  width: 100%;
  height: 100%;
  // 为适配 iOS 系统，需将使用到了 position: fixed 的样式包裹起来
  // 并用 absolute 代替，缘由是 iOS 对 fixed 的支持不佳，有严重显示 bug
  .search-wrap {
    @include bg_sub_color();
    position: absolute;
    top: 184px;
    bottom: 0;
    left: 0;
    width: 100%;

    .search-box {
      @include font_size($font_medium);
      @include font-color();
      background-color: #dddddd;
      margin: 10px 20px;
      border-radius: 30px;
      border-bottom: 2px solid #aaaaaa;
      display: flex;
      align-items: center;
      justify-content: flex-start;

      .search-btn {
        @include font_size($font_large);

        i {
          margin: 10px 20px;
          color: #888888;
          display: inline-block;
          width: 40px;
          height: 40px;
          text-align: center;
          line-height: 40px;
        }
      }

      input {
        width: calc(80% - 40px);
        @include font_size($font_medium);
        height: 60px;
        border: none;
        outline: none;
        background: transparent;
        color: #000000;
      }
    }

    .search-result {
      position: fixed;
      top: 264px;
      left: 0;
      right: 0;
      bottom: 0;
      overflow: hidden;
      @include bg_sub_color();

      ul {
        margin-top: 10px;
        list-style: none;

        li {
          border-bottom: 1px solid #cccccc;
          padding: 10px 0;
          @include font-color();

          .result-item {
            @include font_size($font_medium);
            display: flex;
            justify-content: flex-start;
            align-items: center;

            .result-btn {
              margin: 10px 20px 10px 40px;
              @include font_size($font_large);
            }

            .item-pic {
              margin: 0 20px 0 30px;
              display: inline-block;
              width: 60px;
              height: 60px;
              border-radius: 25%;
              border: 3px solid #FFFFFF;
              overflow: hidden;

              img {
                width: 100%;
                height: 100%;
              }
            }

            .result {
              @include no-wrap();
            }
          }
        }
      }
    }

    .search-hot {
      margin: 0 40px auto;

      h3 {
        margin: 20px 0;
        @include font_size($font_large);
        @include font-color();
      }

      ul {
        display: flex;
        justify-content: flex-start;
        flex-wrap: wrap;

        li {
          margin: 5px 10px;
          height: 50px;
          border-radius: 25px;
          overflow: hidden;
          padding: 0px 20px;
          @include font_size($font_medium_s);
          @include font-color();
          line-height: 50px;
          border: 1px solid #000;
        }
      }
    }

    .search-history {
      margin-top: 20px;

      li {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        border: 1px solid #cccccc;
        @include font-color();

        span {
          padding: 10px 20px 10px 20px;
          display: inline-block;
          width: 60px;
          height: 60px;
          font-size: 40px;
          line-height: 60px;
          text-align: center;

          &.delHistory {

          }
        }

        p {
          @include font_size($font_medium);
          width: calc(100% - 200px);
          @include no-wrap();
        }
      }
    }
  }

}
</style>
