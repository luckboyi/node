(function($){
    //定义函数名
    $.fn.tipsFn = function(options){
        //定义默认参数
        var defaults = {
            head:'提示信息',//头部提示信息
            icon:'warning_icon',//icon的类名
            msg:['当前游戏有最新版本！','请先更新至最新版本后再同步至其它客机电脑中！'],////信息
            btnTxt:['确定'],
            callback:'',//成功回调函数
        }
        var opts = $.extend(defaults,options);
        var base = this ;
        base.init = function(){
            var _this = this  ;
            var headmsg = opts.head;
            var icon = opts.icon;
            var msg = opts.msg;
            var btnTxt = opts.btnTxt;
            var callback = opts.callback;
            _this.creatHtml(headmsg,icon,msg,btnTxt);
            _this.btnFn(callback);
        };
        //创建html
        base.creatHtml = function(headmsg,icon,msg,btnTxt){
            var _this =this;
            var html = '<div class="tips_container">\
                            <div class="pa in_tips">\
                                <div class="header pr">\
                                    <h3 class="f18">'+headmsg+'</h3>\
                                    <i class="icon close_icon"></i>\
                                </div>\
                            <div class="body tac">\
                                <p class="icon_container"><i class="icon '+icon+'"></i></p>\
                                <div class="msg_con">'
                    for(var i = 0; i<msg.length ; i++){
                        html+='<p>'+msg[i]+'</p>'
                    };
            html+='</div>\
                            </div>\
                            <div class="foot tac">\
                                <ul class="clearfix btn_container">';
            for(var i = 0 ;i< btnTxt.length; i++){
                html += '<li class="fl">'+btnTxt[i]+'</li>';
            };
            html+='</ul>\
                            </div>\
                        </div>\
                </div>'
            $('body').prepend(html);
        };
        //点击事件
        base.btnFn = function(callback){
            var _this = this;
            //点击关闭
            $('body').on('click','.tips_container .close_icon',function(){
                //alert(1)
                _this.deleteFn();
            });
            //点击取消
            $('body').on('click','.tips_container .btn_container li',function(){
                //alert(1)
                if($(this).index() ==  0){
                    if( typeof callback == 'function'){
                        callback();
                    }
                };
                _this.deleteFn();
            });
        };
        //关闭弹窗
        base.deleteFn =function(){
            $('body').find('.tips_container').detach();
        }
        base.init();
    }
})(jQuery);