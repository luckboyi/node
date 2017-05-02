$(function(){ 
    var oUl=$('.banner ul');
    var aBtn=$('.banner ol li');
    var aLi=$('.banner ul li');
    var now=0
    aBtn.click(function(){ 
        clearInterval(timer);
        now=$(this).index();
        tab();
    });
    
    var timer=setInterval(next,5000);
    
    oUl.hover(function(){ 
        clearInterval(timer);
    },function(){ 
        timer=setInterval(next,5000);
    });
    
    function next(){ 
        now++;
        now%=aBtn.length;
        tab();
    };
    
    function tab(){ 
        aBtn.removeClass('cur');
        aLi.removeClass('active');
        aBtn.eq(now).addClass('cur');
        aLi.eq(now).addClass('active');
    };

    //充值
    $('.go_paycenter').click(function(){
        var uid = $(this).attr("uid");
        var appid = $(this).attr("appid");
        var openid = $(this).attr("openid");
        if (!appid || (!openid && !uid)) {
            window.open("http://www.vronline.com/charge");
            return true;
        }
        if (openid) {
            window.open("http://www.vronline.com/charge?openid=" + openid + "&appid=" + appid);
            return true;
        }else if (uid) {
            window.open("http://www.vronline.com/charge?uid=" + uid + "&appid=" + appid);
            return true;
        }else {
            window.open("http://www.vronline.com/charge");
            return true;
        }
    });
    //注册
    $('.go_register').click(function(){
        window.open("http://www.vronline.com/register");
    });

    //开始游戏
    $(".start-web-game").click(function(){
        var appid=$(this).attr("appid");
        var serverid=$(this).attr("server-id");
        if (!serverid) {
            serverid = -1;
        }
        window.open("http://web.vronline.com/start/" + appid+ "/" + serverid);
    });
    //进选服页
    $('.go_servers').click(function(){
        var appid = $(this).attr("appid");
        window.open("http://web.vronline.com/play/" + appid);
    });

    $(".website-jump").on('click', function(){
        var href = "http://web.vronline.com/detail/" + $(this).attr('game-id');
        window.open(href);
    });

    $(".webgame-gift").on('click', function(){
        location.href = "http://www.vronline.com/website/packageReceive/" + $(this).attr('game-id');
    });

    //游戏排行
    $('.game_ranking ul li').hover(function(){
        $(this).addClass('cur').siblings().removeClass('cur')
    });

    //新闻活动切换
    $('.nav p').on('click','span',function(){
        var i = $(this).index();
        $(this).addClass('cur').siblings().removeClass('cur');
        $(this).parents('.news').find('.newsCon').eq(i).addClass('show').siblings().removeClass('show');
    });
    //游戏角色
    $('.nav .part').on('click','div',function(){
        var i = $(this).index();
        $(this).addClass('cur').siblings().removeClass('cur');
        $(this).parents('.news').find('.newsCon').eq(i).addClass('show').siblings().removeClass('show');
    });
    $('.next').on('click', function(){
        var pages = $('.pages').text();
            totalPages = $('.totalPages').text();
            gamePages = $('.gamePages').text();

        if(parseInt(pages) + 1 <= totalPages) {
            var id = parseInt(pages) + 1;
            $('.pages').text(id);
            $('.open_service ul').addClass('hide');
            $("#webservers" + id).removeClass('hide');
        }
    });

    $('.gamesNext').on('click', function(){
        var pages = $('.gamePages').text();
            totalPages = $('.gameTotalPages').text();

        if(parseInt(pages) + 1 <= totalPages) {
            var id = parseInt(pages) + 1;
            $('.gamePages').text(id);
            $('.game_ranking ul').addClass('hide');
            $("#gameRank" + id).removeClass('hide');
        }
    });

    $('.pro').on('click', function(){
        var pages = $('.pages').text();
            totalPages = $('.totalPages').text();
            gamePages = $('.gamePages').text();

        if(parseInt(pages) - 1 > 0) {
            var id = parseInt(pages) - 1;
            $('.pages').text(id);
            $('.open_service ul').addClass('hide');
            $("#webservers" + id).removeClass('hide');
        }
    });
    $('.gamesPro').on('click', function(){
        var pages = $('.gamePages').text();
            totalPages = $('.gameTotalPages').text();

        if(parseInt(pages) - 1 > 0) {
            var id = parseInt(pages) - 1;
            $('.gamePages').text(id);
            $('.game_ranking ul').addClass('hide');
            $("#gameRank" + id).removeClass('hide');
        }
    });
    //游戏截图  
    function screenshots(){
        var oBox=$(".screenshots ul");
        var aBoxLi=$(".screenshots ul li");
        var left=$(".screenshots .left_icon");
        var right=$(".screenshots .right_icon");
        var now=0;
        left.click(function(){
            if(now<=0){
                now=0;
                return;
            }
            now--;
            oBox.stop().animate({'left':-aBoxLi.width()*now+'px'});
        });
        right.click(function(){
            now++;
            now%=aBtn.length;
            oBox.stop().animate({'left':-aBoxLi.width()*now+'px'});
        });
    } 
    screenshots();
});
