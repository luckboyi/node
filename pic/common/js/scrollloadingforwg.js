(function($){
    var scrollLoading = {};
    scrollLoading.config = {
        ulr:'',//type=ajax时为请求地址
        ajaxType:'post',//ajaxType=>post,get
        pageSize:1,//默认从第一页显示数量
        page:1,//默认从第几页开始
        ajaxData:{},//其他需要传递参数
        jsonpCallback:'',//指定jsonpcallback函数
        ajaxDataType:'json',//json:返回json对象，根据魔板进行替换，html：直接append到容器中
        contentHtmlCon:'',//生成html后存放的容器
        autoCreatHtml:true,
        debug:false,
        ifEmptyHtml:'',//数据为空时显示的盒子
		webGameSort:0,//点击按钮传过来的值
        allowAlert:true,//是否运行弹出错误信息
    }
    scrollLoading.init = function(config){
      var _this = this ;
        //获取配置参数；
        _this.config = $.extend({},_this.config,config);
        _this.url = _this.config.url;
        //获取设置初始页数据
        _this.switchPage(_this.config.page, _this.config.webGameSort);
        //滚动事件
        _this.scrollFn(_this.config.page, _this.config.webGameSort);
    };
    //滚动加载数据
    scrollLoading.scrollFn = function(page, webGameSort){
        var _this = this;
        var page = page;
        $(window).scroll(function(){
            var sct = $(this).scrollTop();
            var scrH = $(document).height();
            var windowHeight = $(this).height();
			
            if(sct + windowHeight == scrH ){
                page++;
				//console.dir(page)
                _this.getPageData(page);
            }
        });
    }

    //初始化数据
    scrollLoading.switchPage = function(page, webGameSort){
        var _this = this ;
        page = parseInt(page);
        _this.page = page;

        if (page < 1)
            return errorRetrun("页数不能小于1");
		console.log( parseInt(webGameSort));
		console.log(localData.get('web_Game_Sort'));
		if(localData.get('web_Game_Sort') !== parseInt(webGameSort)){
			$(_this.config.contentHtmlCon).text('');
			page = 1;
		}
        _this.getPageData(page);
    };
    //成功获取数据
    //获取分页数据
    scrollLoading.getPageData=function(page){
        var _this = this ;
        var data = _this.config.ajaxData;
        var contentHtmlCon = _this.config.contentHtmlCon;
        data.page = page;
        var dataType = _this.config.ajaxDataType;
        var option = {
            url:_this.url,
            cache:false,
            async: true,
            type: _this.config.ajaxType,
            dataType: dataType,
            data: data,
            success: function(data) {
                //如果有传参函数,调用传参的函数,直接传递data数据
				//console.log(data);
                $(_this.config.contentHtmlCon).append(data);
				
            }
        };
        $.ajax(option);
    };
    window.scrollLoading =scrollLoading;
	localData = {
			hname:location.hostname?location.hostname:'localStatus',
			isLocalStorage:window.localStorage?true:false,
			dataDom:null,

			initDom:function(){ //初始化userData
				if(!this.dataDom){
					try{
						this.dataDom = document.createElement('input');//这里使用hidden的input元素
						this.dataDom.type = 'hidden';
						this.dataDom.style.display = "none";
						this.dataDom.addBehavior('#default#userData');//这是userData的语法
						document.body.appendChild(this.dataDom);
						var exDate = new Date();
						exDate = exDate.getDate()+30;
						this.dataDom.expires = exDate.toUTCString();//设定过期时间
					}catch(ex){
						return false;
					}
				}
				return true;
			},
			set:function(key,value){
				if(this.isLocalStorage){
					window.localStorage.setItem(key,value);
				}else{
					if(this.initDom()){
						this.dataDom.load(this.hname);
						this.dataDom.setAttribute(key,value);
						this.dataDom.save(this.hname)
					}
				}
			},
			get:function(key){
				if(this.isLocalStorage){
					return window.localStorage.getItem(key);
				}else{
					if(this.initDom()){
						this.dataDom.load(this.hname);
						return this.dataDom.getAttribute(key);
					}
				}
			},
			remove:function(key){
				if(this.isLocalStorage){
					localStorage.removeItem(key);
				}else{
					if(this.initDom()){
						this.dataDom.load(this.hname);
						this.dataDom.removeAttribute(key);
						this.dataDom.save(this.hname)
					}
				}
			}
		}
})(jQuery);
