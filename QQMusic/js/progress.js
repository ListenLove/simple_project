/*
* 页面进度条, 封装类 Progress
* */

(function (window) {
    function Progress($progressBack, $progressFor, $progressDot) {
        return new Progress.prototype.init($progressBack, $progressFor, $progressDot);
    }

    Progress.prototype = {
        constructor: Progress,
        init: function ($progressBack, $progressFor, $progressDot) {
            this.$progressBack = $progressBack;
            this.$progressFor = $progressFor;
            this.$progressDot = $progressDot;
        },
        isMove: false,  /*默认进度条没有在被拖动*/
        progressClick: function (callback) {
            let $this = this;
            this.$progressBack.on("click", function (event) {
                // 找到背景距离窗口左边的距离
                let $backLeft = $(this).offset().left;
                // 找到鼠标点击时距离窗口左边的距离
                let $clickLeft = event.pageX;
                /*减8，是因为进度圆点的半径是4*/
                let $result = $clickLeft - $backLeft;
                $result = Math.min($result, $this.$progressBack.width());
                $this.$progressFor.css("width", $result);
                let value = ($result / $(this).width());
                callback(value);
            });
        },
        progressMove: function (callback) {
            // 1. 监听鼠标按下事件
            let $this = this;
            let $backLeft = $this.$progressBack.offset().left;
            let $barWidth = $this.$progressBack.width();
            this.$progressBack.mousedown(function () {
                let $result;
                let $clickLeft;
                $this.isMove = true;    /*让进度条随歌曲播放而增长的动画禁用*/
                // 2. 监听鼠标移动事件
                $(document).mousemove(function (event) {
                    // 找到背景距离窗口左边的距离
                    // 找到鼠标点击时距离窗口左边的距离
                    $clickLeft = event.pageX;
                    $result = $clickLeft - $backLeft;
                    /*减8，是因为进度圆点的半径是4*/
                    if ($result >= 0 && $result <= $barWidth) {
                        $this.$progressFor.css("width", $result);
                    }
                });
                // 3. 监听鼠标抬起事件
                $(document).mouseup(function () {
                    $(document).off("mousemove");
                    $this.isMove = false;
                    let value = (($clickLeft - $backLeft) / $barWidth);
                    console.log(value);
                    callback(value);
                    // console.log(value);
                })
            })
        },
        setProgress: function (value) {
            if (value < 0 || value > 100 || this.isMove) {
                return;
            }
            this.$progressFor.css({
                width: value + "%",
            })
        }
    }
    Progress.prototype.init.prototype = Progress.prototype;
    window.Progress = Progress;
})(window);