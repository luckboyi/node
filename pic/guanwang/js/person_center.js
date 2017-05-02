$(function(){
        //hover-tip
        $('.user_con .icon i').hover(function() {
            $(this).parents('.icon').find('p').show()
        }, function() {
            $(this).parents('.icon').find('p').hide()
        });

        //点击左侧进入
        $('.personal_center .left_per ul').on('click','li.pr',function(){
            var i = $(this).index();
            $(this).addClass('cur').siblings().removeClass('cur');
            $('.right_per li.list_con').eq(i).addClass('cur').siblings().removeClass('cur');

        });
        //点击充值
        $('.personal_center .left_per ul').on('click','li.charge',function(){
            $(this).find('ol').toggle();
            $(this).find('i').toggleClass('cur')
        })
        //点击支付列表
        $('.personal_center .left_per  ol').on('click','li',function(){
            $(this).parents('ol').show();
        });

        //点击充值中心 下拉
        $('.personal_center .left_per li.charge i').on('click',function(){
           $(this).toggleClass('cur');
            $(this).hasClass('cur') ? $(this).parents('li.charge').find('ol').show():$(this).parents('li.charge').find('ol').hide();
        });
        //点击充值v点或者页游
        $('.paymentCenter  .pay_sel_btn').on('click','span',function(){
           $(this).addClass('cur').siblings().removeClass('cur');
            $('.paymentCenter .pageGame_sel').toggle();
        });

        //点击修改头像显示
        $('.user_header p.img_con').on('click',function(){
            $('.modify_box').show()
        });
        //点击绑定手机号弹窗
        $('.phone_btn').on('click',function(){
            $('#mobileDiv').show()
        });

        // 点击解绑手机号弹框
        $('.unbind_btn').on('click',function(){

            // 显示手机号
            $("#labMobile").text($("#bindMobile").text());

            $('#unBindMobileDiv').show();
        });

        //修改绑定
        $('#modify_phone').on('click',function() {
            var phonemsg = $("#bindMobile").text();
            tipsFn.init({
                model:'modify',
                phonemsg:phonemsg,
                errmsg:'',
            })
        });

        //修改密码
        $('.revamp_paw_btn').on('click',function(){
            $('.revamp_password').show()
        });

        // 修改密码点击确定
        $("#btnModifyOK").click( function () { 
            
            // 在这里判断，绑定账号和密码输入密码是否合法
            var flag1 = parseInt($("#pwdMsg1").attr('flag'));
            var flag2 = parseInt($("#pwdMsg2").attr('flag'));
            var flag3 = parseInt($("#pwdMsg3").attr('flag'));

            if (flag1 || flag2 || flag3) {
                return false;
            }else{
                // 开始向控制器发送请求修改密码
                var oldPwd = $("#oldPwd").val();
                var newPwd = $("#newPwd").val();
                var newPwdConfirm = $("#newPwdConfirm").val();
                if (oldPwd == newPwd) {
                    $("#pwdMsg2").text('新密码不能是以前的密码');
                    $("#pwdMsg2").attr('flag',1);
                    return false;
                }else if(oldPwd == newPwdConfirm){
                    return false;
                }else if(newPwd != newPwdConfirm){
                    return false;
                }else{
                    $.ajax({
                    type: 'get',
                    url: '/web/modifyPwd',
                    data: { oldPwd : oldPwd, newPwd : newPwd, confirPwd : newPwdConfirm},
                    dataType: 'json',
                    headers: {  // header属性，是为了避免跨站伪造请求攻击写的
                    'X-CSRF-TOKEN': $('meta[name="_token"]').attr('content')
                    },
                    success: function(data){
                        if (data.status == 1) {
                            // 重置文本框中的值
                            $("#oldPwd").val('');
                            $("#newPwd").val('');
                            $("#newPwdConfirm").val('');

                            // 修改密码成功后
                            tipsFn.init({
                                model:'tips',
                                headerMsg:'修改成功',
                                msg:'修改密码成功!',
                                msg2:'',btnState:1,
                                sucCallback:'' 
                            });


                            $('.revamp_password ').hide()

                        }else{
                            tipsFn.init({
                                model:'tips',
                                headerMsg:'修改失败',
                                msg:data.msg,
                                msg2:'',btnState:1,
                                sucCallback:'' 
                            });
                            return;
                        }
                    },
                    error: function(xhr, type){
                    }
                    });
                }


                
            }


            

        });

        //点击取消
        $('.cancel').on('click',function(){
            $(this).parents('.mask_layer').hide();

            /*var imgDate = {};
            imgDate.w = $('.wl').find('#small').width();
            imgDate.h = $('.wl').find('#small').height();
            imgDate.l = $('.wl').find('#small').position().left;
            imgDate.t = $('.wl').find('#small').position().top;*/
            //console.dir(imgDate);
        });
        //点击保存

        //点击绑定成功确定或者取消关闭
        $('.bind_phoneNum .popup_btn').on('click','li',function(){
            if($(this).hasClass('sure')){
                // 这里向controller 控制发起请求绑定手机号码逻辑
                var txtMobile = $("#txtMobile").val();  // 手机号码
                var flag = validateMobile(txtMobile);
                if (!flag) {
                    return false;
                };

                var verNumber = $("#verNumber").val();  // 验证码

                if (verNumber.length == 0) {
                    tipsFn.init({
                        model:'tips',
                        headerMsg:'验证码',
                        msg:'验证码不能为空',
                        msg2:'',
                        btnState:1,
                        sucCallback:''
                    });
                    $("#verNumber").focus();
                    return;
                };

                $.ajax({
                type: 'get',
                url: '/web/bindMobile',
                data: { mobile : txtMobile, code : verNumber},
                dataType: 'json',
                headers: {  // header属性，是为了避免跨站伪造请求攻击写的
                'X-CSRF-TOKEN': $('meta[name="_token"]').attr('content')
                },
                success: function(data){
                    if (data.status == 1) {
                        // 手机号码绑定成功
                        $("#bindMobile").attr('for',txtMobile);
                        $("#bindMobile").html(txtMobile.substring(0,3)+"****"+txtMobile.substring(7,11));
                        //$("#bindMobile").text(txtMobile);  // 显示绑定的手机号码
                        $("#btnBindMobile").hide();        // 绑定手机号 按钮不可见

                        // 解绑按钮可见
                        $("#mobileAction").show();

                        // 提示绑定手机信息不可见
                        $("#signMobile").hide();
                        
                        // 将绑定手机和验证码框置为0
                        $("#txtMobile").val('');
                        $("#verNumber").val('');


                        // 隐藏发送手机验证码的div
                        $("#mobileDiv").hide();

                        // 显示手机绑定成功的div
                        $("#bindMobileOk").show();

                    }else{
                        tipsFn.init({
                            model:'tips',
                            headerMsg:'验证码',
                            msg:'验证码不正确',
                            msg2:'',
                            btnState:1,
                            sucCallback:''
                        });
                        $("#verNumber").focus();
                        return;
                    }
                },
                error: function(xhr, type){
                }
                });
            }
        });
        //点击绑定成功确定按钮
        $('.success_popup_window .sure').on('click',function(){
            $(this).parents('.success_popup_window').hide()
        });

        // 点击解绑手机号，确认按钮
        $("#unbindPhone").click( function () { 
            // 这里向controller 控制发起请求绑定手机号码逻辑
            var labMobile = $("#labMobile").text();  // 手机号码

            var unVerNumber = $("#unVerNumber").val();  // 验证码

            if (unVerNumber.length == 0) {
                tipsFn.init({
                    model:'tips',
                    headerMsg:'验证码',
                    msg:'验证码不能为空',
                    msg2:'',
                    btnState:1,
                    sucCallback:''
                });
                $("#unVerNumber").focus();
                return;
            };

            var mobile = $("#bindMobile").attr("for");//$("#bindMobile").text();
            $.ajax({
            url:'web/unbindMobile',
            async:true,
            type:'GET',
            dataType:'json',
            data:{mobile : mobile,verNumber : unVerNumber},
            headers: {  // header属性，是为了避免跨站伪造请求攻击写的
                'X-CSRF-TOKEN': $('meta[name="_token"]').attr('content')
            },
            success: function(data){
                if(data.status == 1){
                    // 如果解绑成功，隐藏解绑弹出框
                    $("#unBindMobileDiv").hide();

                    $("#mobileAction").hide();
                    $("#btnBindMobile").show();

                    // 重置验证码
                    $("#unVerNumber").val('');

                    $("#bindmobile").attr('for','');
                    // 解绑
                    $("#bindMobile").text('你的账户未绑定手机');

                    // 提示绑定手机信息可见
                    $("#signMobile").show();
                    //$("#signMobile2").show();

                    tipsFn.init({
                        model:'tips',
                        msg:'解绑手机号成功！',
                        msg2:'',
                        btnState:1,
                        sucCallback:function(){
                            // 刷新当前页
                            window.location.href = window.location.href
                        }
                    });         
                }else{
                    tipsFn.init({
                        model:'tips',
                        headerMsg:'验证码',
                        msg:'验证码不正确',
                        msg2:'',
                        btnState:1,
                        sucCallback:''
                    });
                $("#unVerNumber").focus();
/*                return;*/
            }
        }
    })         
    });

        //修改平台账号
        $('.revamp_btn').on('click',function(){
            $('.revamp_account').show()
        });
        //点击修改
        $('.revamp_account .sure').on('click',function(){

            // 在这里判断，绑定账号和密码输入密码是否合法
            var flag1 = parseInt($("#openLbl1").attr('flag'));
            var flag2 = parseInt($("#openLbl2").attr('flag'));
            var flag3 = parseInt($("#openLbl3").attr('flag'));

            if (flag1 == 1) {  // 账户不合法
                $("#openAccount").focus();
                return;
            };
            if (flag2 == 1) {
                $("#openPwd").focus();
                return;
            };
            if (flag3 == 1) {
                $("#openPwdConfirm").focus();
                return;
            };

            $('.revamp_account').hide();
            $('.sure_revamp_account').show()
        });
        //点击确定
        $('.sure_revamp_account .sure').on('click',function(){
            $('.sure_revamp_account').hide();
            // 这里开始绑定账号
            var account = $("#openAccount").val();
            var pwd = $("#openPwd").val();
            var confirPwd = $("#openPwdConfirm").val();

            $.ajax({
            type: 'get',
            url: '/web/bindAccount',
            data: { name : account, pwd : pwd, confirPwd : confirPwd},
            dataType: 'json',
            headers: {  // header属性，是为了避免跨站伪造请求攻击写的
            'X-CSRF-TOKEN': $('meta[name="_token"]').attr('content')
            },
            success: function(data){
                if (data.status == 1) {

                    // 账号绑定成功后，需要给账户名，以及绑定账号旁边的按钮不可见
                    //$("#title").text(account);
                    $("#accountName").text(account);
                    $("#openBtn").hide();
                    $(".modify_error").hide();
                    $("#btnModity").hide();
                    // 绑定账号成功后，修改密码可点
                    $("#btnModity").removeClass('disabled');


                }else{
                    tipsFn.init({
                        model:'tips',
                        headerMsg:'账号绑定',
                        msg:data.msg,
                        msg2:'',btnState:1,
                        sucCallback:'' 
                    });
                    return;
                }
            },
            error: function(xhr, type){
            }
            });

        });
    
        // 点击确认绑定账号，弹出框返回就关闭确认框，回到上一个绑定账号框
        $("#accountBack").click( function () { 
            $(".sure_revamp_account").hide();  // 隐藏
            $(".revamp_account").show();
        });

        //充值中心
        $('.other_pay_num i').hover(function(){
            $('.pay_num_tips').show();
        },function(){
            $('.pay_num_tips').hide();
        });
        //选择充值金额
        $('.payment_num span').on('click',function(){
            $(this).addClass('cur').siblings().removeClass('cur');
            var num = $(this).text();
            var i = num.substring(1,num.length);
            if($('.pay_sel_btn span').eq(0).hasClass('cur')){
                if(i > $('.select_right  .balance_num').text()){
                    $('.payment_tips').show();
                    $('.select_right .pay_now').addClass('disabled');
                }else{
                    $('.payment_tips').hide();
                    $('.select_right .pay_now').removeClass('disabled');
                }
            }

            $('.other_pay_num input').val(i);
            $('.select_right .pay_num').text(i);
        });
        //判断输入是否为整数；
        function checkRate(input){
            var re = /^(\+|-)?\d+$/;
            if(re.test(input) && input > 0){
                $('.erro_tips').hide();
                return true;
            }else{
                $('.erro_tips').show();
            }
        };
        //失去焦点
        $('.other_pay_num input').blur(function(){
            var num = $('.other_pay_num input').val();
            $('.payment_num').find('span').each(function(key){
                $(this).removeClass('cur')
            });
            if(num != ''){
                checkRate(num);
            }else{
                $('.payment_num').find('span').each(function(key){
                    if($(this).eq(key).hasClass('cur')){
                        var n = $(this).eq(key).text();
                        num = n.substring(1,n.length) ;
                        $('.other_pay_num input').val(num);
                    }
                });
            };
            $('.select_right .pay_num').text(num);
            //v支付几个点
            //判断当前余额与充值金额    有问题
            if(num > $('.select_right  span.balance_num').text()){

            }
        });
        //点击确定
        $('.payment_btn').on('click',function(){
            var num = $('.other_pay_num input').val();

        });
        //选择充值方式
        $('.payment_select ul li').on('click',function(){
            $(this).addClass('cur').siblings().removeClass('cur');
            if($(this).hasClass('vt_pay')){
                $('.vr_pay_con').show();
                $('.zhi_pay_con').hide();
            }else{
                $('.vr_pay_con').hide();
                $('.zhi_pay_con').show();
            }
        });
    })


    var GetLength = function (str) {
        ///<summary>获得字符串实际长度，中文2，英文1</summary>
        ///<param name="str">要获得长度的字符串</param>
        var realLength = 0, len = str.length, charCode = -1;
        for (var i = 0; i < len; i++) {
            charCode = str.charCodeAt(i);
            if (charCode >= 0 && charCode <= 128) realLength += 1;
            else realLength += 2;
        }
        return realLength;
    };


    //js截取字符串，中英文都能用  
    //如果给定的字符串大于指定长度，截取指定长度返回，否者返回源字符串。  
    //字符串，长度  

    /** 
     * js截取字符串，中英文都能用 
     * @param str：需要截取的字符串 
     * @param len: 需要截取的长度 
     */
    function cutstr(str, len) {
        var str_length = 0;
        var str_len = 0;
        str_cut = new String();
        str_len = str.length;
        for (var i = 0; i < str_len; i++) {
            a = str.charAt(i);
            str_length++;
            if (escape(a).length > 4) {
                //中文字符的长度经编码之后大于4  
                str_length++;
            }
            str_cut = str_cut.concat(a);
            if (str_length >= len) {
                str_cut = str_cut.concat("");
                return str_cut;
            }
        }
        //如果给定字符串小于指定长度，则返回源字符串；  
        if (str_length < len) {
            return str;
        }
    }

    $(document).ready(function(){

        $("#nick").bind('keyup', function () {
          if (GetLength($(this).val()) > 12) { 
           $(this).val(cutstr($(this).val(), 12)); 
           return; 
         } 
      });
        // 输入平台账号，失去焦点事件
        $("#openAccount").blur(function(){  // 失去焦点

            var account = $("#openAccount").val();
            if (account.length == 0) {
                $("#openLbl1").text('平台账号不能为空');
                $("#openLbl1").attr('flag',1);
                $("#openAccount").focus();
                return;
            }
            if (account.length < 6) {
                $("#openLbl1").text('平台账号不合法');
                $("#openLbl1").attr('flag',1);
                $("#openAccount").focus();
                return;
            }

            // 判断是否账户可用
            $.ajax({
            type: 'get',
            url: '/web/isExistAcc',
            data: { name : account},
            dataType: 'json',
            headers: {  // header属性，是为了避免跨站伪造请求攻击写的
            'X-CSRF-TOKEN': $('meta[name="_token"]').attr('content')
            },
            success: function(data){
                if (data.status == 1) {
                    // 表示账号可用
                    $("#openLbl1").text('');
                    $("#openLbl1").attr('flag',0);
                }else{
                    $("#openLbl1").text('平台账户已被注册');
                    $("#openLbl1").attr('flag',1);
                    $("#openAccount").focus();
                    return;
                }
            },
            error: function(xhr, type){
            }
            });
        });

        // 绑定账号密码1
        $("#openPwd").blur(function(){

            var pwd = $("#openPwd").val();
            if($("#openLbl1").attr('flag') == 1) {
                $("#openAccount").focus();
                return;
            }
            if (pwd.length == 0) {
                $("#openLbl2").text('密码不能为空');
                $("#openLbl2").attr('flag',1);
                $("#openPwd").focus();
                return;
            }
            if (pwd.length < 6) {
                $("#openLbl2").text('密码不合法');
                $("#openLbl2").attr('flag',1);
                $("#openPwd").focus();
                return;
            }
            $("#openLbl2").text('');
            $("#openLbl2").attr('flag',0);
            var pwdConfirm = $("#openPwdConfirm").val();
            // 如果确认密码不为空，则判断下两次密码是否一致

            if (pwdConfirm.length > 5) {
                if (pwd !== pwdConfirm) {
                    $("#openLbl2").text('密码和确认密码不一致');
                    $("#openLbl2").attr('flag',1);
                    return;
                };
                $("#openLbl3").text('');
                $("#openLbl3").attr('flag',0);
            };

        });

        // 绑定账号密码2
        $("#openPwdConfirm").blur(function(){

            var pwdConfirm = $("#openPwdConfirm").val();

            if($("#openLbl1").attr('flag') == 1) {
                $("#openAccount").focus();
                return;
            }
            if($("#openLbl2").attr('flag') == 1) {
                $("#openAccount").focus();
                return;
            }
            if (pwdConfirm.length == 0) {
                $("#openLbl3").text('密码不能为空');
                $("#openLbl3").attr('flag',1);
                $("#openPwdConfirm").focus();
                return;
            }
            if (pwdConfirm.length < 6) {
                $("#openLbl3").text('密码不合法');
                $("#openLbl3").attr('flag',1);
                $("#openPwdConfirm").focus();
                return;
            }
            $("#openLbl3").text('');
            $("#openLbl3").attr('flag',0);
            var openPwd = $("#openPwd").val();
            // 如果确认密码不为空，则判断下两次密码是否一致

            if (openPwd.length > 5) {
                if (pwdConfirm !== openPwd) {
                    $("#openLbl3").text('密码和确认密码不一致');
                    $("#openLbl3").attr('flag',1);
                    return;
                };
                $("#openLbl2").text('');
                $("#openLbl2").attr('flag',0);
            };

        });

        // 手机号码离开文本框逻辑判断
        $("#txtMobile").blur(function(){

            var txtMobile = $("#txtMobile").val();
            validateMobile(txtMobile);
        });


        //发送手机验证码
        $("#setVetify").on("click",function(e){
            
            var txtMobile = $("#txtMobile").val();
            validateMobile(txtMobile);
            e.preventDefault();
            if($("#txtMobile").val() != ''){
                setTime($('#setVetify'));
            }
            var _this=$(this);
            time(_this);
        });

        // 解绑发送短信验证码
        $("#unSetVetify").on("click",function(e){
            
            /*var labMobile = $("#labMobile").text();*/
            var labMobile = $("#bindMobile").attr('for');
/*            validateMobile(txtMobile);*/
            e.preventDefault();
            if(labMobile != ''){
                setTime($('#unSetVetify'));
            }
            var _this=$(this);
            unTime(_this);
        });


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

        // 修改密码逻辑
        // 原密码失去焦点事件
        $("#oldPwd").blur(function(){

            var oldPwd = $("#oldPwd").val();
            if (oldPwd.length == 0) {
                $("#pwdMsg1").text('原密码不能为空');
                $("#pwdMsg1").attr('flag',1);
                /*$("#oldPwd").focus();*/
                return false;
            }
            if (oldPwd.length < 6) {
                $("#pwdMsg1").text('原密码不合法');
                $("#pwdMsg1").attr('flag',1);
                /*$("#oldPwd").focus();*/
                return false;
            }
            $("#pwdMsg1").text('');
            $("#pwdMsg1").attr('flag',0);
        });

        // 输入新密码
        $("#newPwd").blur(function(){

            var newPwd = $("#newPwd").val();
            if (newPwd.length == 0) {
                $("#pwdMsg2").text('新密码不能为空');
                $("#pwdMsg2").attr('flag',1);
                /*$("#newPwd").focus();*/
                return false;
            }
            if (newPwd.length < 6) {
                $("#pwdMsg2").text('新密码不合法');
                $("#pwdMsg2").attr('flag',1);
                /*$("#newPwd").focus();*/
                return false;
            }

            // 如果发现新密码和原密码相同，则提示
            var oldPwd = $("#oldPwd").val();
            if (oldPwd.length > 5 && oldPwd == newPwd) {
                $("#pwdMsg2").text('新密码不能是以前的密码');
                $("#pwdMsg2").attr('flag',1);
                /*$("#newPwd").focus();*/
                return false;
            }

            $("#pwdMsg2").text('');
            $("#pwdMsg2").attr('flag',0);
            var newPwdConfirm = $("#newPwdConfirm").val();

        });

        // 输入确认密码
        $("#newPwdConfirm").blur(function(){

            var newPwdConfirm = $("#newPwdConfirm").val();
            if (newPwdConfirm.length == 0) {
                $("#pwdMsg3").text('确认密码不能为空');
                $("#pwdMsg3").attr('flag',1);
                /*$("#newPwdConfirm").focus();*/
                return false;
            }
            if (newPwdConfirm.length < 6) {
                $("#pwdMsg3").text('确认密码不合法');
                $("#pwdMsg3").attr('flag',1);
                /*$("#newPwdConfirm").focus();*/
                return false;
            }
            $("#pwdMsg3").text('');
            $("#pwdMsg3").attr('flag',0);
            var newPwd = $("#newPwd").val();
            // 如果确认密码不为空，则判断下两次密码是否一致
            var oldPwd = $("#oldPwd").val();
            if (newPwd.length > 5) {
                if (newPwd !== newPwdConfirm) {
                    $("#pwdMsg3").text('新密码和确认密码不一致');
                    $("#pwdMsg3").attr('flag',1);
                    return false;
                }else if(oldPwd == newPwd){  // 如果老密码等于新密码
                    return false;
                }else{
                    $("#pwdMsg3").text('');
                    $("#pwdMsg3").attr('flag',0);
                    $("#pwdMsg2").text('');
                    $("#pwdMsg2").attr('flag',0);
                }
            };

        });

        //获取字符串长度（汉字算两个字符，字母数字算一个）
        function getByteLen(val) {
            var len = 0;
            for (var i = 0; i < val.length; i++) {
               var length = val.charCodeAt(i);
               if(length>=0&&length<=128)
                {
                    len += 1;
                }
                else
                {
                    len += 2;
                }
            }
            return len;
        }

        // 修改昵称
        $("#btnNick").click( function () {
            var nick = $("#nick").val();
            nick = $.trim(nick);

            if (nick.length == 0) {
                tipsFn.init({
                    model:'tips',
                    headerMsg:'修改昵称',
                    msg:'昵称不能为空',
                    msg2:'',
                    btnState:1,
                    sucCallback:''
                });
                $("#nick").focus();
                return false;
            };
            $.ajax({
            type: 'get',
            url: '/web/modifyNick',
            data: { nick : nick},
            dataType: 'json',
            headers: {  // header属性，是为了避免跨站伪造请求攻击写的
            'X-CSRF-TOKEN': $('meta[name="_token"]').attr('content')
            },
            success: function(data){
                if (data.status == 1) {  // 昵称修改成功
                    //console.log(JSON.stringify(data))
                    // 更新头部的昵称
                    $("#headNick").text(data.nickReal);
                    $("#title").text(data.nickReal);
                    // 公共的弹框
                    tipsFn.init({
                        model:'tips',
                        msg:'昵称更新成功',
                        msg2:'',btnState:1,
                        sucCallback:''
                    });
                    PL.callFun('loginframe','updateuserinfo',data.nick);                   
                }else{
                }
            },
            error: function(xhr, type){
            }
            });
        });
    })



    function get_length(s){
        var char_length = 0;
        for (var i = 0; i < s.length; i++){
            var son_char = s.charAt(i);
            encodeURI(son_char).length > 2 ? char_length += 1 : char_length += 0.5;
        }
        return char_length;
    }
    function cut_str(str, len){
        var char_length = 0;
        for (var i = 0; i < str.length; i++){
            var son_str = str.charAt(i);
            encodeURI(son_str).length > 2 ? char_length += 1 : char_length += 0.5;
            if (char_length >= len){
                var sub_len = char_length == len ? i+1 : i;
                return str.substr(0, sub_len);
                break;
            }
        }
    }

    function time(o) {
        var txtMobile = $("#txtMobile").val();
        //发送短信验证码
        $.ajax({
            type: 'get',
            url: '/web/sendMobileMsg',
            data: { mobile : txtMobile,action : ''},
            dataType: 'json',
            headers: {  // header属性，是为了避免跨站伪造请求攻击写的
            'X-CSRF-TOKEN': $('meta[name="_token"]').attr('content')
            },
            success: function(data){
                if (data.status == 1) {
                   // 验证码发送成功
                   // 短信验证码发送成功，就不能及时点击获取验证码
                   $("#setVetify").addClass('.disabled');
                   /*$("#showText").show();*/
                   $("#verNumber").attr("disabled",false);
                   $(o).css("color","#999").attr("onclick","");

                   // 发送成功，让文本框不能编辑
                   $("#txtMobile").attr('disabled','disabled');

                }else{
                    tipsFn.init({
                        model:'tips',
                        msg:data.msg,
                        msg2:'',
                        btnState:1,
                        sucCallback:'' 
                    });
                    
                }
            },
            error: function(xhr, type){
            }
        });
        //console.dir(o)
        
    }

    // 解绑手机号发送短信验证码
    function unTime(o) {
        /*timeMins(o);*/
        var labMobile = $("#bindMobile").attr('for');//$("#labMobile").text();
        //发送短信验证码
        $.ajax({
            type: 'get',
            url: '/web/sendMobileMsg',
            data: { mobile : labMobile,action : 'mobileChange'},
            dataType: 'json',
            headers: {  // header属性，是为了避免跨站伪造请求攻击写的
            'X-CSRF-TOKEN': $('meta[name="_token"]').attr('content')
            },
            success: function(data){
                if (data.status == 1) {
                   // 验证码发送成功
                   // 短信验证码发送成功，就不能及时点击获取验证码
                   $("#unSetVetify").addClass('.disabled');
                   /*$("#showText").show();*/
                   $("#unVerNumber").attr("disabled",false);
                   $(o).css("color","#999").attr("onclick","");

                }else{
                    tipsFn.init({
                        model:'tips',
                        msg:data.msg,
                        msg2:'',btnState:1,
                        sucCallback:'' 
                    });
                    
                }
            },
            error: function(xhr, type){
            }
        });
        //console.dir(o)
    
    }

    //时间倒计时
    var wait=60,timeOut;
    function timeMins(o) {
        if (wait == 0) {
            // 发送短信验证码可点

            $("#showText").hide();
            $(o).html("获取验证码").css("color","#005ea7").attr("onclick","time(this)");
             clearTimeout(timeOut);
             wait = 60;
        } else {
            // 发送短信验证码不可点

            wait--;
            timeOut=setTimeout(function(){
                    timeMins(o);
            },1000);
            $("#showTime").html(wait+"s");
        }
    }

    // 验证手机号码是否合法
    function validateMobile(mobile){
        if(mobile.length==0) {
                $("#mobileFlag").text('手机号码不能为空');
                $("#txtMobile").focus();
                return false;
            }
            if(mobile.length!=11) {
               $("#mobileFlag").text('请输入有效的手机号码！');
               $("#txtMobile").focus()
               return false;
            }

            var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(17[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
            if(!myreg.test(mobile)) {
                   $("#mobileFlag").text('请输入有效的手机号码！');
                   $("#txtMobile").focus()
                   return false;
            }
            $("#mobileFlag").text('');

            return true;
    }
