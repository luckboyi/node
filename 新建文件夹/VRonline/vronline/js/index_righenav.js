var isOnscroll = 1;

//�Ҳർ��������λ
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
	if(sh >= gd_news && sh < gd_yuanchuang){//��ҵ����
		$(".needChange i").eq(0).css('display','none');
		$(".needChange a").eq(0).addClass("show");
	}
	else if(sh >= gd_yuanchuang && sh < gd_retu){//ԭ��ר��
		$(".needChange i").eq(1).css('display','none');
		$(".needChange a").eq(1).addClass("show");
	}
	else if(sh >= gd_retu && sh < gd_youxi){//ÿ����ͼ
		$(".needChange i").eq(2).css('display','none');
		$(".needChange a").eq(2).addClass("show");
	}
	else if(sh >= gd_youxi && sh < gd_video){//VR��Ϸ
		$(".needChange i").eq(3).css('display','none');
		$(".needChange a").eq(3).addClass("show");
	}
	else if(sh >= gd_video && sh < gd_zixun){//VR��Ƶ
		$(".needChange i").eq(4).css('display','none');
		$(".needChange a").eq(4).addClass("show");
	}
	else if(sh >= gd_zixun){//VR��Ѷ
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

//�Ҳർ�������λ
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
