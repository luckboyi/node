(function($){
	var comment={};
	comment.config={
		// contentHtmlCom:'#comment',//生产后的容器
		// url:'',//type=ajax 请求的地址
		// ajaxType:'post',//ajax type post，get
		// pageSize:'1',//显示的页数
		// page:'1',//默认从第一页开始
		// ajaxDataType:'json',//请求数据的类型
		pageSize:7,

	}
	var page = pagination;
	comment.isSending= 0 ;
	comment.init = function(config){
        var _this = this ;
        //获取配置参数
        _this.config = $.extend({},_this.config,config);
		_this.changeCommentType();
		//点击回复
		

	}
	comment.sendCommend = function(){
		var that = this;
		if(that.isSending){
			return false ;
		}
		that.isSending = 1;
		var data = {

		};
		$.ajax({
			url:'',//发送好评的数据
			dataType:'json',
			data:data,
		}).done(function(json){
			if(json.code != 0 ){
				that.dialog('评论失败',json.msg);
				return false;
			};

		})
	};
	
	comment.changeCommentType = function(){
		var that = this ;
		page.init({
			url:'http://localhost/json/json.txt',//ajax的请求
			pageSize:that.config.pageSize,//默认从第一页显示数量
			ajaxData:{
			},
			allowAlert:false,//是否允许弹出错误信息
			contentHtmlTmp:'<dl class="comment_list clearfix">\
                  <dt>\
                    <img src="https://image.vronline.com/newsimg/10046/368f8091d91b5f4677aa823be9d9c70c1490928481370.jpg" alt="茨木">\
                  </dt>\
                  <dd>\
                    <p>\
                      <span class="ploneRname">茨木</span>\
                      <span class="ploneTime"> ▪ 2017-03-31 09:39</span>\
                    </p>\
                    <p class="ploneRword">谢谢支持</p>\
                    <div>\
                      <div class="comment_area">\
                        <dl class="clearfix">\
                          <dt>\
                            <img src="https://image.vronline.com/newsimg/auto/68c9242b7fbd6c961221bc9a4316de94.png" alt="VRonline用户">\
                          </dt>\
                          <dd>\
                            <p>\
                              <span class="ploneRname">VRonline用户</span>\
                              <span class="ploneTime"> ▪ 2017-03-31 17:57</span>\
                            </p>\
                            <p class="ploneRword">作者写的真好</p>\
                          </dd>\
                        </dl>\
                      </div>\
                    </div>\
                    <div class="clearfix">\
                      <div class="ploneRt mt10"  class="reply_btn">\
                        <span class="ploneRtjpl">回复</span>\
                      </div>\
                    </div>\
                    <div class="plbothidetwo mt10" style="display:none;">\
                      <div class="pltwobot">\
                        <div class="ploneinput">\
                          <input type="hidden">\
                          <textarea class="plinput" placeholder="我有话要说......"></textarea>\
                          <input class="send plbuttonimg" type="button" value="提交">\
                        </div>\
                      </div>\
                    </div>\
                  </dd>\
                </dl>',
                ifEmptyHtml:'<div class="comment commMore1"><a href="javascript:;">没有更多评论了</a></div>',
                contentHtmlCon:'#comment_con',//生产html后存放的容器
                autoCreateHtml:true,
                getPageDataSuccess:function(){

                },
                handleData:function(){

                },
                debug:true
		})
	}
	window.Comment = comment;
})(jQuery)