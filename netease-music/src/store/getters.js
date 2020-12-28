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
  }
}
