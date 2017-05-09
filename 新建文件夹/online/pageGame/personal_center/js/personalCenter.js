$(function(){
    resizeFn();
    $(window).resize(function(){
        resizeFn();
    });



    //hover-tip
    $('.user_con .icon i').hover(function() {
        $(this).parents('.icon').find('p').show()
    }, function() {
        $(this).parents('.icon').find('p').hide()
    });

    //点击左侧进入
    $('.personal_center .left_per ul').on('click','li.pr',function(){
        resizeFn();
        var i = $(this).index();
        $(this).addClass('cur').siblings().removeClass('cur');
        $('.right_per li.list_con').eq(i).addClass('cur').siblings().removeClass('cur');
    });
    //点击充值
    $('.personal_center .left_per ul').on('click','li.charge a',function(){
        resizeFn();
        $(this).parents('li.charge').find('ol').toggle();
        $(this).parents('li.charge').find('i').toggleClass('cur');
    })
    //点击支付列表
    $('.personal_center .left_per  ol').on('click','li',function(){
        resizeFn();
        $(this).parents('ol').show();
        $(this).addClass('cur').siblings().removeClass('cur')
    });

    //点击充值中心 下拉
    $('.personal_center .left_per li.charge i').on('click',function(){
        resizeFn();
        $(this).toggleClass('cur');
        if($(this).hasClass('cur')){
            $(this).parents('li.charge').find('ol li').addClass('cur');
        }
        $(this).hasClass('cur') ? $(this).parents('li.charge').find('ol').show():$(this).parents('li.charge').find('ol').hide();
    });
    //点击充值v点或者页游
    $('.paymentCenter  .pay_sel_btn').on('click','span',function(){
        resizeFn();
        $(this).addClass('cur').siblings().removeClass('cur');
        $('.payment_tips').hide();
        $('.payment_num').find('span').removeClass('cur');
        $('.other_pay_num input').val('')
        if($(this).index() == 1){
            $('.paymentCenter .pageGame_sel').show();
        }else{
            $('.paymentCenter .pageGame_sel').hide();
        }

    });

    //点击选择使用v点支付
    $('.choice_box').on('click',function(){
        resizeFn();
        $(this).toggleClass('choiced');
        if($(this).hasClass('choiced')){
            var money = $('.other_pay_num').find('input').val();
            var balanceNum =$('.pageGame_choice_mode').find('.balance_num').text();
            var needMoney = money - balanceNum;
            if(money == ''){
                $('.erro_tips').text('充值金额不能为空，请填写充值金额');
                $('.erro_tips').show();
            }else{
                $(this).parents('.pageGame_pay').height(150);
                $(this).parents('.pageGame_choice_mode').find('.choice_vr_pay').show();
                $('.erro_tips').text('充值金额不能为空，请填写充值金额');
                $('.erro_tips').hide();
            }
            if(needMoney <=0){
                needMoney = 0;
                balanceNum = money;
                $('.pay_zhi_btn input.pay_use_code').hide();
                $('.pay_zhi_btn input.pay_use_name').hide();
                $('.pay_zhi_btn input.pay_use_vr ').show();
            }else{
                needMoney = money - balanceNum;
            }
            $('.choice_vr_pay').find('.user_num').text(balanceNum);
            $('.choice_vr_pay').find('.total_num').text(money);
            $('.pageGame_choice_mode').find('.need_num').text(needMoney);
        }else{
            $(this).parents('.pageGame_pay').height(100);
            $(this).parents('.pageGame_choice_mode').find('.choice_vr_pay').hide()
        }
    })
    //点击支付宝扫码支付

    $(".pay_zhi_btn input.pay_use_code").on("click",function(){
        resizeFn();
        var num = $('.other_pay_num input').val()
        if(num == ''){
            $('.erro_tips').text('充值金额不能为空，请填写充值金额');
            $('.erro_tips').show();
        }else{
            $('.erro_tips').text('金额填写1~50000之间的整数，不含小数点');
            $('.erro_tips').hide();
            $('.pay_ewm').find('.need_pay_num').text(num);
            var json = {};
            $("#frm_post").find('input').each(function(key){
                var fieldname = $(this).attr("name");
                var value = $(this).val()==null?"":$(this).val();
                json[fieldname] = value;
            });
            if($('.pay_sel_btn .vr_charge').hasClass('cur')){
                payAlipay(0,json,'ewm');
            }else{
                payAlipay(1,json,'ewm')
            }
        }


    });
    //点击 登录支付账户支付
    $(".pay_zhi_btn input.pay_use_name").on("click",function(){
        resizeFn();
        var num = $('.other_pay_num input').val()
        if(num == ''){
            $('.erro_tips').text('充值金额不能为空，请填写充值金额');
            $('.erro_tips').show();
        }else{
            $('.erro_tips').text('金额填写1~50000之间的整数，不含小数点');
            $('.erro_tips').hide();
            $('.pay_ewm').find('.need_pay_num').text(num);
            var json = {};
            $("#frm_post").find('input').each(function(key){
                var fieldname = $(this).attr("name");
                var value = $(this).val()==null?"":$(this).val();
                json[fieldname] = value;
            });
            if($('.pay_sel_btn .vr_charge').hasClass('cur')){
                payAlipay(0,json,'pay_name');
            }else{
                payAlipay(1,json,'pay_name')
            }
        }

    });
    //点击立即支付
    $('.pay_zhi_btn input.pay_use_vr ').on('click',function(){

        resizeFn();
        var json = {};
        $("#frm_post").find('input').each(function(key){
            var fieldname = $(this).attr("name");
            var value = $(this).val()==null?"":$(this).val();
            json[fieldname] = value;
        });
        payAlipay(2,json,'pay_plantb');
    })
    //点击关闭
    $('.pay_ewm .close').on('click',function(){
        $('.pay_ewm').hide();
    });
    //点击修改头像显示
    $('.user_header p.img_con').on('click',function(){
        $('.modify_box').show()
    });
    //点击绑定手机号弹窗
    $('.phone_btn').on('click',function(){
        $('.bind_phoneNum').show()
    });
    //修改密码
    $('.revamp_paw_btn').on('click',function(){
        $('.revamp_password').show()
    });
    //点击确定
    $('.revamp_password  .sure').on('click',function(){
        $('.revamp_password ').hide()
    });
    //点击取消

    $('.cancel').on('click',function(){
        $(this).parents('.mask_layer').hide();
        var imgDate = {};
        imgDate.w = $('.wl').find('#small').width();
        imgDate.h = $('.wl').find('#small').height();
        imgDate.l = $('.wl').find('#small').position().left;
        imgDate.t = $('.wl').find('#small').position().top;
        //console.dir(imgDate);
    });
    //点击保存

    //点击绑定成功确定或者取消关闭
    $('.bind_phoneNum .popup_btn').on('click','li',function(){
        if($(this).hasClass('sure')){
            $('.success_popup_window').show();
            $(this).parents('.bind_phoneNum').hide()
        }
    });
    //点击绑定成功确定按钮
    $('.success_popup_window .sure').on('click',function(){
        $(this).parents('.success_popup_window').hide()
    });

    //修改平台账号
    $('.revamp_btn').on('click',function(){
        $('.revamp_account').show()
    });
    //点击修改
    $('.revamp_account .sure').on('click',function(){
        $('.revamp_account').hide();
        $('.sure_revamp_account').show()
    });
    //点击确定
    $('.sure_revamp_account .sure').on('click',function(){
        $('.sure_revamp_account').hide();
    });
    //充值中心
    $('.other_pay_num i').hover(function(){
        $('.pay_num_tips').show();
    },function(){
        $('.pay_num_tips').hide();
    });
    //选择充值金额
    $('.payment_num span').on('click',function(){
        resizeFn();
        $(this).addClass('cur').siblings().removeClass('cur');
        var num = $(this).text();
        var i = num.substring(1,num.length);
        $('.choice_box').removeClass('choiced')
        $('.erro_tips').hide();
        if($('.pay_sel_btn span').eq(1).hasClass('cur')){
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
        $('.need_num').text(i)
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
        resizeFn();
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
        $('.need_num').text(num)
        //v支付几个点
        //判断当前余额与充值金额    有问题
        if(num > $('.select_right  span.balance_num').text()){

        }
    });
    //  点击解绑
    $('.unbind i').eq(1).on('click',function(){
        tipsFn.init({
            model:'tips',//提示的信息 tips提示信息   modify 修改信息
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
            sucCallback:function(){
                tipsFn.init({
                    model:'tips',
                    msg:'成功'
                })
            }
        });
    })

    //点击确定
    $('.payment_btn').on('click',function(){
        var num = $('.other_pay_num input').val();

    });
    //选择充值方式
    $('.payment_select ul li').on('click',function(){
        resizeFn();
        $(this).addClass('cur').siblings().removeClass('cur');
        if($(this).hasClass('vt_pay')){
            $('.vr_pay_con').show();
            $('.zhi_pay_con').hide();
        }else{
            $('.vr_pay_con').hide();
            $('.zhi_pay_con').show();
        }
    });
    /* //点击关闭
     $('.close').on('click',function(){
     $(this).parents('.success_popup_window').hide(100);
     });*/
})
//图片预览
function previewHeadFile(){
    var preview = document.querySelector('.pre-1 img');
    var preview2 = document.querySelector('.jc-demo-box img');
    var preview3 = document.querySelector('.pre-2 img');
    var file  = document.querySelector('input#file').files[0];
    var reader = new FileReader();
    reader.onloadend = function () {
        preview.src = reader.result;
        preview2.src = reader.result;
        preview3.src = reader.result;
        $('.modify_head_portrait .popup_btn .cancel').text('保存');
    };
    if(file){
        reader.readAsDataURL(file);
    }else{
        preview.src = '';
    }
}




///
function resizeFn(){
    var winHeight;
    if (window.innerHeight){
        winHeight = window.innerHeight;
    }else if ((document.body) && (document.body.clientHeight))
    { winHeight = document.body.clientHeight;}
    $('.personal_center_height').height(winHeight);
    $('#personal_center_scroll').tinyscrollbar();
};










