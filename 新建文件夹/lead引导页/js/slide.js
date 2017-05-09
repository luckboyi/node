jQuery(function ($) {
    //单张轮播
    var $cast = $(".cast");
    $cast.slide({
        mainCell: ".cast-list",
        titCell:".hd ul",
        effect: "leftLoop",
        autoPage:"<li></li>",
        autoPlay: false,
        interTime:"3000",
        prevCell:".arrow .prev",
        nextCell:".arrow .next"
    });
});
