/*
* 页面进度条, 封装类 Progress
* */

(function (window) {
    function Progress($progressBack, $progressFor, $progressDot) {
        return Progress.prototype.init($progressBack, $progressFor, $progressDot);
    }

    Progress.prototype = {
        constructor: Progress,
        init: function ($progressBack, $progressFor, $progressDot) {
            this.$progressBack = $progressBack;
            this.$progressFor = $progressFor;
            this.$progressDot = $progressDot;
        },
        progressClick: function () {
            let $this = this;
            this.$progressBack.on("click", function (event) {
                // 找到背景距离窗口左边的距离
                let $backLeft = $(this).offset().left;
                // 找到鼠标点击时距离窗口左边的距离
                let $clickLeft = event.pageX;
                $this.$progressFor.css("width", $clickLeft - $backLeft);
            });
        },
        progressMove: function () {
            // 1. 监听鼠标按下事件
            let $this = this;
            this.$progressBack.mousedown(function () {
                let $backLeft = $(this).offset().left;
                $(document).mousemove(function (event) {
                    // 找到背景距离窗口左边的距离
                    // 找到鼠标点击时距离窗口左边的距离
                    let $clickLeft = event.pageX;
                    let $result = $clickLeft - $backLeft;
                    /*减8，是因为进度圆点的半径是4*/
                    $result = Math.min($result, $this.$progressBack.width()-8);
                    $this.$progressFor.css("width", $result);
                });
                $(document).mouseup(function () {
                    $(document).off("mousemove");
                })
            })
            // 2. 监听鼠标移动事件

            // 3. 监听鼠标抬起事件
        }
    }
    Progress.prototype.init.prototype = Progress.prototype;
    window.Progress = Progress;
})(window);