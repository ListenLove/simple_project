import {
  CHANGE_FULL_SCREEN,
  CHANGE_PLAYER_NORMAL_SHOW,
  CHANGE_MINI_PLAYER_SHOW,
  CHANGE_PLAYING,
  MODE_TYPE,
  CHANGE_PLAYER_LIST_SHOW,
  SET_SONG_DETAIL,
  SET_CURRENT_SONG,
  SET_CURRENT_LYRIC,
  DEL_SONG_FROM_SONG_LIST,
  SET_CURRENT_INDEX, SET_CURRENT_TIME,
  ADD_TO_FAVORITE_LIST,
  REMOVE_FROM_FAVORITE_LIST,
  SET_FAV_LIST, SET_HISTORY_SONG, SET_HISTORY_LIST
} from '@/store/mutations-type'

export default {
  /**
   * 是否打开全屏播放器方法
   * @param state 共享数据 state
   * @param flag 将打开全屏播放器设置为 flag 布尔值
   */
  [CHANGE_FULL_SCREEN] (state, flag) {
    state.isFullScreen = flag
  },
  [CHANGE_PLAYER_NORMAL_SHOW] (state, flag) {
    state.isPlayerNormalShow = flag
    // 打开全屏播放器，mini 和 歌曲列表不显示
    if (flag) {
      state.isShowPlayerList = false
      state.isMiniPlayerShow = false
    }
  },
  [CHANGE_MINI_PLAYER_SHOW] (state, flag) {
    state.isMiniPlayerShow = flag
    // 打开mini 播放器，歌曲列表和全屏播放器不显示
    if (flag) {
      state.isPlayerNormalShow = false
      state.isShowPlayerList = false
    }
  },
  [CHANGE_PLAYER_LIST_SHOW] (state, flag) {
    state.isShowPlayerList = flag
  },
  [CHANGE_PLAYING] (state, flag) {
    state.isPlaying = flag
  },
  [MODE_TYPE] (state, flag) {
    state.playMode = flag
  },
  [SET_SONG_DETAIL] (state, list) {
    state.songs = list
  },
  [SET_CURRENT_SONG] (state, song) {
    state.currentSong = song
  },
  [SET_CURRENT_LYRIC] (state, lyric) {
    state.songLyric = lyric
  },
  /**
   * 从歌曲列表中删除歌曲
   * @param state
   * @param index 不传参数时删除歌曲列表中的所有歌曲，传递整型时删除对应index的歌曲
   */
  [DEL_SONG_FROM_SONG_LIST] (state, index) {
    if (index === undefined) {
      state.songs = []
    } else {
      state.songs.splice(index, 1)
    }
    // 删除播放队列位于当前播放歌曲之前的歌曲应当使当前播放队列的 index 前进一位
    if (index < state.currentIndex) {
      state.currentIndex--
    }
    if (state.songs.length === 0) {
      state.isShowPlayerList = false
      state.isPlayerNormalShow = false
      state.isMiniPlayerShow = false
    }
  },
  [SET_CURRENT_INDEX] (state, index) {
    if (index < 0) {
      index = state.songs.length - 1
    } else if (index >= state.songs.length - 1) {
      index = 0
    }
    state.currentIndex = index
  },
  [SET_CURRENT_TIME] (state, curTime) {
    state.currentTime = curTime
  },
  [SET_CURRENT_TIME] (state, curTime) {
    state.currentTime = curTime
  },
  [SET_CURRENT_TIME] (state, curTime) {
    state.currentTime = curTime
  },
  [SET_CURRENT_TIME] (state, curTime) {
    state.currentTime = curTime
  },
  [SET_CURRENT_TIME] (state, curTime) {
    state.currentTime = curTime
  },
  [SET_CURRENT_TIME] (state, curTime) {
    state.currentTime = curTime
  },
  [SET_CURRENT_TIME] (state, curTime) {
    state.currentTime = curTime
  },
  [SET_CURRENT_TIME] (state, curTime) {
    state.currentTime = curTime
  },
  [SET_CURRENT_TIME] (state, curTime) {
    state.currentTime = curTime
  },
  [ADD_TO_FAVORITE_LIST] (state, song) {
    state.favoriteList.push(song)
  },
  [REMOVE_FROM_FAVORITE_LIST] (state, song) {
    const index = state.favoriteList.findIndex(value => song === value)
    state.favoriteList.splice(index, 1)
  },
  [SET_FAV_LIST] (state, list) {
    state.favoriteList = list
  },
  [SET_HISTORY_SONG] (state, song) {
    const result = state.historyList.findIndex((value) => {
      return value.id === song.id
    })
    if (result === -1) {
      if (state.historyList.length >= 30) state.historyList.shift()
      state.historyList.push(song)
    } else {
      state.historyList.splice(result, 1)
      state.historyList.push(song)
    }
  },
  [SET_HISTORY_LIST] (state, list) {
    state.historyList = list
  }
}
