import Vue from 'vue'
import VueRouter from 'vue-router'
// 以下无论使用与否都会统一加载，性能不佳
// import Recommend from '../views/Recommend'
// import Singer from '../views/Singer'
// import Rank from '../views/Rank'
// import Search from '../views/Search'
// 按需加载的写法
const Recommend = (resolve) => {
  import('../views/Recommend').then(module => {
    resolve(module)
  })
}
const Singer = (resolve) => {
  import('../views/Singer').then(module => {
    resolve(module)
  })
}
const Rank = (resolve) => {
  import('../views/Rank').then(module => {
    resolve(module)
  })
}
const Search = (resolve) => {
  import('../views/Search').then(module => {
    resolve(module)
  })
}

Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: '/recommend' },
  { path: '/recommend', component: Recommend },
  { path: '/singers', component: Singer },
  { path: '/rank', component: Rank },
  { path: '/search', component: Search }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
