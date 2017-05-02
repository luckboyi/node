/**
 * 平台整体js规划
 */
(function(w) {
    var platform = {
        init: function() {
            if (typeof w.CppCall == "function") {
                this.Platform = "pc";
            } else {
                this.Platform = "web";
            }
        },
        callFun: function(frameType, action, json) {
            if (!frameType || !action) {
                return false;
            }
            if (!json) {
                json = null;
            }
            if (this.Platform == "pc") {
                if (typeof json == "object") {
                    json = JSON.stringify(json);
                }
                w.CppCall(frameType, action, json);
            } else {
                if (typeof this[frameType + "_" + action] == "function") {
                    this[frameType + "_" + action](json);
                }
            }
            return true;
        },
        loginframe_updateuserinfo: function(obj) {
            if (typeof(obj.img) != "undefined") {
                $("#headFace").attr('src', obj.img);
            }
            if (typeof(obj.nick) != "undefined") {
                $("#headFace").attr('src', obj.nick);
            }
        },
        webpagegamehallframe_openarea: function(json) {
            this.openNewWindow(json.gameSrc, json.gamename);
        },
        webpagegamehallframe_startgame: function(json) {
            this.openNewWindow(json.gameSrc, json.gamename);
        },
        webpagegamehallframe_opendetail: function(json) {
            window.open(json.gameSrc, "_blank");
        },
        loginframe_prelogin: function(json) {
            var url = "http://www.vronline.com/" + json.type;
            if (json.referer) {
                url += "?referer=" + json.referer
            }
            window.location.href = url;
        },
        common_openurl: function(json) {
            if (!json.url) {
                return false;
            }
            window.open(json.url, "_blank");
        },
        loginframe_showlogin: function(json) {
            if (typeof loginFn == "object") {
                loginFn.login();
            } else {
                var url = "http://www.vronline.com/login";
                if (json.referer) {
                    url += "?referer=" + json.referer
                }
                window.location.href = url;
            }
        },
        startGame: function(json) {
            if (json.areaid) {
                json.gameSrc = ClientConfig.Host + "/start/" + json.gameid + "/" + json.areaid;
                this.callFun('webpagegamehallframe', 'startgame', json);
            } else {
                json.gameSrc = ClientConfig.Host + "/servers/" + json.gameid;
                this.callFun('webpagegamehallframe', 'openarea', json);
            }
        },
        openNewWindow: function(src, name) {
            var iWidth = 1000; //弹出窗口的宽度;
            var iHeight = 700; //弹出窗口的高度;
            var iTop = (window.screen.availHeight - 30 - iHeight) / 2; //获得窗口的垂直位置;
            var iLeft = (window.screen.availWidth - 10 - iWidth) / 2; //获得窗口的水平位置;
            window.open(src, name, "height=" + iHeight + ", width=" + iWidth + ", top=" + iTop + ", left=" + iLeft);
        }
    };

    platform.init();
    window.PL = platform;
})(window);

//PL.callFun('common','close');