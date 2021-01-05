<template>
  <div class="singer">
    <scroll-view ref="scroll">
      <ul class="singers-wrapper">
        <li class="singer-letter" v-for="(value, index) in keys" :key="index" ref="group">
          <h2>{{ value }}</h2>
          <ul class="singer-item">
            <li v-for="(value, i) in result[index]" :key="i" @click.stop="selectSingerDetail(value.id, 'singer')">
              <img v-lazy="value.picUrl" alt="">
              <p>{{ value.name }}</p>
            </li>
          </ul>
        </li>
      </ul>
    </scroll-view>
    <ul class="singer-keys">
      <li v-for="(key, i) in keys" :key="key"
          :class="{'active': currentIndex === i}"
          @touchstart.stop.prevent="touchstart($event, i)"
          @touchmove.stop.prevent="touchmove($event, i)"
      >
        <a :href="'#'+key"
        >{{ key }}</a>
      </li>
    </ul>
    <h2 class="fix-title" v-show="fix_title() !== ''" ref="fixTitle">{{ fix_title() }}</h2>
    <router-view></router-view>
  </div>
</template>

<script>
import { getAllSinger } from '@/api'
import ScrollView from '@/components/ScrollView'
import 'animate.css/animate.min.css'

export default {
  name: 'Singer',
  components: { ScrollView },
  methods: {
    _keyDown (index) {
      this.$refs.scroll.scrollTo(0, -this.groupTop[index])
      this.currentIndex = index
    },
    touchstart (e, index) {
      this._keyDown(index)
      this.offsetY = e.touches[0].pageY
    },
    touchmove (e, index) {
      this.moveY = e.touches[0].pageY
      let newIndex = Math.round((this.moveY - this.offsetY) / e.target.offsetHeight) + parseInt(index)
      console.log(newIndex)
      if (newIndex < 0) {
        newIndex = 0
      } else if (newIndex >= this.keys.length) {
        newIndex = this.keys.length - 1
      }
      this._keyDown(newIndex)
    },
    fix_title () {
      if (this.scrollY >= 0) {
        return ''
      }
      return this.keys[this.currentIndex]
    },
    selectSingerDetail (id, typed) {
      // console.log(id)
      this.$router.push({
        path: '/singers/detail',
        query: {
          id: id, // 查询 id 参数
          typed: typed
        }
      })
    }
  },
  data () {
    return {
      result: [],
      keys: [],
      groupTop: [],
      currentIndex: 0,
      offsetY: 0,
      moveY: 0,
      scrollY: 0,
      fixTitleOffsetHeight: 0
    }
  },
  watch: {
    keys () {
      this.$nextTick(() => {
        const group = this.$refs.group
        group.forEach(g => {
          this.groupTop.push(g.offsetTop)
        })
      })
    }
  },
  created () {
    getAllSinger()
      .then(value => {
        this.result = value.list
        this.keys = value.keys
      })
      .catch(reason => {
        console.log(reason)
      })
  },
  mounted () {
    // 拿到吸顶标题渲染时的高度
    const observer = new MutationObserver(() => {
      this.fixTitleOffsetHeight = this.$refs.fixTitle.offsetHeight
      observer.disconnect() // 执行一次即可
    })
    observer.observe(this.$refs.fixTitle, {
      attributes: ['display']
    })
    this.$refs.scroll.scrolling((y) => {
      this.scrollY = y
      if (y >= 0) {
        this.currentIndex = 0
        return
      }
      for (let i = 0; i < this.groupTop.length - 1; i++) {
        const prevStage = this.groupTop[i]
        const nextStage = this.groupTop[i + 1]
        // 分组标题吸顶碰到下一个标题时的推出效果实现
        // 两个标题碰到时
        let fixTitleMoveY = 0
        if (-y >= nextStage - this.fixTitleOffsetHeight && -y <= nextStage) {
          // 吸顶标题向上移动的距离
          fixTitleMoveY = -y + this.fixTitleOffsetHeight - nextStage
        } else {
          fixTitleMoveY = 0
        }
        this.$refs.fixTitle.style.transform = `translateY(${-fixTitleMoveY}px)`

        if (-y < nextStage && -y > prevStage) {
          this.currentIndex = i
          return
        }
      }
      this.currentIndex = this.groupTop.length - 1
    })
  }
}
</script>

<style scoped lang="scss">
@import "src/assets/css/variable";
@import "src/assets/css/mixin";

.singer {
  position: fixed;
  overflow: hidden;
  top: 184px;
  bottom: 0;
  width: 100%;

  .singers-wrapper {
    @include font_size($font_medium_s);
    @include bg_color();
    color: #FFFFFF;

    .singer-letter {
      h2 {
        margin-left: 24px;
        height: 60px;
        line-height: 60px;
        @include font_size($font_large);
      }

      border: 1px solid #aaaaaa;

      .singer-item {
        border: 1px solid #000000;

        li {
          height: 100px;
          display: flex;
          justify-content: flex-start;
          align-items: center;
          @include bg_sub_color();
          @include font-color();
          border: 1px solid #cccccc;

          img {
            padding-left: 20px;
            width: 84px;
            height: 84px;
            border-radius: 50%;
            overflow: hidden;
          }

          p {
            @include font_size($font_medium_s);
            padding-left: 20px;
          }
        }
      }
    }
  }

  .singer-keys {
    position: fixed;
    display: flex;
    flex-direction: column;
    right: 0;
    top: 50%;
    padding: 5px;
    transform: translateY(-40%);

    li {
      text-align: center;
      @include font_size($font_medium_s);
      display: inline-block;
      list-style: none;

      &.active {
        animation: flickr 2s infinite ease-in-out alternate;
        animation-play-state: running;
      }

      a {
        text-decoration: none;
        @include font-color();
        opacity: 0.6;
        padding: 5px;
      }
    }
  }

  .fix-title {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 60px;
    color: #FFFFFF;
    box-sizing: border-box;
    @include font_size($font_large);
    @include bg_color();
    padding: 10px 26px;
  }
}

@keyframes flickr {
  from {
    opacity: 1;
  }
  50% {
    text-shadow: 0 0 5px #fff, 0 0 10px #87a0f1, 0 0 15px #92B4F4, 0 0 20px #0022ff, 0 0 25px #4472CA;
  }
  to {
    text-shadow: 0 0 5px #fff, 0 0 10px #d99bf8, 0 0 15px #f080ca, 0 0 20px #f01450, 0 0 25px #4cc3d9;
  }
}

</style>
