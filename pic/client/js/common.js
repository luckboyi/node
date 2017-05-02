/**
 * 客服端访问时加载的通用js
 */
var messenger = new Messenger("website", 'vronline-pc');
messenger.addTarget(window.parent, 'pc');
var msg = {
    method: "url",
    param: {
        url: self.location.href
    }
};

messenger.targets["pc"].send(JSON.stringify(msg));


$(function() {
    var $body = $("body");
    if ($body.attr("bg")) {
        var msg = {
            method: "setBg",
            param: {
                url: $body.attr("bg")
            }
        };
        messenger.targets["pc"].send(JSON.stringify(msg));
    }

    
    //点击全屏        
    $('body').on('click','.fa-expand',function(){
        PL.callFun('common', 'fullscreen', '');
    });
    getWebGameListRise();
    videoRize();
    $(window).resize(function(event) {
        getWebGameListRise();
        videoRize();
    });
});



//网页游戏的左侧列表
/*function webgameRisz(){
    var hei = $('.webgame_left_con .unlogin_con h3').height();
    getHei('#webgame_left_con',0);
    getHei('#webgame_left_con .webgame_login',0);
    getHei('#webgame_left_con .webgame_login',0);
    getHei('#hot_recent',30)
    getHei('#webgame_left_con .hot_game_hei',30);
};*/
/*
//video
function videoRize(){
    getHei('.webgame_con  .video_con',0)
}
function getHei(obj,hei) {
    var winHeight;
    if (window.innerHeight){
        winHeight = window.innerHeight;
    }else if ((document.body) && (document.body.clientHeight)) {
        winHeight = document.body.clientHeight;
    };
    //console.dir(winHeight)
    $(obj).height(winHeight - hei);
    if($('#hot_recent ul li').length>0){
        $('#hot_recent').tinyscrollbar();        
    };
}*/
//网页游戏的
function getWebGameListRise(){
    getHei('#webgame_left_con',0)
    getHei('#webgame_left_con .viewport',0)
    getHei('#webgame_left_con .scrollbar',0)

}
function videoRize(){
    getHei('.webgame_con  .video_con',0)
}
//获取高度
function getHei(obj,hei) {
    var winHeight;
    if (window.innerHeight){
        winHeight = window.innerHeight;
    }else if ((document.body) && (document.body.clientHeight)) {
        winHeight = document.body.clientHeight;
    };
    //console.dir(winHeight)
    $(obj).height(winHeight - hei);
    if($('#webgame_left_con').length>0){
        $('#webgame_left_con').tinyscrollbar();        
    };
}

