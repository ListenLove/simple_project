;(function ($, window) {
    $.prototype.extend({
        addCookie: function (key, value, expire, path, domain) {
            let index = window.location.pathname.lastIndexOf("/");
            let currentPath = window.location.pathname.slice(0, index);
            path = path || currentPath;
            domain = domain || document.domain;
            if (!expire) {
                document.cookie = key + "=" + "value" + ";path=" + path + ";domain=" + domain + ";";
            } else {
                let date = new Date();
                date.setDate(date.getDate() + expire);
                document.cookie = key + "=" + value + ";expires=" + date.toUTCString() + ";path=" + path + ";domain=" + domain + ";";
            }
        },

        getCookie: function (key) {
            let res = document.cookie.split(";");
            for (let i = 0; i < res.length; i++) {
                let temp = res[i].split("=");
                console.log(temp);
                if (temp[0].trim() === key) {
                    return temp[1];
                }
            }
        },

        deleteCookie: function (key) {
            // 默认情况下，只能删除默认路径下的cookie
            this.addCookie(key, this.getCookie(key), -1);
        }

    })
    ;

})(njQuery, window);