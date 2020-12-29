export const modeType = {
  loop: 0,
  one: 1,
  random: 2
}
/**
 * 将服务器获取到的歌词解析撑 事件： 歌词 对象
 * @param lyric
 */
export const lyricParser = function (lyric) {
  // [00:06.58]Nice to meet you
  // eslint-disable-next-line camelcase
  const lyric_pics = lyric.split(/[[|\]]/)
  const result = {}
  // ["", "00:10.206", " Words↵", "00:11.256", " Trust 'em till it burns and hurts↵",]
  let i = 0
  while (i < lyric_pics.length) {
    if (!lyric_pics[i]) {
      i++
    } else {
      const time = timeParse(lyric_pics[i])
      const pa = lyric_pics[i + 1].trim()
      i += 2
      result[time] = pa
    }
  }
  return result
}
const timeParse = function (time) {
  const minSec = time.split(':')
  const min = parseInt(minSec[0])
  const sec = parseInt(minSec[1])
  // 转化为秒
  return min * 60 + sec
}
