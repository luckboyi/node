//轮播
(function($){
	$.fn.bannerVideo = function(options){
		var defaults = {
			auto:true,//是否自动播放
			time:3000,//自动播放的间隔时间
			cur:0 ,//默认第一个加active
			auto_class:'cur',//大图的class
			current:'active',//添加当前类
			timeshou:500 //动画消失的时间
		}
		var opts = $.extend(defaults,options);
		var base = this;
		var obj = $(this);//获取获取对象
		var aul = obj.find('ul');
		var ali =aul.find('li'); //滚动的li
		var mol = obj.find('ol'); 
		var mli = mol.find('li')//获取列表的li
		var len = mli.length;
		var timer;
		var i= opts.cur;
		base.init =function(){
			var _this = this;
			//hover的时候
			_this.hover();
			//如果支持自动播放
			if(opts.auto == true){
				_this.animation();
			}else{
				_this.clearAnimation();
			}
		};
		base.hover = function(){
			var _this = this;
			//console.dir($(mli).length)
			$("ol li",_this).hover(function(){ 
				$(this).addClass(opts.current).siblings('').removeClass(opts.current);
				var i = index = $(this).index();
				$('ul li',_this).eq(i).addClass(opts.auto_class).siblings('').removeClass(opts.auto_class)
				/*$('ul li',_this).eq(i).css({zIndex: '9'}).addClass(opts.auto_class).animate({
						opacity: 1,
						},opts.timeshou).css({zIndex: '6'}).siblings('').removeClass(opts.auto_class).animate({
							opacity: 0,
				},opts.timeshou);*/
				_this. change(i);
				//console.dir(index);
			},function(){ 
				//$(this).removeClass(opts.current);
				_this.animation();
			});  
			$(_this).hover(function(){
				_this.clearAnimation()
			},function(){
				_this.animation()
			})
		};
		base.animation = function(){
			var _this = this;
		
			_this.clearAnimation()
			//循环定时器
			timer = setInterval(function(){
				i = i+1;
				if(i> len-1){
					i = 0;
				}
				_this. change(i);
				$('ol li',_this).eq(i).addClass(opts.current).siblings('').removeClass(opts.current);
				//console.dir(i)
			}, opts.time);

		};
		base.change = function(i){
			var _this = this;
			$('ul li',_this).eq(i).css({zIndex: '9'}).addClass(opts.auto_class).animate({
					opacity: 1,
					},0).siblings('').css({zIndex: '1'}).removeClass(opts.auto_class).animate({
						opacity: 0,
			},0);
		}
		base.clearAnimation = function(){
			clearInterval(timer);
		};
		base.init();
	}
})(jQuery);