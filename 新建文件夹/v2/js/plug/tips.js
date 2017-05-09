(function($){
   var tipsFn ={};
   tipsFn.config ={
       model:'modify',//提示的信息 tips提示信息   modify 修改信息
       headerMsg:'提示',//头部提示信息
       pageHtmlContainer:'',//生成弹框的容器
       msg:'领取礼包成功',//提示的html信息
       msg2:'',//提示信息2
       btnState:0,//是否显示取消
       modifyMsg:'为了保证您的账号安全，修改手机前先进行安全验证',//
       phonemsg:'139******23',//显示当前手机号
       newphonenum:'',//更换的手机号
       errmsg:'次数过多，请稍后重试', //获取短息提示5次以上提示信息：‘次数过多，请稍后重试’
       modifymsg:'修改手机成功！',
       sucCallback:'', //成功回调函数
       erroCallback:'',//错误回调函数
       url:'',//ajax请求地址
   };
    tipsFn.init = function(config){
        var _this = this ;

        //获取配置参数
        _this.config = $.extend({},_this.config,config);
        _this.headMsg = _this.config.headerMsg;
        _this.msg = _this.config.msg;
        _this.msg2 =_this.config.msg2;
        _this.modifyMsg = _this.config.modifyMsg;
        _this.phonemsg =_this.config.phonemsg;
        _this.errmsg =_this.config.errmsg;
        //判断所属模块
        switch (_this.config.model){
            case 'tips': //提示信息模块
                if(!$('#open_tips').length >0){
                    _this.container();
                    _this.btnFn(_this.config.sucCallback,_this.config.erroCallback);
                    if(_this.config.headerMsg != '') _this.headerCon(_this.headMsg);
                    _this.content(_this.msg,_this.msg2);
                    if(_this.config.btnState != 0) $('.tips_btn').find('.cancel').hide();
                };
                break;
            case 'modify': //修改手机信息
                    _this.modifycontainer();
                    _this.btnFn(_this.config.sucCallback,_this.config.erroCallback);
                    if(_this.config.btnState != 0) $('.tips_btn').find('.cancel').hide();
                    _this.modifyCon(_this.modifyMsg,_this.phonemsg,_this.errmsg);
                break;
        }

    };
    //提示框的盒子
    tipsFn.container =function(){
        var containerHtml ='<div class="open_tips_window tac container" id="open_tips " style="position: fixed;z-index: 9999; width: 100%;height: 100%; left: 50%;top:50%; transform: translate(-50%,-50%);background: rgba(0,0,0,.5);">';
        containerHtml +='<div class="tips_con" style="padding: 12px; background:#1c202a; border: 1px solid #000; color: #828f9e;position: absolute;left: 50%;top:50%; transform: translate(-50%,-50%);"><div class="tips_header"></div><div class="tips_msg"  style="padding: 20px 100px; background: #151920;margin: 10px 0;"></div><div class="tips_btn" style="height: 24px;"><ul class="clearfix" style="display: inline-block; ">' +
            '<li class="fl sure tips_botton" style="cursor:default;margin:0 5px;line-height: 24px;width:80px;text-align: center; border: 1px solid #000; background:#384455 ;">确定</li>' +
            '<li class="fl cancel tips_botton" style="cursor:default;margin:0 5px;line-height: 24px;width: 80px;text-align: center; border: 1px solid #000; background:#384455 ;">取消</li></ul></div></div></div>';
        $('body').append(containerHtml);
    };
    //提示的头部
    tipsFn.headerCon =function(msg){
        var headerHtml = '<h3 style="line-height: 18px;font-size: 14px;" class="tal">'+msg+'</h3>';
        $('.tips_header').append(headerHtml);
    };
    //提示的内容
    tipsFn.content = function(msg,msg2){
        var content = '<p class="msg_name" data-name="tips"  style="min-width: 200px; line-height: 30px;">'+msg+'</p><p style="min-width: 160px; line-height: 30px;">'+msg2+'</p>';
        $('.tips_msg').append(content);
    };
    //修改的盒子
    tipsFn.modifycontainer = function(){
        var containerHtml ='<div  class="modify_container tac container" id="modify_container" style="position: fixed;z-index: 9999; width: 100%;height: 100%; left: 50%;top:50%; transform: translate(-50%,-50%);background: rgba(0,0,0,.5);">';
        containerHtml +='<div class="tips_con" style="padding: 12px; background:#1c202a; border: 1px solid #000; color: #828f9e;position: absolute;left: 50%;top:50%; transform: translate(-50%,-50%);"><div class="tips_header"></div><div class="tips_msg"   style="padding: 20px 100px; background: #151920;margin: 10px 0;"></div><div class="tips_btn" style="height: 24px;"><ul class="clearfix" style="display: inline-block; ">' +
            '<li class="fl sure tips_botton" style="cursor:default;margin:0 5px;line-height: 24px;width:80px;text-align: center; border: 1px solid #000; background:#384455 ;">确定</li>' +
            '<li class="fl cancel tips_botton" style="cursor:default;margin:0 5px;line-height: 24px;width: 80px;text-align: center; border: 1px solid #000; background:#384455 ;">取消</li></ul></div></div></div>';
        $('body').append(containerHtml);
    }
    //修改信息的内容
    tipsFn.modifyCon = function(modifyMsg,phonemsg,errmsg){
        var $this = this;
        var modifyHtml = '<p  class="msg_name" data-name="modify"  style="text-align:left;min-width: 200px; line-height: 30px;">'+modifyMsg+'</p><p style="text-align:left;min-width: 160px; line-height: 30px;margin: 10px 0;">当前手机号：'+phonemsg+'</p><p class="" style="text-align:left;min-width: 160px; line-height: 30px; ">短信验证码：' +
            '<input type="text" style="width: 102px;line-height: 30px;background: #212731;border: none;text-indent: 5px;color: #828f9e;margin-right: 8px;">' +
            '<input type="button" class="get_code tips_botton" style="line-height: 30px; background: #384355;display: inline-block;width: 90px;text-align: center; border: none; color:#828f9e; " value="获取验证码"></p>' +
            '<p style=" color: red; text-indent: -10px;line-height: 20px; margin-bottom: -8px;">'+errmsg+'</p>';
        $('.tips_msg').html('').append(modifyHtml);
        $('.get_code').on('click',function(){
            setTime($(this));
        })
    };
    //更改的内容
    tipsFn.newphonenum =function(phonemsg){
        var modifyHtml = '<p class="msg_name" data-name="modify_phone"  style="text-align:left;min-width: 200px; line-height: 30px;">当前手机：'+phonemsg+'</p>';
        modifyHtml+='<p style="margin:10px 0;text-align:left;min-width: 200px; line-height: 30px;">更换手机号：<input type="text" style="width: 200px;line-height: 30px;background: #212731;border: none;text-indent: 5px;color: #828f9e;margin-right: 8px;"></p><p class="" style="text-align:left;min-width: 160px; line-height: 30px; ">短信验证码：' +
            '<input type="text" style="width: 102px;line-height: 30px;background: #212731;border: none;text-indent: 5px;color: #828f9e;margin-right: 8px;">' +
            '<input type="button" class="get_code tips_botton" style="line-height: 30px; background: #384355;display: inline-block;width: 90px;text-align: center; border: none; color:#828f9e; " value="获取验证码"></p>';
        $('.tips_msg').html('').append(modifyHtml);
        $('.get_code').on('click',function(){
            setTime($(this));
        })
    };
    tipsFn.sucphoneNum =function(modifymsg){
        var _this = this;
        var suc = '<p class="msg_name" data-name="suc_modify"  style="min-width: 200px; line-height: 30px;">'+_this.config.modifymsg+'</p>';
        $('.tips_msg').html('').append(suc);
    },
    tipsFn.btnFn =function(sucCallback,erroCallback){
        var _this =this;
        $('body').on('click','.sure',function(){
            //判断是什么盒子
            var obj = $(this).parents('.container').find('.tips_msg p');
            var name =obj.data('name');
            switch (name){
                case 'tips':
                    if(typeof sucCallback != 'function'){
                        $(this).parents('.container').detach();
                    }else{
                        _this.config.sucCallback();
                        $(this).parents('.container').detach();
                    }
                    break;
                case 'modify':
                    //更换新手机号后点成功调用  /*------孙添加-----*/
                    _this.newphonenum(_this.config.phonemsg);
                    break;
                case 'modify_phone':
                    _this.sucphoneNum();
                    break;
                case 'suc_modify':
                    $(this).parents('.container').detach();
                    break;
            };
        });
        $('body').on('click','.cancel',function(){
            $(this).parents('.container').detach();
        })
    };
    window.tipsFn = tipsFn;
})(jQuery);
var countdown = 60;
function setTime(obj){
    //alert(1)
    if(countdown == 0){
        obj.removeAttr('disabled');
        obj.val('发送验证码');
        obj.css({'pointer-events':'auto','background':'#48576f','border-color':'#48576f'});
        countdown = 60;
        //clearTimeout(timer)
    }else{
        //val.attr('disabled',true);
        obj.attr('disabled','true');
        obj.css({'pointer-events':'none','background':'#384455','border-color':'#384455'});
        obj.val("重新发送("+countdown+")");
        countdown--;
        setTimeout(function(){
            setTime(obj)
        },1000);
    };
    //获取短信信息;
};
