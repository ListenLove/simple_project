import axios from 'axios'
// 简单封装 axios
axios.defaults.baseURL = 'http://localhost:3000'
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

export default { get, post }
