var isOnscroll = 1;

//右侧导航滚动定位
function scrollEvent(){
	isOnscroll = 1;
	var gd_news = $("#part_1").offset().top;
	var gd_yuanchuang = $("#part_2").offset().top;
	var gd_retu = $("#part_3").offset().top;
	var gd_youxi = $("#part_4").offset().top;
	var gd_video = $("#part_5").offset().top;
	var gd_zixun = $("#part_6").offset().top;
	var sh = parseInt($(window).scrollTop()) + 260;

	$('.needChange').each(function(){
		$(this).find('a').removeClass('show');
		$(this).find('i').css('display', 'block');
	});
	if(sh >= gd_news && sh < gd_yuanchuang){//行业新闻
		$(".needChange i").eq(0).css('display','none');
		$(".needChange a").eq(0).addClass("show");
	}
	else if(sh >= gd_yuanchuang && sh < gd_retu){//原创专栏
		$(".needChange i").eq(1).css('display','none');
		$(".needChange a").eq(1).addClass("show");
	}
	else if(sh >= gd_retu && sh < gd_youxi){//每日热图
		$(".needChange i").eq(2).css('display','none');
		$(".needChange a").eq(2).addClass("show");
	}
	else if(sh >= gd_youxi && sh < gd_video){//VR游戏
		$(".needChange i").eq(3).css('display','none');
		$(".needChange a").eq(3).addClass("show");
	}
	else if(sh >= gd_video && sh < gd_zixun){//VR视频
		$(".needChange i").eq(4).css('display','none');
		$(".needChange a").eq(4).addClass("show");
	}
	else if(sh >= gd_zixun){//VR资讯
		$(".needChange i").eq(5).css('display','none');
		$(".needChange a").eq(5).addClass("show");
	}

    if ( sh <= 1000 ) {
        $(".fd_div").hide();
    }
    else{
        $(".fd_div").show();
    }
	
}

//右侧导航点击定位
function clickPosition(toclass, obj){
	$(window).unbind('scroll',scrollEvent);
	if(typeof(obj) != "undefined"){
		$('.needChange').each(function(){
			if($(obj) != $(this).find('a')){
				$(this).find('a').removeClass('show');
				$(this).find('i').css('display','block');
			}
		});
		$(obj).parent().find('i').css('display','none');
		$(obj).addClass('show');
	}	
	
	$('html,body').animate({scrollTop:$('#'+toclass).offset().top- 10}, 300, 'linear', function(){
		$(window).bind('scroll',scrollEvent);
	});
		
}

$(window).bind('scroll', scrollEvent);
