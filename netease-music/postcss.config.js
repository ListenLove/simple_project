module.exports = {
  plugins: {
    // 'postcss-import': {},
    // 'postcss-url': {},
    // to edit target browsers: use "browserslist" field in package.json
    autoprefixer: {
      grid: 'autoplace'
    },
    'postcss-pxtorem': { // 移动端适配 将100px 自动转换为 1rem
      rootValue: 100, // 根元素字体大小
      propList: ['*']
    }
  }
}
