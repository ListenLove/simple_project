// 统一接口地址管理文件，对 api 接口进行统一封装
// eslint-disable-next-line no-unused-vars
import Network from './network'

export const getRecommendBanner = () => Network.get('/banner?type=2')
export const getPersonalized = () => Network.get('/personalized?limit=6')

export const getNewAlbum = () => Network.get('/album/newest')

export const getNewSongList = () => Network.get('/personalized/newsong')

export const getPlayListDetail = (data) => Network.get('/playlist/detail', data) // get 方法才能使用 query
export const getAlbumListDetail = (data) => Network.get('/album', data) // 获取专辑列表

export const getSongDetail = (data) => Network.get('/song/detail', data)
export const getSongLyric = (data) => {
  if (Object.keys(data).length === 0) return
  return Network.get('/lyric', data)
}
export const getSongURL = (data) => Network.get('/song/url', data)
