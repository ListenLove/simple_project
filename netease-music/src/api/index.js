// 统一接口地址管理文件，对 api 接口进行统一封装
// eslint-disable-next-line no-unused-vars
import Network from './network'

export const getRecommendBanner = () => Network.get('/banner?type=2')
export const getPersonalized = () => Network.get('/personalized?limit=6')

export const getNewAlbum = () => Network.get('/album/newest')

export const getNewSongList = () => Network.get('/personalized/newsong')
