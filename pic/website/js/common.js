$(function() {
    //导航条
    $('.nav ul li').each(function() {
        $(this).mouseover(function() {
            $(this).children('.con').show();
        });
        $(this).mouseout(function() {
            $(this).children('.con').hide();
        })
    });

    $(".website-link").click(function() {
        var link_to = $(this).attr("link-to");
        if (!link_to) {
            return false;
        }
        window.location.href = link_to;
    });

    /**
     * VR游戏详情
     */
    $("body").delegate(".show-vrgame-detail", 'click', function(event) {
        event.stopPropagation();
        var appid = $(this).attr("appid");
        location.href = "/vrgame/" + appid;
    });

    /**
     * 页游详情
     */
    $("body").delegate('.show-webgame-detail', 'click', function(event) {
        event.stopPropagation();
        var appid = $(this).attr("appid") ? $(this).attr("appid") : $(this).attr("game-id");
        var gname = $(this).attr("game-name");
        var json = {
            gameid: appid,
            gameSrc: ClientConfig.Host + "/webgame/" + appid,
            gamename: gname
        };
        PL.callFun('webpagegamehallframe', 'opendetail', json);
    });


    /**
     * 页游详情
     */
    $("body").delegate('.show-video-detail', 'click', function(event) {
        event.stopPropagation();
        var appid = $(this).attr("video-id");
        window.location.href = "/media/play/" + appid;
    });


    /**
     * 开始页游，进入选服务器
     */
    $("body").delegate('.start-web-game-server', 'click', function(event) {
        event.stopPropagation();
        var appid = $(this).attr("game-id");
        var appname = $(this).attr("game-name");
        var json = {
            gameid: appid,
            gamename: appname,
            gameSrc: ClientConfig.Host + "/servers/" + appid
        };
        PL.startGame(json);
    });

    /**
     * 页游进入具体服务器
     */
    $("body").delegate('.start-web-game', 'click', function(event) {
        event.stopPropagation();
        var appid = $(this).attr("appid") ? $(this).attr("appid") : $(this).attr("game-id");
        var serverid = $(this).attr("server-id");
        var gamename = $(this).attr("game-name");
        if (!appid) {
            return false;
        }
        var url = 'http://www.vronline.com/webgame/validserver/' + appid;
        if (serverid > 0) {
            var json = {
                gameid: appid,
                areaid: serverid,
                gamename: gamename,
                areaname: ""
            };
            PL.startGame(json);
            return;
        }
        $.get(url, function(data) {
            if (data == 1) {
                var json = {
                    gameid: appid,
                    areaid: serverid,
                    gamename: gamename,
                    areaname: ""
                };
                PL.startGame(json);
            } else {
                var json = {
                    gameid: appid,
                    gameSrc: ClientConfig.Host + "/webgame/" + appid,
                    gamename: gamename
                };
                PL.callFun('webpagegamehallframe', 'opendetail', json);
            }
        });
    });


    /**
     * VR视频详情
     */
    $("body").delegate(".show-video-class", 'click', function(event) {
        event.stopPropagation();
        var class_id = $(this).attr("class-id");
        window.location.href = "/media/list?class_id=" + class_id;
    });

    /**
     * VR视频详情
     */
    $("body").delegate(".get-list", 'click', function(event) {
        event.stopPropagation();
        $(this).addClass('cur').siblings().removeClass('cur')
        var class_id = $(this).attr("class-id");
        var type = $(this).attr("type");
        var data = {};
        if (class_id) {
            data = {
                tp: type,
                category: class_id
            };
        }
        window.pagination.reload({
            ajaxData: data
        });
    });

    /**
     * VR搜索标签
     */
    $("body").delegate(".to-list", 'click', function(event) {
        event.stopPropagation();
        $(this).addClass('cur').siblings().removeClass('cur')
        var class_id = $(this).attr("class-id");
        var type = $(this).attr("type");
        type = type == "video" ? "media" : type;
        window.location.href = "/" + type + "/list?class_id=" + class_id;
    });

    /**
     * 客户端新窗口打开
     */
    $("body").delegate(".open-link", 'click', function(event) {
        event.stopPropagation();
        var link = $(this).attr("link-to");
        var json = {
            url: link
        }
        PL.callFun('common', 'openurl', json);
    });

    $("body").delegate(".open-link-platform", 'click', function(event) {
        event.stopPropagation();
        var link = $(this).attr("link-to");
        var arr = [];
        var appid = 0;
        arr = link.split(/\/|\?/);
        if (arr.length > 0) {
            for (i = 0; i < arr.length; i++) {
                if (parseInt(arr[i]) > 10000) {
                    appid = arr[i];
                    break;
                }
            }
        }

        var json = {
            gamename: "open-link",
            gameSrc: link,
            gameid: appid
        }

        PL.callFun('webpagegamehallframe', 'openarea', json);
    });
})