$(function(){
    $('.header .back').on('click',function(){
        window.history.go(-1);
    })


    /*//定义route
    var route = {
        '': gameShow,
        '/index': gameShow,
        '/video': videoShow,
        '/pageGame':pageGameShow,
        '/drive':driveShow,
        '/vrGameDetail': vrGameDetail
    }
    var router = Router(route);
    router.init();*/
});

//监听路由事件
function getGameInfo(hash){
    switch (hash){
        case '#vrGame':
            gameShow();
            $('.header_tool p.back').addClass('cur');
            break;
        case '#drive':
            $('.header_tool p.back').addClass('cur');
            driveShow();
            break;
        case '#pageGame':
            $('.header_tool p.back').addClass('cur');
            pageGameShow();
            break;
        case '#video':
            $('.header_tool p.back').addClass('cur');
            videoShow();
            break;
        case '#personalCenter':
            $('.header_tool p.back').addClass('cur');
            personalCenterShow();
            break;
        case '#vrGameDetail':
            $('.header_tool p.back').addClass('cur');
            vrGameDetail();
            break;
        case '#localGameDetail':
            $('.header_tool p.back').addClass('cur');
            localGameDetail();
            break;
        case '#vrGameStoreDetail':
            $('.header_tool p.back').addClass('cur');
            vrGameDetail();
            break;
        case "#videoTypeShow":
            $('.header_tool p.back').addClass('cur');
            videoTypeShow();
            break;
        case '#videoHistoryTypeShow':
            $('.header_tool p.back').addClass('cur');
            videoTypeShow();
            break;
        case "#videoPlay":
            $('.header_tool p.back').addClass('cur');
            videoPlayShow();
            break;
        case "#localVideoPlay":
            $('.header_tool p.back').addClass('cur');
            localVideoPlay();
            break;
        case '#sceneryPlay':
            $('.header_tool p.back').addClass('cur');
            sceneryPlay();
            break;
        default:
            gameShow();
            $('.header_tool p.back').removeClass('cur');
            break;
    }
}
//显示游戏主页
function gameShow(){
    $('.list_con ').show();
    $('.header li.game').addClass('cur').siblings().removeClass('cur');
    //判断左侧类别
    leftListStatus();
    $('.game_list_con').find('li').removeClass('cur');
    //左侧列表显示
    $('.side_list ').show();
    $('.list_container ').show();
    $('.game_list_con').show();
    $('.video_list_con').hide();
    $('.detail_container ').hide();
    $('.local_detail_container').hide();
    $('.video_container').hide();
    $('.personal_center').hide();
    $('.drive_con ').hide();
    $('.add_game').show();
    $('.video_label').hide();
    var title = $('.add_title').find('.game a').attr('data-name');
    window.CppCall('mainframe', 'main_tab_changed', title);
    resizeFn();
    setTimeout(function(){
        resize_store();
    },10);
}
//显示网页游戏
function pageGameShow(){
    $('.list_con ').show();
    $('.header li.pageGame').addClass('cur').siblings().removeClass('cur');
    $('.side_list ').hide();
    $('.list_container').hide();
    $('.detail_container ').hide();
    $('.local_detail_container ').hide();
    $('.video_container  ').hide();
    $('.pageGame_con').show();
    $('.personal_center').hide();
    $('.drive_con ').hide();
}
//显示个人中心
function personalCenterShow(){
    $('.list_con ').show();
    $('.side_list ').hide();
    $('.list_container').hide();
    $('.detail_container ').hide();
    $('.local_detail_container ').hide();
    $('.video_container  ').hide();
    $('.pageGame_con').hide();
    $('.personal_center').show();
    $('.drive_con ').hide();
    //标题的cur取消
    $('.header ul.add_title').find('li').each(function(){
        $(this).removeClass('cur')
    })
}
//显示媒体库首页
function videoShow(){
    $('.side_list ').hide();
    $('.header li.video ').addClass('cur').siblings().removeClass('cur');
    $('.list_container ').hide();
    $('.detail_container ').hide();
    $('.video_list').show();
    $('.video_detail').hide();
    $('.video_history_con').hide();
    $('.video_play').hide();
    $('.local_detail_container').hide();
    $('.video_container').show();
    $('.local_video_play_con').hide();
    $('.personal_center').hide();
    $('.drive_con ').hide();
    $('.iframe_close').hide();
    $('.scenery_play').hide();
    $('.add_game').hide();
    $('.video_label').show();
    $('.no_game').hide();
    $('.video_list_con').find('.in_side_con').eq(0).addClass('cur').siblings().removeClass('cur');
    var title = $('.add_title').find('.video  a').attr('data-name');
    window.CppCall('mainframe', 'main_tab_changed', title);
    resizeFn();
    setTimeout(function(){
        resize_video_list();
    },10);
};
//媒体库分类
function videoTypeShow(){
    $('.list_container ').hide();
    $('.game_list_con').hide();
    $('.side_list ').hide();
    $('.detail_container ').hide();
    $('.video_list').hide();
    $('.video_detail').show();
    $('.video_history_con').hide();
    $('.video_play').hide();
    $('.local_detail_container').hide();
    $('.video_container').show();
    $('.personal_center').hide();
    $('.drive_con ').hide();
    $('.add_local_video').show();
    $('.iframe_close').hide();
    $('.scenery_play').hide();
    if($('.valiantPhoto ').find('video')){
        $('.valiantPhoto ').find('video').attr('src','')
    }
};
//播放器
function videoPlayShow(){
    $('.video_list').hide();
    $('.video_detail').hide();
    $('.video_history_con').hide();
    $('.video_play').show();
    $('.add_local_video').hide();
};
//风景播放
function sceneryPlay(){
    $('.iframe_close').show();
    $('.scenery_play').show();
}
//本地播放器
function localVideoPlay(){
    $('.video_play').show();
    $('.video_list').hide();
    $('.video_history_con').hide();
    $('.add_local_video').show();
    $('.in_video_information').hide();
    $('.video_intro').hide();
    $('.video_detail').hide();
    $('.video_play').find('a.open_local_file').show();
}
//显示vr游戏详情
function vrGameDetail(){
    $('.list_container').hide();
    $('.side_list').show();
    $('.detail_container ').show();
    $('.local_detail_container ').hide();
    $('.video_container').hide();
    $('.pageGame_con').hide();
    $('.iframe_close').hide();
    $('.scenery_play').hide();
    $('.personal_center ').hide();
    $('.add_title').find('.game').addClass('cur').siblings().removeClass('cur');
}
//显示本地游戏游戏详情
function localGameDetail(){
    $('.list_container').hide();
    $('.side_list').show();
    $('.detail_container ').hide();
    $('.local_detail_container ').show();
    $('.video_container').hide();
    $('.pageGame_con').hide();
    $('.iframe_close').hide();
    $('.scenery_play').hide();
    $('.personal_center ').hide();
    $('.add_title').find('.game').addClass('cur').siblings().removeClass('cur');
}
//驱动显示
function driveShow(){
    $('.header li.drive').addClass('cur').siblings().removeClass('cur');
    $('.header li.drive').show();
    $('.drive_con ').show();
    $('.list_con ').hide();
    var title = $('.add_title').find('.drive').attr('data-name');
    $('.video_play .valiantPhoto').attr('data-video-src','');
    window.CppCall('mainframe', 'main_tab_changed', title);
    resizeFn();
    setTimeout(function(){
        resize_video_list();
    },10);
}

window.onhashchange=function(){
    getGameInfo(location.hash);
}