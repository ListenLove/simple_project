import { CHANGE_FULL_SCREEN, CHANGE_PLAYER_NORMAL_SHOW, CHANGE_MINI_PLAYER_SHOW } from '@/store/mutations-type'

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
  },
  [CHANGE_MINI_PLAYER_SHOW] (state, flag) {
    state.isMiniPlayerShow = flag
  }
}
