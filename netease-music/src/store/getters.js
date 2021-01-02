export default {
  FullScreen (state) {
    return state.isFullScreen
  },
  NormalPlayerShow (state) {
    return state.isPlayerNormalShow
  },
  MiniPlayerShow (state) {
    return state.isMiniPlayerShow
  },
  PlayerIsPlaying (state) {
    return state.isPlaying
  },
  PlayMode (state) {
    return state.playMode
  },
  PlayerListIsShow (state) {
    return state.isShowPlayerList
  },
  Songs (state) {
    return state.songs
  },
  currentSong (state) {
    if (state.songs.length === 0) {
      return {
        name: '',
        singer: '',
        picUrl: null,
        url: '',
        id: null
      }
    }
    return state.songs[state.currentIndex]
  },
  currentLyric (state) {
    return state.songLyric
  },
  currentIndex (state) {
    return state.currentIndex
  },
  currentTime (state) {
    return state.currentTime
  },
  favoriteList (state) {
    return state.favoriteList
  },
  historyList (state) {
    return state.historyList
  }
}
