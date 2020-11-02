$(function () {

    // 0. 鼠标悬浮在列表歌曲上时出现功能按钮
    let $content_list;
    $content_list = $(".content_list");
    $content_list.delegate(".song_list_item", "mouseenter", function () {
        // 显示在每条目歌曲上的点击按钮
        $(this).find(".list_menu").stop().fadeIn(100);
        // 将歌曲时长信息替换为 `删除` 图标
        $(this).find(".list_duration span").stop().hide();
        $(this).find(".list_duration a").stop().fadeIn(100);
    });
    $content_list.delegate(".song_list_item", "mouseleave", function () {
        // 隐藏歌曲条目上的点击按钮
        $(this).find(".list_menu").stop().fadeOut(100);
        // 将删除图标替换回歌曲时长
        $(this).find(".list_duration a").stop().hide();
        $(this).find(".list_duration span").stop().fadeIn(100);
    });

    // 模拟复选框对歌曲条目进行选择
    $content_list.delegate(".list_check>i", "click", function () {
        $(this).toggleClass("fa-check");
        $(this).parents(".content_list li").find("div").toggleClass("highlight_mode");

    })

    /*
    *  1. 播放器配置
    * */
    let $audio = $("audio");
    let player = new Player($audio);

    /* 2. 加载位于本地source目录中的歌曲*/
    loadPlayerList();

    function loadPlayerList() {
        $.ajax(
            {
                url: "./source/musiclist.json",
                dataType: "json",
                success: function (data) {
                    player.songs_list = data;
                    let $songs_list = $(".content_list>ul");
                    $.each(data, function (index, elem) {
                        let $item_li = createSongLi(index, elem);
                        $songs_list.append($item_li);
                    })
                },
                error: function (e) {
                    console.log(e);
                }
            }
        );
    }

    // 3. 点击歌曲条目上的按钮执行相关功能
    $content_list.delegate(".list_menu>.list_menu_play>i", "click", function () {
        let content_list_li = $(this).parents(".content_list li");
        if ($(this).hasClass("fa-pause-circle")) {
            // 切换至暂停状态
            $(".play").removeClass("fa-pause");
            content_list_li.find("div").removeClass("highlight_mode");
            // 暂停时序号位置播放状态图要变回序号
            content_list_li.find(".list_num").removeClass("number_wave");
        } else {
            // 切换至播放状态
            $(".play").addClass("fa-pause");
            content_list_li.find("div").addClass("highlight_mode");
            content_list_li.siblings().find("div").removeClass("highlight_mode");
            // 播放状态时序号要变为播放状态图
            content_list_li.find(".list_num").addClass("number_wave");
            content_list_li.siblings().find(".list_num").removeClass("number_wave");
        }
        $(this).toggleClass("fa-pause-circle");
        $(this).parents(".song_list_item").siblings().find('.list_menu_play>i').removeClass("fa-pause-circle");
        player.playSong(content_list_li.get(0).index, content_list_li.get(0).song);
    });

    // 自定义滚动条样式...用不了
    // $(".content_list").mCustomScrollbar(
    //     {
    //         theme: "minimal-dark",
    //     }
    // );

    // 4. 创建歌曲列表中每一首歌的条目（li）
    function createSongLi(index, song) {
        let $song_item = $("<li class=\"song_list_item\">\n" +
            "                        <div class=\"list_check\"><i class=\"fa\"></i></div>\n" +
            "                        <div class=\"list_num\">" + (index + 1) + "</div>\n" +
            "                        <div class=\"list_name\">" + song.name + "\n" +
            "                            <div class=\"list_menu\">\n" +
            "                                <a href=\"javascript:;\" title=\"播放\" class='list_menu_play'><i class=\"fa fa-play-circle menu_i\"></i></a>\n" +
            "                                <a href=\"javascript:;\" title=\"添加\"><i class=\"fa fa-get-pocket menu_i\"></i></a>\n" +
            "                                <a href=\"javascript:;\" title=\"下载\"><i class=\"fa fa-download menu_i\"></i></a>\n" +
            "                                <a href=\"javascript:;\" title=\"分享\"><i class=\"fa fa-share-alt menu_i\"></i></a>\n" +
            "                            </div>\n" +
            "                        </div>\n" +
            "                        <div class=\"list_singer\">" + song.singer + "</div>\n" +
            "                        <div class=\"list_duration\"><a href=\"javascript:;\" title=\"删除\" class=\"fa fa-trash-o list_menu_del\"></a><span>" + song.time + "</span>\n" +
            "                        </div>\n" +
            "                    </li>");
        $song_item.get(0).index = index;
        $song_item.get(0).song = song;
        return $song_item;
    }

    // 5. 底部音乐播放栏控制
    /*
    * 音乐栏播放按钮事件
    * */
    $(".play").click(function () {
        /*判断有没有播放过音乐*/
        if (player.currentSongIndex === -1) {
            // 没有播放过音乐
            $(".song_list_item").eq(0).find(".list_menu_play>i").trigger("click");
        } else {
            // 已经播放过音乐
            $(".song_list_item").eq(player.currentSongIndex).find(".list_menu_play>i").trigger("click");
        }
    })
    /*
    * 音乐栏上一首歌曲切换
    * */
    $(".song_pre").click(function () {
        $(".song_list_item").eq(player.preIndex()).find(".list_menu_play>i").trigger("click");
    });
    /*
    * 音乐栏下一首歌曲切换
    * */
    $(".song_next").click(function () {
        $(".song_list_item").eq(player.nextIndex()).find(".list_menu_play>i").trigger("click");
    });

    /*
    * 6. 子菜单删除按钮点击事件
    * */
    $content_list.delegate(".list_menu_del", "click", function () {
        let delIndex = $(this).parents(".song_list_item").get(0).index;
        /*
        * 判断一下是否播放的恰好是当前播放的歌曲
        * */
        if (player.currentSongIndex === delIndex) {
            // 是的话，要播放下一首
            $(".song_next").trigger("click");
        }
        // 删除歌曲列表中的歌曲条目
        $(this).parents(".song_list_item").remove();
        // 重新排序一下列表，序号不能混乱
        player.delSong(delIndex);
        $(".song_list_item").each(function (index) {
            $(this).get(0).index = index;
            $(this).find(".list_num").text(index + 1);
        });

    });
})
