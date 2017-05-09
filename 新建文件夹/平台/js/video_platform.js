if (window.CppCall == undefined) {
    window.CppCall = function () {};
}
$(function(){
        //获取浏览器高度
        videoResize();
        $(window).resize(function(){
            videoResize();
        });
        //点击打开本地视频
        $('.left_con_btn a.fr').on('click',function(){
            window.CppCall('videoframe', 'videoopendir', '');
        })
    });
function videoResize(){
    videoRiszFn();
    videoListResizFn();
    var winHeight;
    if (window.innerHeight){
        winHeight = window.innerHeight;
    }else if ((document.body) && (document.body.clientHeight)) {
        winHeight = document.body.clientHeight;
    }
    $('.video_con_hei').height(winHeight);
    $('.video_list_con_hei').height(winHeight-30);

    $('#video_left_con').tinyscrollbar();
    $('#video_right_con').tinyscrollbar();

};
function videoRiszFn(){
    var wid = $('#video_right_con').width(); //获取video盒子的宽度
    var few1 = 6;  //分几份;
    var few2 = 5;  //小屏分几份
    //var few3 = 4;
    var w = wid/few1-16;
    var maxW = 2*w+16;
    var h = w*9/16;
    var maxH =2*h+13+16;

    var minW  =  wid/few2 -16;
    var minH = minW*9/16;
    var minMaxW = 2*minW +16;
    var minMaxH =2*minH+13+16;

    if(window.innerWidth >1400){
        $('.multimedia_right_con .multimediaCon .big').width(maxW).height(maxH+30);
        $('.multimedia_right_con .multimediaCon .big a').width(maxW-2).height(maxH-2);

        $('.multimedia_right_con .multimediaCon .min li').width(w).height(h);
        $('.multimedia_right_con .multimediaCon .min li a').width(w-2).height(h-2);
    }else{
        $('.multimedia_right_con .multimediaCon .big').width(minMaxW).height(minMaxH);
        $('.multimedia_right_con .multimediaCon .big a').width(minMaxW-2).height(minMaxH-2);

        $('.multimedia_right_con .multimediaCon .min li').width(minW).height(minH);
        $('.multimedia_right_con .multimediaCon .min li a').width(minW-2).height(minH-2);
        $('.multimediaCon ').height(minMaxH+20);
    }
};
function videoListResizFn(){
    var wid = $('#video_right_con').width();
    var listFewMax = 6;
    var listFewMin =4;
    var listMaxW = (wid-12*listFewMax)/listFewMax ;
    var listMaxH = listMaxW*9/16;

    var listMinW = (wid - 12*listFewMin)/listFewMin;
    var listMinH = listMinW*9/16;

    if(window.innerWidth > 1400){
        $('.multimedia_right_con  .pageGame_item li').width(listMaxW).height(listMaxH);
        $('.multimedia_right_con  .pageGame_item li a').width(listMaxW-2).height(listMaxH-2);
    }else{
        $('.multimedia_right_con  .pageGame_item li').width(listMinW).height(listMinH);
        $('.multimedia_right_con  .pageGame_item li a').width(listMinW-2).height(listMinH-2);
    }

}