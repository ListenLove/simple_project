/*
* 页面播放器, 封装类 Player
* */

(function (window) {
        function Player($audio) {
            return Player.prototype.init($audio);
        }

        Player.prototype = {
            constructor: Player,
            songs_list: [],
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
            },
            preIndex: function () {
                let index = this.currentSongIndex;
                index--;
                if (index < 0) {
                    index = this.songs_list.length - 1;
                }
                return index;
            },
            nextIndex: function () {
                let index = this.currentSongIndex;
                index++;
                if (index >= this.songs_list.length) {
                    index %= this.songs_list.length;
                }
                return index;
            },
            delSong: function (index) {
                /*
                * 删除序号为index歌曲后
                * */
                this.songs_list.splice(index, 1);

                // 超级BUG修正
                // **要调整currentSongIndex**
                if (index <= this.currentSongIndex) {
                    this.currentSongIndex--;
                }
            },
            timeStr: function (currentTime, duration) {
                let currentTimeMin = parseInt(currentTime / 60);
                let currentTimeSec = parseInt(currentTime % 60);
                let durationTimeMin = parseInt(duration / 60);
                let durationTimeSec = parseInt(duration % 60);
                // currentTimeMin = isNaN(currentTimeMin) ? 0 : currentTimeMin;
                // currentTimeSec = isNaN(currentTimeSec) ? 0 : currentTimeSec;
                // durationTimeMin = isNaN(durationTimeMin) ? 0 : durationTimeMin;
                // durationTimeSec = isNaN(durationTimeSec) ? 0 : durationTimeSec;
                if (currentTimeMin < 10) {
                    currentTimeMin = "0" + currentTimeMin;
                }
                if (currentTimeSec < 10) {
                    currentTimeSec = "0" + currentTimeSec;
                }
                if (durationTimeMin < 10) {
                    durationTimeMin = "0" + durationTimeMin;
                }
                if (durationTimeSec < 10) {
                    durationTimeSec = "0" + durationTimeSec;
                }
                return currentTimeMin + ":" + currentTimeSec + " / " + durationTimeMin + ":" + durationTimeSec
            },
            updateSongTime: function (callback) {
                let $this = this;
                this.$audio.on("timeupdate", function () {
                    let currentTime = $this.audio.currentTime;
                    let duration = $this.audio.duration;
                    let timeStr = $this.timeStr(currentTime, duration)
                    callback(currentTime, duration, timeStr);
                });
            },
            setSongCurrentTime: function (value) {
                if (value < 0 || value > 100) return;
                this.audio.currentTime = value * this.audio.duration;
            },
            setVolumeValue: function (value) {
                if (value < 0 || value > 100) return;
                this.audio.volume = value;
            },
        }

        Player.prototype.init.prototype = Player.prototype;
        window.Player = Player;
    }
)(window);