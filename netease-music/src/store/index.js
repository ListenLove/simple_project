import Vue from 'vue'
import Vuex from 'vuex'
import state from '@/store/state'
import mutations from '@/store/mutations'
import actions from '@/store/actions'
import getters from '@/store/getters'

Vue.use(Vuex)

export default new Vuex.Store({
  // 保存全局数据
  state: state,
  // 修改修改全局变量 state 中的数据的方法
  mutations: mutations,
  // 触发 mutations 中的方法对变量进行修改
  actions: actions,
  modules: {
  },
  getters: getters
})
