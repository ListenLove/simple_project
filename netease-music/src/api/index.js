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
// 获取歌手详情和歌曲列表
export const getSingerDetailAndSongs = (data) => {
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
// 获取指定 id 榜单的详细内容
// export const getRankDetail = (data) => Network.get('/toplist/detail', data)
// 获取所有榜单内容摘要
export const getAllRankBrief = () => {
  // eslint-disable-next-line no-unused-vars
  const category = {
    officialList: [
      {
        name: '飙升榜',
        id: 3
      },
      {
        name: '新歌榜',
        id: 0
      },
      {
        name: '原创榜',
        id: 2
      },
      {
        name: '热歌榜',
        id: 1
      }
    ],
    recList: [
      {
        name: '云音乐说唱榜',
        id: 23
      },
      {
        name: '云音乐电音榜',
        id: 25
      },
      {
        name: '抖音排行榜',
        id: 26
      },
      {
        name: '云音乐ACG榜',
        id: 22
      },
      {
        name: '云音乐古典榜',
        id: 24
      }
    ],
    globalList: [
      {
        name: '美国Billboard榜',
        id: 6
      },
      {
        name: 'UK排行榜周榜',
        id: 5
      },
      {
        name: 'Beatport全球电子舞曲榜',
        id: 21
      },
      {
        name: '日本Oricon榜',
        id: 10
      },
      {
        name: 'iTunes榜',
        id: 8
      }/*,
      {
        name: '英国Q杂志中文版周榜',
        id: 29
      } */
    ],
    otherList: [
      {
        name: 'KTV唛榜',
        id: 7
      },
      {
        name: '法国 NRJ Vos Hits 周榜',
        id: 19
      },
      {
        name: '云音乐欧美新歌榜',
        id: 27
      },
      {
        name: '云音乐韩语榜',
        id: 28
      },
      // { name: '电竞音乐榜', id: 30 },
      {
        name: '云音乐欧美热歌榜',
        id: 31
      }
    ],
    titles: {
      officialList: '官方榜',
      recList: '推荐榜',
      globalList: '全球榜',
      otherList: '更多榜单'
    }
  }
  return new Promise((resolve, reject) => {
    Network.get('/toplist/detail')
      .then(value => {
        // 获取选定的 *排行榜* 及其 *id*
        for (let i = 0; i < value.list.length; i++) {
          for (const li in category) {
            let flag = false
            const list = category[li]
            for (let j = 0; j < list.length; j++) {
              if (list[j].name === value.list[i].name) {
                category[li][j].id = value.list[i].id
                category[li][j].rank = value.list[i]
                flag = true
                break
              }
            }
            if (flag) {
              break
            }
          }
        }
        resolve(category)
      })
      .catch(reason => {
        reject(reason)
      })
  })
}

export const getSearchSuggest = (data) => Network.get('/cloudsearch', data)
export const getSearchHot = () => Network.get('/search/hot')
