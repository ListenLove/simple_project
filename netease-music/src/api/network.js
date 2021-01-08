import axios from 'axios'
import Vue from 'vue'
// 简单封装 axios
axios.defaults.baseURL = 'http://192.168.3.9:3000'

// axios.defaults.baseURL = 'http://192.168.1.2:3000'
// Add a request interceptor
// 部分设置发送 all中所有请求， 每一次请求时加一，返回多少响应对应的减一
let count = 0
axios.interceptors.request.use(function (config) {
  // Do something before request is sent
  count++
  Vue.showLoading()
  return config
}, function (error) {
  // Do something with request error
  Vue.hiddenLoading()
  return Promise.reject(error)
})

// Add a response interceptor
axios.interceptors.response.use(function (response) {
  // Any status code that lie within the range of 2xx cause this function to trigger
  // Do something with response data
  count--
  if (count === 0) {
    Vue.hiddenLoading()
  }
  return response
}, function (error) {
  // Any status codes that falls outside the range of 2xx cause this function to trigger
  // Do something with response error
  Vue.hiddenLoading()
  return Promise.reject(error)
})
axios.defaults.timeout = 5000

function get (path, data) {
  return new Promise((resolve, reject) => {
    axios.get(path, {
      params: data
    })
      .then(value => {
        resolve(value.data)
      })
      .catch(reason => {
        reject(reason)
      })
  })
}

function post (path, data) {
  return new Promise((resolve, reject) => {
    axios.post(path, data)
      .then(value => {
        resolve(value.data)
      })
      .catch(reason => {
        reject(reason)
      })
  })
}

function all (...requestList) {
  return new Promise((resolve, reject) => {
    Promise.all(...requestList)
      .then(values => {
        resolve(values)
      })
      .catch(err => {
        reject(err)
      })
  })
}

export default {
  get,
  post,
  all
}
