$("body").delegate(".listClass","click",function(){
    location.href = "http://"+ document.domain +"/news/list/" + $(this).attr("data-catid");
});
$("body").delegate(".catDetail","click",function(){
    window.open("http://"+ document.domain +"/news/detail/" + $(this).attr("data-id") + ".html");
});
//左侧热门栏目js动效
$(".detail-top a").on('click', function(){
    $(this).addClass('cur').siblings().removeClass('cur')
    var targetClass = $(this).attr('id') + '_hot';
    banner(targetClass);
});

function banner(rse) {
    var classArr = ['detail-top-news_hot', 'detail-top-game_hot', 'detail-top-video_hot'];
    var last = classArr.length;
    $.each(classArr,function(key,val){
        if(val == rse) {
            $("."+rse).show();
        } else {
            $("."+val).hide();
        }

    });
}

// $('.head ul').on('click','li',function(){
//     $(this).addClass('cur').siblings().removeClass('cur')
// });

$(".head ul li").each(function(){
    $this = $(this);
    if($this.find("a").attr('href')==String(window.location)){
        $(this).addClass('cur').siblings().removeClass('cur');
    }
    var hrefArr = ['http://www.vronline.com/news/list/2', 'http://www.vronline.com/news/list/3', 'http://www.vronline.com/news/list/4', 'http://www.vronline.com/news/list/5'];
    if($.inArray(String(window.location), hrefArr) > 0){
        $(".zx").addClass('cur').siblings().removeClass('cur');
    }
});

//热门排行榜
$('.popular_recommende .title div a').hover(function(){
    var i = $(this).index();
    $(this).parents('.popular_recommende').find('.recommende_con').eq(i).addClass('shows').siblings().removeClass('shows');
});
$('.recommende_con ul li a').hover(function(){
    $(this).find("div:first-child").addClass('conceal');
    $(this).children(".bewrite").addClass('shows');
    $(this).parent().siblings().children().find("div:first-child").removeClass('conceal');
    $(this).parent().siblings().children().children(".bewrite").removeClass('shows');
});
//百度统计代码
var _hmt = _hmt || [];
(function() {
  var hm = document.createElement("script");
  hm.src = "https://hm.baidu.com/hm.js?f908059df69511e714bd4bdaf91bcd93";
  var s = document.getElementsByTagName("script")[0];
  s.parentNode.insertBefore(hm, s);
})();