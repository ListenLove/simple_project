import {
  CHANGE_FULL_SCREEN,
  CHANGE_PLAYER_NORMAL_SHOW,
  CHANGE_MINI_PLAYER_SHOW,
  CHANGE_PLAYING,
  MODE_TYPE,
  CHANGE_PLAYER_LIST_SHOW,
  SET_SONG_DETAIL,
  SET_CURRENT_LYRIC,
  DEL_SONG_FROM_SONG_LIST,
  SET_CURRENT_INDEX
} from '@/store/mutations-type'
import { getSongDetail, getSongLyric, getSongURL } from '@/api'
import { lyricParser } from '@/store/modeType'

export default {
  /**
   * 是否打开全屏播放器方法
   * @param 默认参数
   * @param flag 将打开全屏播放器设置为 flag 布尔值
   */
  setFullScreen ({ commit }, flag) {
    commit(CHANGE_FULL_SCREEN, flag)
  },
  setPlayerNormal ({ commit }, flag) {
    commit(CHANGE_PLAYER_NORMAL_SHOW, flag)
  },
  setMiniPlayer ({ commit }, flag) {
    commit(CHANGE_MINI_PLAYER_SHOW, flag)
  },
  setPlayerListShow ({ commit }, flag) {
    commit(CHANGE_PLAYER_LIST_SHOW, flag)
  },
  setIsPlaying ({ commit }, flag) {
    commit(CHANGE_PLAYING, flag)
  },
  setModeType ({ commit }, flag) {
    commit(MODE_TYPE, flag)
  },
  async setSongDetail ({ commit }, ...ids) {
    const result = await getSongDetail({ ids: ids.join(',') })
    const li = []
    const urls = await getSongURL({ id: ids.join(',') })
    result.songs.forEach(function (value, i) {
      const obj = {}
      obj.name = value.name
      obj.id = value.id
      obj.url = urls.data[i].url
      let singer = ''
      value.ar.forEach(function (artist, index) {
        if (index === 0) {
          singer += artist.name
        } else {
          singer += ' ' + artist.name
        }
      })
      obj.singer = singer
      obj.picUrl = value.al.picUrl
      li.push(obj)
    })
    commit(SET_SONG_DETAIL, li)
  },
  async setSongLyric ({ commit }, id) {
    const result = await getSongLyric({ id: id })
    commit(SET_CURRENT_LYRIC, lyricParser(result.lrc.lyric))
  },
  delSongFromSongList ({ commit }, index) {
    commit(DEL_SONG_FROM_SONG_LIST, index)
  },
  setCurrentIndex ({ commit }, index) {
    commit(SET_CURRENT_INDEX, index)
  }
}
