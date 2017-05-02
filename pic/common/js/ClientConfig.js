/*
客户端全局配置
*/
(function() {
    var ClientConfig = {
        Host: "http://www.vronline.com",
        webGameHost: "http://webgame.vronline.com",
        imgHost: "//image.vronline.com",
        webGameImgHost: function() {
            return this.imgHost + "/webgame/";
        }
    };
    window.ClientConfig = ClientConfig;
})()