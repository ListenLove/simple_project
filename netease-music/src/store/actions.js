import {
  CHANGE_FULL_SCREEN,
  CHANGE_PLAYER_NORMAL_SHOW,
  CHANGE_MINI_PLAYER_SHOW,
  CHANGE_PLAYING,
  MODE_TYPE,
  CHANGE_PLAYER_LIST_SHOW
} from '@/store/mutations-type'

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
  }
}
