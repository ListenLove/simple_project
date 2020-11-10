/**
 封装音乐播放器歌词功能类
 */
(function (window) {
    function Lyric(path) {
        return new Lyric.prototype.init(path);
    }

    Lyric.prototype = {
        constructor: Lyric,
        init: function (path) {
            this.path = path;
        },
        times: [],
        lyrics: [],
        loadLyrics(callback) {
            let $this = this;
            $.ajax({
                url: $this.path,
                dataType: "text",
                success: function (data) {
                    // console.log(data);
                    $this.parseLyrics(data);
                    // 创建歌词列表
                    callback();
                },
                error: function (e) {
                    alert(e);
                }
            })
        },
        index: -1,
        parseLyrics: function (data) {

            let $this = this;
            this.times = [];
            this.lyrics = [];
            this.index = -1;
            let array = data.split("\n");
            let timeReg = /\[(\d*:\d*\.\d*)]/
            // console.log(timeReg);
            // 遍历取出每一行歌词
            $.each(array, function (index, ele) {
                // 处理歌词
                let lrc = ele.split("]")[1];
                if (lrc.length === 1) return true;
                $this.lyrics.push(lrc);
                let res = timeReg.exec(ele);
                if (res === null) return true;
                let timeStr = res[1];
                let res2 = timeStr.split(":");
                let min = parseInt(res2[0]);
                let second = parseFloat(res2[1]);
                let time = parseFloat(Number(min * 60 + second).toFixed(2));
                $this.times.push(time);
            });
        },
        currentIndex: function (currentTime) {
            // console.log(currentTime);
            if (currentTime >= this.times[0]) {
                this.times.shift();
                this.index++;
            }
            return this.index;
        }

    }
    Lyric.prototype.init.prototype = Lyric.prototype;
    window.Lyric = Lyric;
})(window);