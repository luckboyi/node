(function($){
    //定义函数名
    $.fn.tipsFn = function(options){
        //定义默认参数
        var defaults = {
            head:'提示信息',//头部提示信息
            icon:'',//icon的类名
            loading:false,//
            msg:['当前游戏有最新版本！','请先更新至最新版本后再同步至其它客机电脑中！'],////信息
            buttons:'',
            callback:'',//成功回调函数
        }
        var opts = $.extend(defaults,options);
        var base = this ;
        base.init = function(){

            var _this = this  ;
            var headmsg = opts.head;
            var icon = opts.icon;
            var msg = opts.msg;
            var buttons = opts.buttons;
            var callback = opts.callback;
            var loading = opts.loading;
            //清空
            if($('body').find('#tips_container')){
                _this.deleteFn();
            }
            _this.creatHtml(loading,headmsg,icon,msg,buttons);
            _this.btnFn();
        };
        //创建html
        base.creatHtml = function(loading,headmsg,icon,msg,buttons){
            var _this =this;
            var html = '<div class="tips_container" id="tips_container">\
                            <div class="pa in_tips">\
                                <div class="tips_header pr">\
                                    <h3 class="f18">'+headmsg+'</h3>\
                                    <i class=" close_btn hide"></i>\
                                </div>\
                            <div class="body tac">';
                    if(icon === false){
                        html+=' <p class="icon_container pr"><i class="icon err_icon"></i></p>';
                    }else if(icon === true){
                        html+=' <p class="icon_container"><i class="icon success_icon"></i></p>';
                    }
                    html+='<div class="msg_con">';
                    if(loading == true){
                            html+='<img src="./image/loading.gif">';
                    }
                    if(typeof msg  =='object' ){
                        for(var i = 0; i<msg.length ; i++){
                        html+='<p>'+msg[i]+'</p>'
                        };
                    }else{
                        html+='<p>'+msg+'</p>'
                    }             
                    
            html+='</div>\
                            </div>\
                            <div class="foot tac">\
                                <ul class="clearfix btn_container">';
            if(typeof buttons == 'object'){
                for(var i = 0 ;i< buttons.length; i++){
                html += '<li class="fl" onclick="clickFn('+ "'" +buttons[i].callback+"'"+')">'+buttons[i].btnTxt+'</li>';
                };
            }else if(buttons != ''){
                html += '<li class="fl">'+buttons.btnTxt+'</li>';
            }else{
                html+='';
            }
            html+='</ul>\
                            </div>\
                        </div>\
                </div>'
            $('body').prepend(html);
        };
       
        base.btnFn = function(){
            var _this = this;
            //点击关闭
            $('body').on('click','.tips_container .close_icon',function(){
                //alert(1)
                _this.deleteFn();
            });
            //点击取消
            $('body').on('click','.tips_container .btn_container li',function(){
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


//点击事件
function clickFn(callback){
    if(callback != ''){
        window.CppCall('mainframe',callback,'');
    }
}