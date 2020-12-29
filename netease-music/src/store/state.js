import { modeType } from '@/store/modeType'

export default {
  isFullScreen: true,
  isPlayerNormalShow: false,
  isMiniPlayerShow: false,
  isShowPlayerList: false,
  isPlaying: false,
  playMode: modeType.loop,
  songs: [],
  currentSong: {},
  currentIndex: 0,
  songLyric: {},
  currentTime: 0
}
