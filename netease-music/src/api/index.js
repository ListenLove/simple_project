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
export const getArtistDetail = (data) => Network.get('/artist/detail', data)
export const getArtistTopSongs = (data) => Network.get('/artist/top/song', data)
export const getSongLyric = (data) => {
  if (Object.keys(data).length === 0) return
  return Network.get('/lyric', data)
}
export const getSongURL = (data) => Network.get('/song/url', data)

export const top10HotSingers = () => {
  return new Promise((resolve, reject) => {
    Network.get('/top/artists?offset=0&limit=10')
      .then(value => {
        resolve(value.artists)
      })
      .catch(reason => {
        reject(reason)
      })
  })
}

export const getSingersSortedByLetter = (letter) => {
  return new Promise((resolve, reject) => {
    Network.all([
      Network.get(`/artist/list?type=1&area=7&limit=10&initial=${letter}`), // 华语男歌手
      Network.get(`/artist/list?type=2&area=7&limit=10&initial=${letter}`), // 华语女歌手
      Network.get(`/artist/list?type=3&area=7&limit=10&initial=${letter}`) // 华语乐队
    ])
      .then(values => {
        const result = values.map(value => {
          return value.artists
        })
        resolve([].concat.apply([], result))
      })
      .catch(reason => {
        reject(reason)
      })
  })
}
export const getAllSinger = () => {
  return new Promise((resolve, reject) => {
    const keys = ['热']
    const list = [top10HotSingers()]
    for (let i = 65; i < 91; i++) {
      const char = String.fromCharCode(i)
      keys.push(char)
      list.push(getSingersSortedByLetter(char))
    }
    Network.all(list)
      .then(values => {
        const obj = {
          keys: keys,
          list: values
        }
        resolve(obj)
      })
      .catch(reason => {
        reject(reason)
      })
  })
}
export const getSingerDetailAndDetail = (data) => {
  return new Promise((resolve, reject) => {
    const list = [getArtistDetail(data), getArtistTopSongs(data)]
    Network.all(list)
      .then(values => {
        const obj = {
          artist: values[0].data.artist,
          songs: values[1].songs
        }
        resolve(obj)
      })
      .catch(reason => {
        reject(reason)
      })
  })
}
