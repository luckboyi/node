var back = [];
$(function(){
    //


    //点击返回按钮
    $('.header .back').on('click',function(){
        window.history.back();
        $('.setup_con').hide();                
        back.pop();
        console.dir(back)
    });
});





/**
 *     __  ___
 *    /  |/  /___   _____ _____ ___   ____   ____ _ ___   _____
 *   / /|_/ // _ \ / ___// ___// _ \ / __ \ / __ `// _ \ / ___/
 *  / /  / //  __/(__  )(__  )/  __// / / // /_/ //  __// /
 * /_/  /_/ \___//____//____/ \___//_/ /_/ \__, / \___//_/
 *                                        /____/
 *
 * @description MessengerJS, a common cross-document communicate solution.
 * @author biqing kwok
 * @version 2.0
 * @license release under MIT license
 */

window.Messenger = (function(){

    // 消息前缀, 建议使用自己的项目名, 避免多项目之间的冲突
    // !注意 消息前缀应使用字符串类型
    var prefix = "[PROJECT_NAME]",
        supportPostMessage = 'postMessage' in window;

    // Target 类, 消息对象
    function Target(target, name, prefix){
        var errMsg = '';
        if(arguments.length < 2){
            errMsg = 'target error - target and name are both required';
        } else if (typeof target != 'object'){
            errMsg = 'target error - target itself must be window object';
        } else if (typeof name != 'string'){
            errMsg = 'target error - target name must be string type';
        }
        if(errMsg){
            throw new Error(errMsg);
        }
        this.target = target;
        this.name = name;
        this.prefix = prefix;
    }

    // 往 target 发送消息, 出于安全考虑, 发送消息会带上前缀
    if ( supportPostMessage ){
        // IE8+ 以及现代浏览器支持
        Target.prototype.send = function(msg){
            this.target.postMessage(this.prefix + '|' + this.name + '__Messenger__' + msg, '*');
        };
    } else {
        // 兼容IE 6/7
        Target.prototype.send = function(msg){
            var targetFunc = window.navigator[this.prefix + this.name];
            if ( typeof targetFunc == 'function' ) {
                targetFunc(this.prefix + msg, window);
            } else {
                throw new Error("target callback function is not defined");
            }
        };
    }

    // 信使类
    // 创建Messenger实例时指定, 必须指定Messenger的名字, (可选)指定项目名, 以避免Mashup类应用中的冲突
    // !注意: 父子页面中projectName必须保持一致, 否则无法匹配
    function Messenger(messengerName, projectName){
        this.targets = {};
        this.name = messengerName;
        this.listenFunc = [];
        this.prefix = projectName || prefix;
        this.initListen();
    }

    // 添加一个消息对象
    Messenger.prototype.addTarget = function(target, name){
        var targetObj = new Target(target, name,  this.prefix);
        this.targets[name] = targetObj;
    };

    // 初始化消息监听
    Messenger.prototype.initListen = function(){
        var self = this;
        var generalCallback = function(msg){
            if(typeof msg == 'object' && msg.data){
                msg = msg.data;
            }

            var msgPairs = msg.split('__Messenger__');
            var msg = msgPairs[1];
            var pairs = msgPairs[0].split('|');
            var prefix = pairs[0];
            var name = pairs[1];

            for(var i = 0; i < self.listenFunc.length; i++){
                if (prefix + name === self.prefix + self.name) {
                    self.listenFunc[i](msg);
                }
            }
        };

        if ( supportPostMessage ){
            if ( 'addEventListener' in document ) {
                window.addEventListener('message', generalCallback, false);
            } else if ( 'attachEvent' in document ) {
                window.attachEvent('onmessage', generalCallback);
            }
        } else {
            // 兼容IE 6/7
            window.navigator[this.prefix + this.name] = generalCallback;
        }
    };

    // 监听消息
    Messenger.prototype.listen = function(callback){
        var i = 0;
        var len = this.listenFunc.length;
        var cbIsExist = false;
        for (; i < len; i++) {
            if (this.listenFunc[i] == callback) {
                cbIsExist = true;
                break;
            }
        }
        if (!cbIsExist) {
            this.listenFunc.push(callback);
        }
    };
    // 注销监听
    Messenger.prototype.clear = function(){
        this.listenFunc = [];
    };
    // 广播消息
    Messenger.prototype.send = function(msg){
        var targets = this.targets,
            target;
        for(target in targets){
            if(targets.hasOwnProperty(target)){
                targets[target].send(msg);
            }
        }
    };

    return Messenger;
})();

var messenger = new Messenger('pc', 'vronline-pc');
messenger.addTarget(document.getElementById("main").contentWindow, 'website');
messenger.listen(function(msg) {
/*
     msgObj={
     method:"url",//方法名
     param:{//具体参数
     url:"http://"
     }
     }

     msgObj={
     method:"setBg",//方法名
     param:{
     bg:""
     }
     }*/
    obj = $.parseJSON(msg);
    //console.dir(obj);
    switch (obj.method){
        case "url":
            if(obj.param.url != $('#main').attr('src')){
                $('#main').attr('src',obj.param.url);
            };
            var strs = new Array();
            //console.dir(obj.url.indexOf('http://www')>=0);
            if(obj.param.url.indexOf('http://www')>=0){
                strs=obj.param.url.split(".com/");
                $('.drive_con').hide();
                if(strs[1].substr(0,1) == 'v'){
                    $('.vr_show').show();
                }else{
                    $('.vr_show').hide();
                }
                if(strs[1].substr(0,1) == 'm'){
                    $('.local_video_play_btn').show();
                }else{
                    $('.local_video_play_btn').hide();
                }
                //console.dir(strs);
                //console.dir(strs[1].substr(0,1));
                switch (strs[1].substr(0,1)){
                    case 'v':
                        $('.add_title li.game').addClass('cur').siblings().removeClass('cur');
                        unlogin_nogame_show();
                        $('body').css('background','#191f2d url(image/bg.jpg) top center no-repeat');
                        if(strs[1].substr(7,8)>0){
                            vr_online_game_show_btn();
                        }else{
                            vr_game_btn_hide();
                        };
                        break;
                    case 'w':
                        $('.local_video_play_btn').hide();
                        $('.add_title li.pageGame').addClass('cur').siblings().removeClass('cur');
                        $('body').css('background','#191f2d url(image/bg.jpg) top center no-repeat');
                        //gameListHide();
                        vr_game_btn_hide();
                        break;
                    case 'm':
                        $('.add_title li.video').addClass('cur').siblings().removeClass('cur');
                        $('body').css('background','#191f2d url(image/bg.jpg) top center no-repeat');

                        //gameListHide();
                        $('.local_video_play_btn').show();
                        vr_game_btn_hide();
                        break;
                    case 'c':
                        $('body').css('background','#191f2d url(image/bg.jpg) top center no-repeat');
                        $('.local_video_play_btn').hide();
                    default:
                        $('.local_video_play_btn').hide();
                        $('.add_title li.home').addClass('cur').siblings().removeClass('cur');
                        //gameListHide();
                        vr_game_btn_hide();
                        break;
                };
            }
            if(obj.param.url.indexOf('localgame.html')>0){
                $('.drive_con').hide();
                $('.local_video_play_btn').hide();
                vr_local_game_show();
            };
            if(obj.param.url.indexOf('drive')>0){

                $('.local_video_play_btn').hide();
                $('.add_title li.drive').addClass('cur').siblings().removeClass('cur');
                vr_game_btn_hide();
            };
            break;
        case "setBg":
            //console.dir(obj.param.url);
            if(obj.param.url != ''){
                $('body').css('background','#191f2d url('+obj.param.url+') top center no-repeat');
            }
            break;
    }
});
function local_cofig_msg(data){
    messenger.targets["website"].send(JSON.stringify(data));
};

function buy_game(data){
    console.dir('购买游戏')
    messenger.targets["website"].send(JSON.stringify(data));
}
