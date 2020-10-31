/*
* 页面播放器, 封装类 Player
* */

(function (window) {
    function Player($audio) {
        return Player.prototype.init($audio);
    }

    Player.prototype = {
        constructor: Player,
        songs_data: [],
        init: function ($audio) {
            this.$audio = $audio;
            this.audio = $audio.get(0);     /*获取原生JS DOM对象*/
        },
        currentSongIndex: -1,
        playSong: function (index, song) {
            // 判断是否为同一首歌
            if (index === this.currentSongIndex) {
                // 判断是否为暂停状态,若不是暂停，那么就切换为暂停；若是，则开始播放
                if (!this.audio.paused) {
                    this.audio.pause();
                } else {
                    this.audio.play();
                }
            } else {
                this.$audio.attr("src", song.link_url);
                this.audio.play();
                this.currentSongIndex = index;
            }
        }
    }
    Player.prototype.init.prototype = Player.prototype;
    window.Player = Player;
})(window);