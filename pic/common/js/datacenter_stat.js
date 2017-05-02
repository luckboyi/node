(function($) {
    var dcstat = {};

    /*
     * actid
     * title_vrgame_clickedcount    vr游戏点击
     * title_video_clickedcount     视频点击
     * title_webgame_clickedcount   游戏点击
     * game_start_count             游戏开始点击
     * addgame_count                增加游戏
     * local_videoplayer_usecount   本地视频播放器
     * set_clickedcount             设置点击
     * feedback_clickedcount        反馈点击
     * video_history                视频历史记录
     * banner_webgame               webgame的banner
     * banner_video                 视频的banner
     * webgameleftad                webgame左侧下方广告
     * profile                      个人中心
     * alipay                       支付宝点击
     * weixinpay                    微信支付点击
    */
    dcstat.properties = {};

    dcstat.send = function(event, props) {
        var _this = this;
        var properties = {};
        for (prop in props) {
            properties[prop] = props[prop];
        }
        var data1 = {
            project: "vrplat",
            event: event,
            timestamp: parseInt(Date.parse(new Date())/1000),
            properties:properties,
        }
        $.ajax({
            url: 'http://stat.vronline.com:81/',
            type: 'POST',
            crossDomain: true,
            dataType: 'JSON',
            data: {message:JSON.stringify(data1)},
        });
    }

    window.dcstat = dcstat;


    /*
     * 客户端进游戏按钮
     */
    $("body").delegate('.datacenter-onclick-stat', 'click', function(event) {
        var actid = $(this).attr("stat-actid");
        if (actid == undefined) {
            return false;
        }
        var props = {"catalog":"click", "actid":actid};

        var appid = $(this).attr("stat-appid");
        if (appid != undefined) {
            props['appid'] = appid;
        }

        var bannerid = $(this).attr("stat-bannerid");
        if (bannerid != undefined) {
            props['bannerid'] = bannerid;
        }

        var targetid = $(this).attr("stat-targetid");
        if (targetid != undefined) {
            props['targetid'] = targetid;
        }

        var itemid = $(this).attr("stat-itemid");
        if (itemid != undefined) {
            props['itemid'] = itemid;
        }

        var aid = $(this).attr("stat-aid");
        if (aid != undefined) {
            props['aid'] = aid;
        }

        dcstat.send("pageclick", props);
    });

    /*
     * 视频页游banner
     */
    $("#videoBanner").on("click", "li.poster-item.current", function(){
        var actid;
        var bannertype = $(this).attr("bannertype");
        if (bannertype == "banner") {
            actid = "click_videoo_banner";
        }else if (bannertype == "webgame") {
            actid = "click_webgame_banner";
        }else {
            actid = "click_banner_unknow";
        }
        var bannerid = $(this).attr("bannerid");
        var itemid = $(this).attr("itemid");
        var props = {"catalog":"click", "actid":actid, "bannerid":bannerid, "targetid":itemid};
        dcstat.send("pageclick", props);
    });

    /*
     * 进游戏按钮
     */
    $(".pageGame_item").delegate('.in_game', 'click', function(event) {
        var appid = $(this).attr("game-id");
        if (appid == undefined) {
            appid = 0;
        }
        var props = {"catalog":"click", "actid":"click_webgame_enter_game_button", "appid":appid};
        dcstat.send("pageclick", props);
    });

    /*
     * 游戏首页按钮
     */
    $(".pageGame_item").delegate('.go_home', 'click', function(event) {
        var appid = $(this).attr("appid");
        if (appid == undefined) {
            appid = 0;
        }
        var props = {"catalog":"click", "actid":"click_webgame_info_button", "appid":appid};
        dcstat.send("pageclick", props);
    });

    /*
     * 领礼包按钮统计
     */
    $("#getGiftBtn").click(function() {
        var props = {"catalog":"click", "actid":"click_webgame_in_gift_button"};
        dcstat.send("pageclick", props);
    });

    /*
     * 开始游戏按钮统计
     */
    $("#startGame").click(function() {
        var props = {"catalog":"click", "actid":"click_start_game_button"};
        dcstat.send("pageclick", props);
    });

    /*
     * 客户端进游戏按钮
     */
    $(".hot_list").delegate('.in_game', 'click', function(event) {
        var appid = $(this).attr("game-id");
        if (appid == undefined) {
            appid = 0;
        }
        var props = {"catalog":"click", "actid":"click_webgame_enter_game_button", "appid":appid};
        dcstat.send("pageclick", props);
    });

    /*
     * 客户端游戏首页按钮
     */
    $(".hot_list").delegate('.go_home', 'click', function(event) {
        var appid = $(this).attr("appid");
        if (appid == undefined) {
            appid = 0;
        }
        var props = {"catalog":"click", "actid":"click_webgame_info_button", "appid":appid};
        dcstat.send("pageclick", props);
    });

})(jQuery);