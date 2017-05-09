jQuery(function ($) {
	//5张图滑动
    $(".column-wrap").slide({
        mainCell: ".column-cast ul",
        effect: "leftLoop",
        autoPlay: false,
        vis:5,
        scroll:1,
        autoPage:true,
        prevCell:".column-prev",
        nextCell:".column-next"
    });
    //单张轮播
    var $cast = $(".cast");
    $cast.slide({
        mainCell: ".cast-list",
        titCell:".hd ul",
        effect: "leftLoop",
        autoPage:"<li></li>",
        autoPlay: true,
        interTime:"3000",
        prevCell:".arrow .prev",
        nextCell:".arrow .next"
    });
    if($cast.find("li").size() > 3){
        $cast.hover(function() {
            $(this).find(".prev,.next").stop(true, true).fadeIn(300)
        }, function() {
            $(this).find(".prev,.next").fadeOut(300)
        });
    }  
	//VR游戏榜单切换
    $(".mod1").slide({
        mainCell: ".game-main",
        titCell:".game-tab a",
        effect: "fold",
        autoPlay: false
    });
   
});