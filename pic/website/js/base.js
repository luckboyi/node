$(function(){
	/*官网首页的js*/
	//头部导航文字颜色切换
	$('.top .left').on('click','a',function(){
		$(this).addClass('sy').siblings().removeClass('sy');
	});
	//导航条     
	$('.nav ul li').each(function(){
		$(this).mouseover(function(){
			$(this).children('.con').show();	
		});
		$(this).mouseout(function(){
			$(this).children('.con').hide();
		})
	});
	//导航条切换  2016-12-6 qiubo
//	$('.nav ul li').on('click','a',function(){
//		$(this).addClass('cur').siblings().removeClass('cur');
//	});
	$(".nav ul li a").each(function(){  
        $this = $(this);  
        if($this[0].href==String(window.location)){  
            $(this).addClass('cur').siblings().removeClass('cur');  
        }  
    });
	//热门榜单
	$('.hotList_con ul li').hover(function(){
		$(this).addClass('cur').siblings().removeClass('cur')
	});
	//热门页游
	$('.webgames_con ul li .enter span').hover(function(){
		$(this).addClass('cur').siblings().removeClass('cur')
	});
	//页游首页左侧
	//开始游戏进入专区
	$('.go_btn p').hover(function(){
		$(this).addClass('cur').siblings().removeClass('cur')
	});
	//点击tab切换
	$('.hotList_title').on('click','span',function(){
		var i = $(this).index();
		$(this).addClass('cur').siblings().removeClass('cur');
		$(this).parents('.hotList').find('.hotList_con').eq(i).addClass('cur').siblings().removeClass('cur');
	})
	//开服
	var now=0;
	$(".tab_title span").click(function(){
		now=$(this).index();
		tab();
	})
	function tab(){ 
		$(".tab_title span").removeClass('tab_titleBg');
		$(".tab_con ul").addClass('tab_hide');
		$(".tab_title span").eq(now).addClass('tab_titleBg');
		$(".tab_con ul").eq(now).removeClass('tab_hide');
	};
	//按类型选择 点击选中
	$('.screen ul li').click(function(){
		$(this).addClass('cur').siblings().removeClass('cur')
	});

	//点击视频分类
	$('.show-video-class').click(function(){
		var classid = $(this).attr('class-id');
		window.location.href="http://www.vronline.com/media/"+classid;
	});	
	//视频左侧切换
	$('.video_con_left ul').on('click','li',function(){
		$(this).addClass('cur').siblings().removeClass('cur');
	});
});