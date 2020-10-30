$(function () {

    // 鼠标悬浮在列表歌曲上时出现功能按钮
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
        $(this).parents(".content_list li").find("div").toggleClass("list_checked");

    })

    // 自定义滚动条样式...用不了
    // $(".content_list").mCustomScrollbar(
    //     {
    //         theme: "minimal-dark",
    //     }
    // );
    /*加载位于本地source目录中的歌曲*/
    function loadPlayerList() {
        $.ajax(
            {
                url: "./source/musiclist.json",
                dataType: "json",
                success: function (data) {
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

    // 创建歌曲列表中每一首歌的条目（li）
    function createSongLi(index, song) {
        return $("<li class=\"song_list_item\">\n" +
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
            "                        <div class=\"list_duration\"><a href=\"javascript:;\" title=\"删除\" class=\"fa fa-trash-o\"></a><span>" + song.time + "</span>\n" +
            "                        </div>\n" +
            "                    </li>");
    }

    loadPlayerList();
    // 点击歌曲条目上的按钮执行相关功能
    $content_list.delegate(".list_menu>.list_menu_play>i", "click", function () {
        if ($(this).hasClass("fa-pause-circle")) {
            // 切换至暂停状态
            $(".play").removeClass("fa-pause");
            $(this).parents(".content_list li").find("div").removeClass("play_mode");
        } else {
            // 切换至播放状态
            $(".play").addClass("fa-pause");
            $(this).parents(".content_list li").find("div").addClass("play_mode");
            $(this).parents(".content_list li").siblings().find("div").removeClass("play_mode");
        }
        $(this).toggleClass("fa-pause-circle");
        $(this).parents(".song_list_item").siblings().find('.list_menu_play>i').removeClass("fa-pause-circle");
    });
})
