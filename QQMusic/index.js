$(function () {

    // 鼠标悬浮在列表歌曲上时出现功能按钮
    $(".content_list li").hover(function () {
        // 显示在每条目歌曲上的点击按钮
        $(this).find(".list_menu").stop().fadeIn(100);
        // 将歌曲时长信息替换为 `删除` 图标
        $(this).find(".list_duration span").stop().hide();
        $(this).find(".list_duration a").stop().fadeIn(100);
    }, function () {
        // 隐藏歌曲条目上的点击按钮
        $(this).find(".list_menu").stop().fadeOut(100);
        // 将删除图标替换回歌曲时长
        $(this).find(".list_duration a").stop().hide();
        $(this).find(".list_duration span").stop().fadeIn(100);
    });

    // 模拟复选框对歌曲条目进行选择
    $(".list_check>i").click(function () {
        $(this).toggleClass("fa-check");
    });
    // 自定义滚动条样式...用不了
    // $(".content_list").mCustomScrollbar(
    //     {
    //         theme: "minimal-dark",
    //     }
    // );
})
