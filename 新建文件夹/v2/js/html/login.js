//登录注册部分
/*验证码*/
function verificationData(data){
    $('.message_code input.verification').val(data.code);
}
//登录提示结构
function loginReminderHtml(val){
    $('.in_login_input ul li').detach();
    for(var i=0; i<val.phoneList.length;i++){
        html = '<li><b>'+val.phoneList[i]+'</b><i class="input_close"></i></li>';
        $('.in_login_input ul').append(html);
    }

}
//登录提示框数据
function loginReminderData(data){
    //添加显示上次手机号
    $('.in_login_input input[name="login_in_phoneNum"]').val(data.phoneNum);
    //动态添加提示
    $(data).each(function(key,val){
        loginReminderHtml(val);
    });
}
//登录成功或者失败
function successLoginData(data){
    if(data.state == 1){
        $('.login_enter_mask').hide();
		$('.comment_login').hide();
        $('body').find('.quickly_box').detach();
    }else{
        $('.login_enter_erro').show().text(data.txt);
		$('.comment_login').show();
        //点击登录
        $('.login_in_text').on('click',function(){
            $('.login_enter_mask ').show();
            $('.login_enter_erro').hide();
        });
        //点击注册
        $('.login_text').on('click',function(){
            $('.login_mask').show();
        })
    };
    leftListStatus();
}
//注册判断
function registerSucData(data){
    if(data.state == 1){
        $('.success_register').show();
        $('.login_mask').hide();
    }else{
        $('.erro_register').show();
    }
};
//账号注销
function user_logout(){
    $('.user').find('img').attr('src','image/touxiang.jpg');
    $('.user').find('.name ').text('');
    $('.user').find('.money ').text('').hide();
    leftListStatus();
}
//用户名数据
function userMsgData(data){
    $('.user img').attr('src',data.useImg);
    $('.user p.name').text(data.useName);
    $('.user').attr('u-id',data.uId);
    $('.user').attr('title','');
    leftListStatus();
}
//验证错误三次弹出
var userPhoneNum;
function erroThree(data){
    userPhoneNum = data.phoneNum;
    $('.verification_img img').attr('src','http://api.vronline.com/client/getimgcode??mobile='+userPhoneNum+'&' + Math.random());
    $('.verification_erro_msg').text('')
    $('.input_verification').val('');
    $('.verification_inCon').show();
}
//验证码验证
function checkVerification(data){
    if(data.state == 0){
        $('.verification_erro_msg').text(data.msg)
    }else{
        $('.verification_con').hide();
    }
}
//选择某个已登录用户
function selectUserDate(data){
    $('.in_login_input input').val(data.user_name);
    $('.login_enter_password input').val(data.password);
    if(data. keeploginstate== 1){
        $('.login_enter_sel .password i').addClass('selected');
    }else{
        $('.login_enter_sel .password i').removeClass('selected');
    };
}
//注册判断
function checkaccountres(data){
    if(data.rst == 0){
       $('#registerForm p').eq(0).find('span').addClass('error_msg');
        $('#registerForm p').eq(0).find('span').html(data.msg);
    };
}
/*注册登录*/
function loginInFn(){
    //注册失去焦点
    /*$('#registerForm input').each(function(){
        $(this).blur(function () {
            var errmsg = register_check(this);
            var valid = $(this).siblings(".Validform_checktip");
            if(errmsg !== ''){
                valid.addClass('error_msg').html(errmsg);
                $(this).css('border-color','#c83434');
            }else{
                valid.removeClass('error_msg').html('');
                $(this).css('border-color','#828f9e')
            }
            if($(this).hasClass('login_phoneNum')){
                var  json ={};
                json.account =$(this).val();
                window.CppCall('loginframe', 'checkaccount', JSON.stringify(json));
            }
        });
    });*/

    //当用户名错误的时候
    $('#registerForm input[name="phoneNumber"]').blur(function(){
        var errmsg = register_check(this);
        var valid = $(this).siblings(".Validform_checktip");
        if(errmsg !== ''){
            valid.addClass('error_msg').html(errmsg);
            $(this).css('border-color','#c83434');
            return;
        }else{
            valid.removeClass('error_msg').html('');
            $(this).css('border-color','#828f9e')
        };
        var  json ={};
        json.account =$(this).val();
        window.CppCall('loginframe', 'checkaccount', JSON.stringify(json));
    });
    //当密码错的时候
    $('#registerForm input[name="loginPassword"]').blur(function(){
        if($('#registerForm input[name="phoneNumber"]').siblings(".Validform_checktip").html()) return;
        var valid = $(this).siblings(".Validform_checktip");
        var errmsg = register_check(this);
        if(errmsg !== ''){
            valid.addClass('error_msg').html(errmsg);
            $(this).css('border-color','#c83434');
            return;
        }else{
            valid.removeClass('error_msg').html('');
            $(this).css('border-color','#828f9e')
        }
    });
    //当密码错的时候
    $('#registerForm input[name="checkLoginPassword"]').blur(function(){
        if($('#registerForm input[name="phoneNumber"]').siblings(".Validform_checktip").html() || $('#registerForm input[name="loginPassword"]').siblings(".Validform_checktip").html()) {
            return;
        };
        var valid = $(this).siblings(".Validform_checktip");
        var errmsg = register_check(this);
        if(errmsg !== ''){
            valid.addClass('error_msg').html(errmsg);
            $(this).css('border-color','#c83434');
            return;
        }else{
            valid.removeClass('error_msg').html('');
            $(this).css('border-color','#828f9e')
        }
    });
    //注册获取焦点的时候
    $('#registerForm input').each(function(){
        $(this).focus(function () {
            var valid = $(this).siblings(".Validform_checktip");
            valid.removeClass('error_msg').html('');
        });
    });
    //注册检测
    function register_check(e){
        var o =$(e);
        var value = $.trim(o.val());
        var errmsg = '';
        var name = o.attr('name');
        switch (name){
            case 'phoneNumber':
                if(value == ''){
                    errmsg ='不能为空';
                    break;
                }
                var rs = /^(13|14|15|17|18)[0-9]{9}$/;
                if(rs.test(value)){
                    errmsg = '不能使用手机号注册';
                    break;
                }
                var ns = /[\"\'<>``!@#$%^&*+-\/\/\/\\//?,.]/;
                var ks =/[^‘’'\s]+/;
                if(ns.exec(value) ){
                    errmsg = '不能包含特殊字符或非法字符';
                    break;
                }
                var ch = /[\u4E00-\u9FA5]/i;
                if(ch.test(value)){
                    errmsg = '不能使用中文注册';
                    break;
                }

                var a = value.length;
                if(a<6 || a>18){
                    errmsg = '账号长度只能6~18个字符'
                }
                break;
            case 'nickName':
                if (value == "") {
                    errmsg = "昵称不能为空";
                    break;
                }
                var rs=/^[a-zA-Z\u4E00-\u9FA50-9][a-zA-Z\u4E00-\u9FA50-9_]*$/;
                if (!rs.test(value)) {
                    errmsg="只允许中英文、数字、下划线，且不能以下划线开头"
                    break;
                }
                var a =value.length;
                if (value.match(/[^\x00-\xff]/ig) != null) {
                    var b = value.match(/[^\x00-\xff]/ig).length;
                    a = a + b * 2
                }
                if (a < 6 || a > 18) {
                    errmsg = "昵称长度只能6~18个字符";
                    break;
                }
                break;
            case 'loginPassword':
                if (value == "") {
                    errmsg = "密码不能为空";
                    break;
                }
                if (value.length<6 || value.length>16) {
                    errmsg ="输入6-16位密码";
                    break;
                }
                break;
            case 'checkLoginPassword':
                if(value == ''){
                    errmsg = '密码不能为空';
                    break;
                }
                if(value != $('.loginPassword').val()){
                    errmsg = '两次密码不同';
                    break;
                }
                break;
            case 'verifyCode':
                if (value == "") {
                    errmsg = "验证码不能为空" ;
                    break;
                }
        }
        return errmsg;
    };
    //登录失去焦点
    $('.in_login_enter_input input').each(function(){
        $(this).blur(function(){
            login_check($(this));
        });
    });

    //登录检测
    function login_check(obj){
        var name = obj.attr('name');
        var value = obj.val();
        if(name == 'login_in_phoneNum'){
            if (typeof (value) == 'undefined' || value == "") {
                $('.login_enter_erro').show().html('账号不能为空').addClass('error_msg');
                return '账号不能为空';
            }else{
                $('.login_enter_erro').hide().html('').removeClass('error_msg');
            }
        };
        if(name == 'login_in_password'){
            if (typeof (value) == 'undefined' || value == "") {
                obj.addClass('bdcol-red');
                $('.login_enter_erro').show().html('密码不能为空').addClass('error_msg');
                return '密码不能为空';
            }else{
                $('.login_enter_erro').hide().html('').removeClass('error_msg');
            }
        };
    }
    /*账号注册*/
    /*账号注册*/
    //点击关闭
    $('.login_close ').on('click',function(){
        $('.mask ').hide();
    });
    //点击登录关闭
    $('.login__enter_close').on('click',function(){
        $('.login_enter_mask').hide();
    });
    //点击发送验证码
    //倒计时
    var countdown = 60 ;
    var timer;
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
        }
    }
    $('#send_btn').click(function(){
        //获取电话号码
        //clearTimeout(time);
        var phoneNum = $('.retrieve_pas  input[name="phoneNumber"]').val();
        if(phoneNum != ''){
            setTime($(this));
        }
        //$(this).value="免费获取验证码";
        window.CppCall('loginframe', 'req_smscode', phoneNum);

    });
    //
    /*验证码*/
    //点击关闭
    $('.verification_close ').on('click',function(){
        $('.verification_con').hide();
    })
    //点击取消
    $('.verification_cancel').on('click',function(){
        $('.verification_con').hide();
    })
    //点击确定
    $('.verification_sure ').on('click',function(){
        var verificationNum = $('.verification_body input').val();
        window.CppCall('loginframe', 'verify_res', verificationNum);
    });
    //点击刷新
    $('.verification_img').on('click',function(){
        //console.dir(userPhoneNum);
        $('.verification_img img').attr('src','http://api.vronline.com/client/getimgcode??mobile='+userPhoneNum+'&' + Math.random());
    });
    //点击手机下拉
    //点击手机下拉
    $('.pull-down').on('click',function(){
        $('.in_login_input ul').toggle();
        $(this).toggleClass('selected')
    });
    $('.in_login_input').hover(function(){

    },function(){
        $('.in_login_input ul').hide();
        $('.pull-down').removeClass('selected')
    });
    //获取下来菜单的账号信息
    $('.in_login_input ul').on('click','li',function(){
        var phoneNum = $(this).find('b').text();
        $('.in_login_input ul').hide();
        $('.pull-down').removeClass('selected');
        window.CppCall('loginframe', 'select_item', phoneNum);
    });
    //点击关闭提示
    $('.input_close').on('click',function(){
        $(this).parent('li').detach();
    });
    //点击登录
    $('.login_enter_btn').on('click',function(){
        loginFn();
    });
    function loginFn(){
        var login_in = {
            'account':'',
            'pwd':'',
            'keeploginstate':''
        }
        //获取电话号码
        login_in.account = $('.in_login_input input').val();
        //获取密码
        login_in.pwd =$('.login_enter_password input').val();
        //是否记住密码
        if($('.password i').hasClass('selected')){
            login_in.keeploginstate = 1;
        }else{
            login_in.keeploginstate = 0;
        }
        //console.dir(login_in);
        //调用数据
        window.CppCall('loginframe', 'login',JSON.stringify(login_in));
    }
    //按enter键
    $(window).on('keydown',function(e){
        if(e.which == 13){
            //调用数据
            loginFn();
        }
    });


    /*第三方登录*/
    //快捷登录
    $('.other_enter').on('click','span',function(){
        $('.login_enter_mask').hide();
        if($(this).hasClass('qq_enter')){
            //var html ='<iframe src="http://passport.vronline.com/auth/qq" frameborder="0" height="100%" width="100%" style="background: #191f2d"></iframe>'
            /*$('body').append(html);*/
            window.CppCall('loginframe', 'qqlogin', 'http://passport.vronline.com/auth/qq?url=vr_windows');
        }else if($(this).hasClass('wx_enter')){
            window.CppCall('loginframe', 'wxlogin', 'http://passport.vronline.com/auth/wx?url=vr_windows');
        }else{
            window.CppCall('loginframe', 'wblogin', 'http://passport.vronline.com/auth/weibo?url=vr_windows');
        }
    });
    //点击关闭按钮
    $('body').on('click','#quick_enter_btn',function(){
        $('.login_enter_mask').show();
        $('.login_enter_erro').hide();
        $(this).parents('.quickly_box').hide();
    })
    //点击记住密码
    $('.password').on('click',function(){
        $(this).find('i').toggleClass('selected');
    });
    //点击自动登录
    $('.automatic').on('click',function(){
        $(this).find('i').toggleClass('selected');
    });
    //点击勾选协议
    $('.login_sel ').on('click',function(){
        $(this).toggleClass('selected');
    });
    //点击注册
    $('.in_registering').on('click',function(){

        for(var i = 0 ;i < 7; i++){
            $('#registerForm p').eq(i).find('input').val('');
            $('#registerForm p').eq(i).find('span').removeClass('error_msg');
            $('#registerForm p').eq(i).find('span').text('');
            $('#registerForm p').eq(i).find('input').css({
                'border-color':'#828f9e'
            })
        }
        $('#registerForm p').find('.send_btn ').val('发送验证码')
        $('.login_mask').show();
        $('.login_enter_mask').hide();
        $('#login_phoneNum').focus();
        $('#verify_drag').drag();
    });
    /*点击找回密码*/
    $('.find_pas').on('click',function(){
        //跳转网页
        var json = {
            url:'http://www.vronline.com/forgetpwd'
        };
        window.CppCall('common', 'openurl', JSON.stringify(json));
    })
    //新加的事件
    //点击注册 弹出注册完成
    $('.login .register').on('click',function(){
        if(!$('#registerForm').find('.Validform_checktip ').hasClass('error_msg')){
            registerFn();
        }
    });
    function registerFn(){
        var register_msg ={
            'account':121,
            'pwd':''
        };
        //获取数据
        register_msg.account = $('#registerForm input[name="phoneNumber"]').val();
        //register_msg.useName = $('#registerForm input[name="nickName"]').val();
        register_msg.pwd = $('#registerForm input[name="loginPassword"]').val();
        //register_msg.identifying = $('#registerForm input[name="verifyCode"]').val();
        if(!$('.login_agreement i.login_sel').hasClass('selected')){
            alert('请认真阅读相关协议，并勾选');
        }
        window.CppCall('loginframe', 'register',JSON.stringify(register_msg));
    }
    //按enter键
    $(window).on('keydown',function(e){
        if(e.which == 13){
            //调用数据
            registerFn();
        }
    })
    //点击注册完成隐藏弹框
    $('.success_register_btn').on('click',function(){
        //注册接收数据
        $('.success_register').hide();
        $('.erro_register ').hide();
    });
    //点击关闭
    $('.success_register_btn .verification_close').on('click',function(){
        //注册接收数据
        $('.success_register').hide();
    });
    //滑动验证插件
    (function($){
        $.fn.drag = function(options){
            var x, drag = this, isMove = false, defaults = {
            };
            var options = $.extend(defaults, options);
            //添加背景，文字，滑块
            var html = '<div class="drag_bg"></div>'+
                '<div class="drag_text" onselectstart="return false;" unselectable="on">拖动滑块验证</div>'+
                '<div class="handler handler_bg"></div>';
            this.append(html);

            var handler = drag.find('.handler');
            var drag_bg = drag.find('.drag_bg');
            var text = drag.find('.drag_text');
            var maxWidth = drag.width() - handler.width();  //能滑动的最大间距

            //鼠标按下时候的x轴的位置
            handler.mousedown(function(e){
                isMove = true;
                x = e.pageX - parseInt(handler.css('left'), 10);
            });

            //鼠标指针在上下文移动时，移动距离大于0小于最大间距，滑块x轴位置等于鼠标移动距离
            $(document).mousemove(function(e){
                var _x = e.pageX - x;
                if(isMove){
                    if(_x > 0 && _x <= maxWidth){
                        handler.css({'left': _x});
                        drag_bg.css({'width': _x});
                    }else if(_x > maxWidth){  //鼠标指针移动距离达到最大时清空事件
                        dragOk();
                    }
                }
            }).mouseup(function(e){
                isMove = false;
                var _x = e.pageX - x;
                if(_x < maxWidth){ //鼠标松开时，如果没有达到最大距离位置，滑块就返回初始位置
                    handler.css({'left': 0});
                    drag_bg.css({'width': 0});
                }
            });

            //清空事件
            function dragOk(){
                handler.removeClass('handler_bg').addClass('handler_ok_bg');
                text.text('验证通过');
                drag.css({'color': '#fff'});
                handler.unbind('mousedown');
                $(document).unbind('mousemove');
                $(document).unbind('mouseup');
                setTimeout(function(){
                    $('#verify_drag').hide();
                    $('.message_code').show();
                },300)

            }
        };
    })(jQuery);

    //切换按键tab
    function keyDown(event){
        var focus = document.activeElement;
        var event = window.event || event ;
        var key = event.keyCode;
        var inputs = $('.in_login_enter_input').find('input');
        for(var i=0; i<inputs.length ; i++){
            if(inputs[i] === focus) break;
        };
        switch(key){
            case 38:
                if(i>0) inputs[i-1].focus();
                break;
            case 40:
                if(i<inputs.length-1) inputs[i+1].focus();
                break;

        }
    }
    $('.in_login_enter_input').on('keydown',function(event){
        keyDown(event);
    })

    //点击密码找回下一部分
    $('.retrieve_pas .register').on('click',function(){
        $('.retrieve_pas').hide();
        $('.pas_again').show();
    });
    //点击重输密码确定
    $('.pas_again .register').on('click',function(){
        $('.pas_again').hide();
        $('.success_pas_set').show()
    })
    //点击完成
    $('.success_pas_set .success_register_btn').on('click',function(){
        $('.success_pas_set').hide();
    })

}
function showLogin(){
    $('.login_enter_erro').hide();
    $('.login_enter_mask').show();
};
//修改头像、昵称
function update_usermsg(data){
    if(data.nick != ''){
        $('.user').find('.name').text(data.nick);
    }else if(data.img != ''){
        $('.user').find('img').attr(src,data.img);
    };
};


function login_enterFn(){
    //未登录
    $('.login_enter_erro ').text('');
    $('.login_enter_mask').show();
    $('.login_enter_erro').hide();
    $('#login_in_phoneNum').focus();
    window.CppCall('loginframe', 'prelogin', '');
    leftListStatus();
}