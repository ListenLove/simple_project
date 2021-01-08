import Loading from '@/plugins/loading/loading'

export default {
  install: function (Vue, Options) {
    // Vue.component(loading.name, 'Loading')
    // 1.根据我们的组件生成一个构造函数
    const LoadingConstructor = Vue.extend(Loading)
    // 2.根据构造函数创建实例对象
    const loadingInstance = new LoadingConstructor()
    // 3.随便创建一个标签(元素)
    const oDiv = document.createElement('div')
    // 4.将创建好的标签添加到界面上
    document.body.appendChild(oDiv)
    // 5.将创建好的实例对象挂载到创建好的元素上
    loadingInstance.$mount(oDiv)

    // console.log(Options)
    // console.log(LoadingInstance.title)
    // 添加初始化值
    /* if (Options && Options.title !== null && Options.title !== undefined) {
      loadingInstance.title = Options.title
    } */
    // 添加全局方法
    Vue.showLoading = function () {
      loadingInstance.isShow = true
    }
    Vue.hiddenLoading = function () {
      loadingInstance.isShow = false
    }
    // 添加实例方法，注意实例方法名必须以美元符 $ 开头
    Vue.prototype.$showLoading = function () {
      loadingInstance.isShow = true
    }
    Vue.prototype.$hiddenLoading = function () {
      loadingInstance.isShow = false
    }
  }
}
