/*商城自适应*/
function resize_store(){
    var w  = $('.list_container .js_store_hei').width()-20;
    //console.dir(w)
    //alert(w)
    if(w <= 960){
        var a = Math.ceil((w-40)/2)-10;
        var b = a/16*9;
        $('.list_container .list_con ').find('li').each(function(){
            $(this).width(a).height(b);
            $(this).find('div.list_img').width(a).height(b);
        })
    }else{
        var a = Math.ceil((w-60)/3)-1;
        var b = a/16*9;
        $('.list_container .list_con ').find('li').each(function(){
            $(this).width(a).height(b);
            $(this).find('div.list_img').width(a).height(b);
        })
    }
}
/*视频首页*/
function resize_video_list(){
    var w  = $('.video_container  .js_store_hei').width()-60;
    //alert(w);
    if(w<= 960){
        var a = Math.ceil((w-80)/5);
        var b = a/16*9;
        var c = 2*a + 20;
        var d = 2*b+32;
        for(var i = 0 ; i <$('li.videoList').length ; i++){
            for(var k = 0 ; k<$('li.videoList').eq(i).find('.video_list_container li').length ; k++){
                if(k == 0 ){
                    $('li.videoList').eq(i).find('.video_list_container li').eq(0).children('a').width(c).height(d);
                    $('li.videoList').eq(i).find('.video_list_container li').eq(0).find('p').width(c);
                }else{
                    $('li.videoList').eq(i).find('.video_list_container li').eq(k).children('a').width(a).height(b);
                    $('li.videoList').eq(i).find('.video_list_container li').eq(k).find('p').width(a);
                }
            }
        };
        $('.video_list_container ul').css({
            'height':d+32,
            'overflow':'hidden'
        })
    }else{
        var a = Math.ceil((w-120)/7);
        var b = a/16*9;
        var c = 2*a + 20;
        var d = 2*b+32;
        for(var i = 0 ; i <$('li.videoList').length ; i++){
            for(var k = 0 ; k<$('li.videoList').eq(i).find('.video_list_container li').length ; k++){
                if(k == 0 ){
                    $('li.videoList').eq(i).find('.video_list_container li').eq(0).children('a').width(c).height(d);

                }else{
                    $('li.videoList').eq(i).find('.video_list_container li').eq(k).children('a').width(a).height(b);
                }
            }

        };
        $('.video_list_container ul').css({
            'height':d+32,
            'overflow':'hidden'
        })
    }

};
/*视频列表页*/

function resize_videoDetail_list(){
    var w  = $('.in_video_detail').width()-6;
    //alert(w);
    if(w<= 960){
        var a = Math.ceil((w-80)/5);
        var b = a/16*9;
        $('.video_detail .video_detail_con li').each(function(key){
            $(this).width(a);
            $(this).find('.img_contain').width(a).height(b);
        })

    }else{
        var a = Math.ceil((w-120)/7);
        var b = a/16*9;
        $('.video_detail .video_detail_con li').each(function(){
            $(this).width(a);
            $(this).find('.img_contain').width(a).height(b);
        })
    }

};