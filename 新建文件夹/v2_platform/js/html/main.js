function setiframe(){
  $('.main_con').find('iframe').attr('src','http://www.vronline.com/pchome?platform=pc');
  $('#main').show();

  $('#main').load(function(){
      $('.loading').hide();
  });
}


$(function(){
    changeLanguage(2052);
    mainFrameFn();
    platformRisze();
    addLocalGameFn();
    setBindFn();
    unlogin_nogame_show();
    $(window).resize(function(){
        platformRisze();
        if($('body').find('.vr_game_download_btn').hasClass('show')){
            $('.vr_con_height').height($('.con_hei').height()-110);
            $('.vr_con_height #main').height($('.con_hei').height()-110);

        }else{
            $('.vr_con_height').height($('.con_hei').height());
            $('.vr_con_height #main').height($('.con_hei').height());
        };
    });
    $(window).click(function(){
        $('.manager ul').hide();
        $('.delete').hide();
        $('.setting_list ').removeClass('show');
    });
    //点击本地播放器打开
    $('body').on('click', '.local_video_play_btn .local_video_play', function() {
        PL.callFun('videoframe', 'video_open_local', '')
    });

    //左侧的热门游戏
    //getHotListFn();
    //点击提交按钮
    $('.test_btn').on('click',function(){
       var id = $('.test_gameid').val();
        var src = 'http://www.vronline.com/vrgame/'+id;
        $('#main').attr('src',src);
    });

    //点击确定
    $('body').on('click','.public_bounced .sure',function(){
        var funid = $(this).parents('.mask').attr('funid');
        PL.callFun('mainframe', 'publickBunced', '{"funid":'+funid+',"state":1}');
        $(this).parents('.public_bounced').hide();
    });
    //点击取消
    $('body').on('click','.public_bounced .cancel',function(){
        var funid = $(this).parents('.mask').attr('funid');
        PL.callFun('mainframe', 'publickBunced', '{"funid":'+funid+',"state":0}')
    });

    //点击关于vr助手
    $('body').on('click','.setting_list .aboutVr',function(){
        //alert(1)
        PL.callFun('mainframe', 'requestversion', '')
    })
});

function mainFrameFn(){
    //点击首页
    $('.add_title').on('click','li',function(){
        $(this).addClass('cur').siblings().removeClass('cur');
        if($(this).hasClass('home')){
            homeShow();
        }else if($(this).hasClass('vrgame')){
            vrGameShow();
        }else if($(this).hasClass('pageGame')){
            pageGameShow();
        }else if($(this).hasClass('video')){
            videoShow();
        }else if($(this).hasClass('drive')){
            driveTitleShow();

        };
        vr_game_btn_hide();
        var title = $(this).find('a').attr('data-name');
        PL.callFun('mainframe', 'main_tab_changed', title);
    });
    //点击头像
    //点击头像登录
    $('body').on('mousedown',function(e){
        if(3 == e.which){
            $('.game_list').find('.delete').hide();
        }
    })
    $('.user').mousedown(function(e){
        var left = e.pageX;
        var top = e.pageY;
        if($('.user .name').html() != ''){
            if(3 == e.which){
                $('.game_list').find('.delete').hide();
                $(this).find('.delete').detach();
                html = '<ul class="delete pa" style="z-index:9999999;"><li class="exit enter_btn"><p></p><span class="delete language" data-name="">个人中心</span></li><li class="exit charge_center"><p></p><span class="delete language" data-name="personal_center">充值中心</span></li><li class="exit exit_btn"><p></p><span class="delete language" data-name="manage_exit">退出</span></li></ul>'
                $(this).append(html);
                $(this).find('.delete').show();
                $('.delete').css({
                    'left':left,
                    'top':top
                });
                e.stopPropagation();
                e.preventDefault();
            }
        }else{

        }
    });
    $('.user').on('click',function(){
        if($('.user .name').html() == ''){
            login_enterFn();
        }else{
            //已登录
            //右键退出

        }
    });
   /* $('body').on("mouseout",'.delete',function(event){
        $(this).hide();
    });
    $('body').on("mouseover ",'.delete',function(event){
        $(this).show();
    });*/
    $('.user').on('click','img',function(){
        if($('.user .name').html() != ''){
        $('.vr_show').hide();
        $('.download_btn ').removeClass('show');
        $('#main').attr('src','http://www.vronline.com/profile');
        };
    })
    $('.user').on('click','.name',function(){
        if($('.user .name').html() != ''){
            $('.vr_show').hide();
            $('.download_btn ').removeClass('show');
            $('#main').attr('src','http://www.vronline.com/profile');
        };
    })
    //点击进入个人中心
    $('.user').on('click','.enter_btn',function(e){
        $('.user').find('.delete').hide();
        $('.download_btn ').removeClass('show');
        $('#main').attr('src','http://www.vronline.com/profile');
        $('.vr_show').hide();
    });
    //点击充值中心
    $('.user').on('click','.charge_center',function(){
        $('.vr_show').hide();
        $('.user').find('.delete').hide();
        $('.download_btn ').removeClass('show');
        $('#main').attr('src','http://www.vronline.com/charge');
    })
    //个人中心hover
    $('.user').on('mouseover',' ul.delete',function(){
       $(this).show();
    });
    $('.user').on('mouseout',' ul.delete',function(){
        $(this).hide();
    });
    //点击退出
    $('.user').on('click','li.exit_btn',function(e){
        $('.user').find('.delete').hide();
        if($('#main').attr('src').indexOf('profile') >0){
            window.history.go(-1);
        }else{
            /*var src = $('#main').attr('src');
            setTimeout(function(){
                $('#main').attr('src',src)
            },1000)*/
        };
        PL.callFun('loginframe', 'logout', '');
        e.stopPropagation();
    })
    //点击头像hover的时候
    $('.user').hover(function() {
        if($('.user .name').html() == ''){
            $(this).attr('title','请登录');

        }else{
            $(this).removeAttr('title');
        }
    }, function() {
        /* Stuff to do when the mouse leaves the element */
    });
    $('.user img').hover(function() {
        if($(this).attr('src') =='image/touxiang1.png'){
            $(this).attr('src','image/touxiang2.png')
        }
    }, function() {
        if($(this).attr('src') =='image/touxiang2.png'){
            $(this).attr('src','image/touxiang1.png')
        }
    });
    //菜单按钮
    //vr按钮
    $('.manager .vrBtn').on('click', function() {
        PL.callFun('mainframe', 'vrBtn','');
        /* Act on the event */
    });
    $('.manager .mini').on('click',function(){
        //

        PL.callFun('common', 'min','');
    });
    $('.manager .max').on('click',function(){
        //点击最大化
        //如果是最大化添加类名
        PL.callFun('common', 'max','');
    });
    $('.manager .closeplate').on('click',function(){
        //点击关闭
        PL.callFun('mainframe', 'close','');
        //close_tips();
    });
    //点击工具按钮
    $('.manager .set').on('click',function(e){
        $('.setting_list').addClass('show');
        e.stopPropagation();
    });
    //点击设置
    $('.setting_list').on('click','li',function(){
        $(this).parents('.setting_list').removeClass('show');
        if($(this).hasClass('setting')){
            //点击设置按钮
            PL.callFun('mainframe', 'menu_itemclicked','item_set');
        }else if($(this).hasClass('exit')){
            PL.callFun('mainframe', 'close','');
            //close_tips();
        }else if($(this).hasClass('idea')){
            $('#divAdvice').show();
        }else if($(this).hasClass('exchange_code_set')){
            //alert(12)
            $('.exchange_code').find('input').val('');
            $('.exchange_code').show().find('.input_code').removeClass('erroColor').text('输入您想要兑换的激活码');
        }
    });
    $('.setting_list').hover(function(){
        $(this).addClass('show');
    },function(){
        $(this).removeClass('show');
    });
    //弹窗
    $('.login__enter_close').on('click',function(){
        $(this).parents('.mask').hide();
    });
    $('.sure').on('click',function(){
        $(this).parents('.mask').hide();
    });
    //点击关闭弹窗确定的时候
    $('.close_tips .sure').on('click',function(){
        var json = {
        };
       // console.dir($('.close_tips input[name="rem"]').attr('checked') == "checked")
        if($(".close_tips input[name = 'min']:checked").val() == 0){
            json.state = 0;
        }else{
            json.state = 1;
        }
        if(document.getElementById('rem').checked){
            json.remstate = 1;
        }else{
            json.remstate = 0;
        }
        console.dir(json);
        PL.callFun('mainframe', 'closebtnclicked', JSON.stringify(json));
    });
    $('.cancel').on('click',function(){
        $(this).parents('.mask').hide();
    });
    $('.close_btn').on('click',function(){
        $(this).parents('.mask').hide();
    });
    //新手引导
    $('.new_course').find('.exit').on('click',function(){
        $('.new_course ').hide();
    });
    $('.new_course').find('p.tips span').on('click',function(){
        if($(this).hasClass('last_tips')){
            $('.new_course ').hide();
        }else{
            $(this).parent('p').hide();
            $(this).parent('p').next().show();
        }
    });
    //点击关闭vr提示的确定
    $('.exit_vr_tips').on('click','.sure',function(){
        PL.callFun('mainframe', 'vrcloseconfirm', '');
    });
    // showCourse();
    // var device = {
    //     deviceType :6
    // }
    // getDrive(device);
    // var data33={
    //     pro : 100

    // }
    // driveDown(data33);
};
//最大化 最小化
function  maxFn(data){
    $(data).each(function(key,val){
        if(val.window_state == 0 ) {
            $('.manager div.max').removeClass('minMax');
        }else {
            $('.manager div.max').addClass('minMax');
        }
    });
};

//显示新手教程
function showCourse(){
    //获取title2的离左侧的距离
    $('.homelead_con').show();
};
//iframe的的高度
function platformRisze(){
    var winHeight;
    if (window.innerHeight){
        winHeight = window.innerHeight;
    }else if ((document.body) && (document.body.clientHeight)) {
        winHeight = document.body.clientHeight;
    };
    $('.con_hei').height(winHeight-48);
    $('.vr_con_height').height(winHeight-48);
    $('.vr_game_list_hei').height(winHeight-74);
    //$('.vr_con_height').height(winHeight-49);
    scrollBar();
};
function scrollBar(){
    $('#vr_game_list_scroll').tinyscrollbar();
    $('#addLocalGameList').tinyscrollbar();
}
/*-----------添加本地游戏----------------*/
//添加本地程序
function addRoutineHtml(val){
    html = '<li  class="cn clearfix ">\
                    <span class=" in-con-check fl" style="margin-right: 6px; margin-top: 3px;"></span>\
                    <span  class="parting-line first-parting-line fl">\
                    <div class="imgContain fl"><img src="' + val.imgSrc + '" /></div>\
                    </span>\
                    <span  class="parting-line sec-parting-line fl" >' + val.title + '</span>\
                    <span class="in-con-area fl" >' + val.address + '</span>\
            </li>';
            if(val.state == 1){
                $('.addGame .in-con-body .localGameList').prepend(html);
            }else{
                $('.addGame .in-con-body .localGameList').append(html);
            }
}
//添加本地程序
function addLocalRoutine(data){
    $(data).each(function(key,val){
        addRoutineHtml(val);
        if(val.state == 1){
            $('.addGame .in-con-body .localGameList li').eq(key).addClass('cur');
            $('.addGame .in-con-body .localGameList li').eq(key).find('span.in-con-check').addClass('selected');
            $('.addGame').find('.addSelect').addClass('cn');
        }
    });
    scrollBar();
};
//添加本地程序事件
function addLocalGameFn(){
    //点击次校准的
    $('body').on('click','.correct',function(){
        PL.callFun('mainframe', 'showhidetool', '');
    });
    //点击添加本地游戏
    $('body').on('click','.add_game',function(){
        //显示添加本地游戏的
        $('.add_local_game').show();
        $('.in-con-check').removeClass('selected');
        $('.addGame .in-con-body .localGameList li').removeClass('cur');
        $('.in-foot .addSelect').removeClass('cn');
        //获取本地数据
        /*var data=[{
            'imgSrc':'image/video_banner.jpg',
            'videoTime':'60:00',
            'title':'ddd'
        }];
        addLocalRoutine(data)*/
        PL.callFun('mainframe', 'addlocalgame', '');
    });
    //点击弹窗的关闭按钮
    $('body').on('click','.mask .close',function(){
        $(this).parents('.mask').hide();
    });
    //点击取消按钮
    $('body').on('click','.mask .cancel',function(){
        $(this).parents('.mask').hide();
    });
    //点击添加本地程序
    $('body').on('click','.mask .addSelect',function(){
        var select = [];
        $('.localGameList li').each(function(key){
            if($(this).hasClass('cur')){
                select.push($(this).index());
            }
        });
        $(this).parents('.mask').hide();
        PL.callFun('gamelistframe', 'addgame_confirm',JSON.stringify(select));
    });
    $('body').on('click','.add_local_game .browse',function(){
        //$(this).parents('.mask').hide();
        PL.callFun('gamelistframe', 'addgame_browser','');
    });
    Array.prototype.indexOf = function(val) {
        for (var i = 0; i < this.length; i++) {
            if (this[i] == val) return i;
        }
        return -1;
    };
    Array.prototype.remove = function(val) {
        var index = this.indexOf(val);
        if (index > -1) {
            this.splice(index, 1);
        }
    };
    $('.in-con-header .in-con-check').on('click',function(){
        if($(this).hasClass('selected')){
            $(this).removeClass('selected');
            for(var i = 0;i<$('.in-con-body li span.in-con-check').length;i++){
                $('.in-con-body li span.in-con-check').eq(i).removeClass('selected');
                $('.in-con-body li').eq(i).removeClass('cur')
            };
            $('.in-foot .addSelect').removeClass('cn');
        }else if(!$(this).hasClass('selected')){
            $(this).addClass('selected');
            for(var i = 0;i<$('.in-con-body li span.in-con-check').length;i++){
                $('.in-con-body li span.in-con-check').eq(i).addClass('selected');
                $('.in-con-body li').eq(i).addClass('cur')
            };
            $('.in-foot .addSelect').addClass('cn');
        }
    })
    $('.in-con-body').on('click', 'li',function () {
        $(this).toggleClass('cur');
        $(this).find('.in-con-check ').toggleClass('selected');
        if($(this).find('.selected').length >0){
            $('.in-foot .addSelect').addClass('cn');
        }
        if(!$(this).hasClass('cur')){
            if($('.in-con-body').find('li.cur').length>0){
                $('.in-foot .addSelect').addClass('cn');
            }else{
                $('.in-foot .addSelect').removeClass('cn');
            }

        }
    });
};

//设置窗口
//设置数据调用
function setDateFn(data){
    $(data).each(function(key,val){
        if(val.languageState == 1033){
            $('.language_selected').data('name','English')
        }else{
            $('.language_selected').data('name','Chinese')
        };
        if(val.serviceState == 1){
            $('.equipmentauto_set .selected_btn li').eq(0).addClass('selected').siblings().removeClass('selected');
        }else{
            $('.equipmentauto_set .selected_btn li').eq(1).addClass('selected').siblings().removeClass('selected');
        };
        if(val.autoState == 1){
            $('.close_btn_set .selected_btn li').eq(0).addClass('selected').siblings().removeClass('selected');
        }else{
            $('.close_btn_set .selected_btn li').eq(1).addClass('selected').siblings().removeClass('selected');
        };
        if(val.openVronline == 1){
            $('.openVRonline_set .selected_btn li').eq(0).addClass('selected').siblings().removeClass('selected');
        }else{
            $('.openVRonline_set .selected_btn li').eq(1).addClass('selected').siblings().removeClass('selected');
        };
        if(val.closeplatselected == 1){
            $('.close_plateform .selected_btn li').eq(1).addClass('selected').siblings().removeClass('selected');
        }else{
            $('.close_plateform .selected_btn li').eq(0).addClass('selected').siblings().removeClass('selected');
        };
        $('.download_path input').val(val.dir)
    });
    $('.set_bounced').show();
}
//弹窗设置
function setBindFn(){
    //点击设置语言
    $('.language_set').on('click',function(e){
        $('.set_language').toggle();
        e.stopPropagation();
    });
    $('.set_language li').on('click',function(){
        //设置英文时
        //console.dir($(this).attr('data-name') == 'English');
        //获取当前的data-name
        if($(this).attr('data-name') == 'English'){
            $('.language_selected').text($(this).text());
            $('.language_selected').attr('data-name','English');
        }else if($(this).attr('data-name') == 'Chinese'){
            $('.language_selected').attr('data-name','Chinese');
            $('.language_selected').text($(this).text());
        };

    });
    //设置是否自启动
    $('ol.selected_btn li').on('click',function(){
        $(this).addClass('selected').siblings().removeClass('selected')
    });
    //关闭弹窗
    $('.set_bounced .close').on('click',function(){
        $('.set_bounced').hide();
    });
    //点击取消调用
    $('.set_bounced .cancel').on('click',function(){
        $('.set_bounced').hide();
    });
    //点击确定按钮
    $('.set_sure').on('click',function(){
        $('.set_bounced').hide();
        if($(this).parents('.commonSetting ').find('li.synthetic').hasClass('on_choose')){
          var sure_ste ={
              'languageState':'',
              'serviceState':'',
              'autoState':'',
              'openVronline':'',
              'dir':'D:/'
          };
          if($('.equipmentauto_set .selected_btn li').eq(0).hasClass('selected')){
              sure_ste.serviceState =1;
          }else{
              sure_ste.serviceState = 0;
          };
          if($('.close_btn_set .selected_btn li').eq(0).hasClass('selected')){
              sure_ste.autoState = 1;
          }else{
              sure_ste.autoState = 0;
          };

          if($('.openVRonline_set .selected_btn li').eq(0).hasClass('selected')){
              sure_ste.openVronline = 1;
          }else{
              sure_ste.openVronline = 0;
          };
          if($('.close_plateform  .selected_btn li').eq(0).hasClass('selected')){
              sure_ste.closeplatselected = 0;
          }else{
              sure_ste.closeplatselected = 1;
          }
          if($('.language_selected').attr('data-name') == 'English'){
              sure_ste.languageState = 1033 ;
          }else{
              sure_ste.languageState = 2052 ;
          }
          sure_ste.dir = $('.download_path input').val();
          console.dir(sure_ste)
          PL.callFun('mainframe', 'set_confirm',JSON.stringify(sure_ste));
        }

    });
    //点击恢复初始设置
    $('.renew').on('click',function(){
        //$('.set_bounced').hide();
        PL.callFun('mainframe', 'set_restore','');
    })
    //点击浏览按钮
    $('.amend').on('click',function(){
        PL.callFun('mainframe', 'set_modify','');
    });
    //点击打开
    $('.open').on('click',function(){
        PL.callFun('mainframe', 'set_open','');
    });
    //点击退出vr
    $('.exit_vr_tips').on('click','.sure',function(){
        $('.exit_vr_tips').hide();

    })


}
//多语言
function changeLanguage(data, $_tar){
    // console.log($_tar);
    var obj= {};
    var $tar = $_tar == undefined? $("html"): $_tar;
    $.ajax({
        url:'language/'+data+'/StringRes.xml',
        async:true,
        type:'POST',
        dataType:'xml',
        success: function(ResponseText){
            $(ResponseText).find('item').each(function(){
                var key = $(this).attr('key');

                if(key == $(this).attr('key')){
                    var title = $(this).attr('value');
                    //obj[key] = title;
                    $tar.find(".language").each(function(){
                        //console.dir(object);
                        var name = $(this).data('name');
                        if(name == key){
                            //console.dir(object)
                            $(this).text(title);
                        }
                    })
                }
            });
        },
        error:function(){
            console.dir('获取数据错误')
        }
    });
    return $tar;
}



//vr模式开启
function vrOpen(){
    $('body').find('.vrBtn').addClass('cur');
}
//vr模式关闭
function vrClose(){
    $('body').find('.vrBtn').removeClass('cur');
}
//次校准开启
function correctOpen(){
    $('body').find('.correct').addClass('cur');
}
//次校准关闭
function correctClose(){
    $('body').find('.correct').removeClass('cur');
}
//显示首页
function titleTable(data){
    switch (data.title){
        case "vrgame":
            $('.add_title').find('li.game').addClass('cur').siblings().removeClass('cur');
            $('.main_con').find('iframe').attr('src','http://www.vronline.com/vrgame/?platform=pc');
            $('body').css('background','#191f2d url(image/bg.jpg) top center no-repeat');
            break;
        case "video":
            $('.main_con').find('iframe').attr('src','http://www.vronline.com/media/?platform=pc');
            $('body').css('background','#191f2d url(image/bg.jpg) top center no-repeat');
            break;
        case "webgame":
            $('.main_con').find('iframe').attr('src','http://www.vronline.com/webgame/?platform=pc');
            $('body').css('background','#191f2d url(image/bg.jpg) top center no-repeat');
            break;
        case "home":
            $('.main_con').find('iframe').attr('src','http://www.vronline.com/pchome/?platform=pc');
            $('body').css('background','#191f2d url(image/bg.jpg) top center no-repeat');
            break;
    };
    $('.tips_login').hide();
    $('.setup_con').hide();

}
function homeShow(){
    $('.vr_show').hide();
    $('.add_title').find('li.home').addClass('cur').siblings().removeClass('cur');
    $('.main_con').find('iframe').attr('src','http://www.vronline.com/pchome/?platform=pc');
    $('body').css('background','#191f2d url(image/bg.jpg) top center no-repeat');
    $('.drive_con').hide();
    $('.local_video_play_btn').hide();
    $('.add_title li.drive').addClass('glow');
    $('.tips_login').hide();
    $('.setup_con').hide();

}
//显示vr游戏
function vrGameShow(){
    $('.add_title').find('li.game').addClass('cur').siblings().removeClass('cur');
    $('.main_con').find('iframe').attr('src','http://www.vronline.com/vrgame/?platform=pc');
    $('body').css('background','#191f2d url(image/bg.jpg) top center no-repeat');
    $('.drive_con').hide();
    platformRisze();
    unlogin_nogame_show();
    getHotListFn();
    $('.local_video_play_btn').hide();
    $('.add_title li.drive').addClass('glow');
    $('.vr_show').show();
    $('.tips_login').hide();
    $('.setup_con').hide();

}
//显示页游
function pageGameShow(){
    $('.vr_show').hide();
    $('.add_title').find('li.pageGame').addClass('cur').siblings().removeClass('cur');
    $('.main_con').find('iframe').attr('src','http://www.vronline.com/webgame/?platform=pc');
    $('body').css('background','#191f2d url(image/bg.jpg) top center no-repeat');
    $('.drive_con').hide();
    $('.local_video_play_btn').hide();
    $('.add_title li.drive').addClass('glow');
    $('.setup_con').hide();
    $('.tips_login').hide();

}
//显示视频页
function videoShow(){
    $('.vr_show').hide();
    $('.add_title').find('li.video').addClass('cur').siblings().removeClass('cur');
    $('.main_con').find('iframe').attr('src','http://www.vronline.com/media/?platform=pc');
    $('body').css('background','#191f2d url(image/bg.jpg) top center no-repeat');
    $('.drive_con').hide();
    $('.local_video_play_btn').show();
    $('.add_title li.drive').addClass('glow');
    $('.setup_con').hide();
    $('.tips_login').hide();

}
//显示驱动
function driveTitleShow(){
    $('.vr_show').hide();
    $('.main_con').find('iframe').attr('src','./startGame/drive.html');
    $('.add_title li.drive').addClass('show').removeClass('glow');
    $('.drive_con').show();
    $('.local_video_play_btn').hide();
    $('.setup_con').hide();
    $('.tips_login').hide();

}

//系统不支持此功能
function system_tips(){
    $('.system_tips').show();
}
function close_data(data){
    $('.close_tips').show();
    if(data.state == 0){
        $(".close_tips input[name = 'min']").eq(0).attr('checked','true');
        $(".close_tips input[name = 'min']").eq(1).removeAttr('checked');
    }else{
        $(".close_tips input[name = 'min']").eq(1).attr('checked','true');
        $(".close_tips input[name = 'min']").eq(0).removeAttr('checked');
    };
    if(data.remstate == 0){
        $('#rem').removeAttr('checked')
    }else{
        $('#rem').attr('checked','true')
    }
}

//退出vr
function exit_vr(data){
    if(data.state == 1){
        $('.exit_vr_tips').show();
    }else{
        $('.exit_vr_tips').hide();
    }
}
//显示为插入设备提示
function un_equipment_tips(data){
    if(data.state == 1){
        $('.un_equipment_tips').show();
    }else{
        $('.un_equipment_tips').hide();
    }
}

//意见反馈
function previewFile1(){
    var preview = document.querySelector('img.image1');
    var file  = document.querySelector('input.file1').files[0];
    var reader = new FileReader();
        $('.image1').nextAll('.erroColor').detach();

    if(file.size >1024000){
        var html = '<span class="erroColor pa tac" style="top:50%;">上传的图片不能大于1M,请重新上传</span>'
        $('.file1').parents('div.pr.fl').append(html)
    }else{
        $('.image1').nextAll('.erroColor').detach();
        reader.onloadend = function () {
            preview.src = reader.result;
            $('.image1').show();
            $('.image1').prevAll().show();
        };
        if(file){
            reader.readAsDataURL(file);

        }else{
            preview.src = '';
        }
    }

    // checkSize(url)
    // var
}
function previewFile2(){
    var preview = document.querySelector('img.image2');
    var url =$('.image2').attr('src') ;
    var file  = document.querySelector('input.file2').files[0];
    var reader = new FileReader();
    if(file.size > 1024000){
        var html = '<span class="erroColor pa tac" style="top:50%;">上传的图片不能大于1M,请重新上传</span>'
        $('.file2').parents('div.pr.fl').append(html)
    }else{
        $('.image2').nextAll('.erroColor').detach();
        reader.onloadend = function () {
        preview.src = reader.result;
        $('.image2').show();
        $('.image2').prevAll().show();
        };
        if(file){
            reader.readAsDataURL(file);
        }else{
            preview.src = '';
        }
    }

}
function previewFile3(){
    var preview = document.querySelector('img.image3');
    var file  = document.querySelector('input.file3').files[0];
    var url =$('.image3').attr('src') ;
    var reader = new FileReader();
    if(file.size > 1024000){
        var html = '<span class="erroColor pa tac" style="top:50%;">上传的图片不能大于1M,请重新上传</span>'
        $('.file3').parents('div.pr.fl').append(html)
    }else{
        $('.image3').nextAll('.erroColor').detach();
        reader.onloadend = function () {
        preview.src = reader.result;
        $('.image3').show();
        $('.image3').prevAll().show();
        };
        if(file){
            reader.readAsDataURL(file);
        }else{
            preview.src = '';
        }
    }

}
function previewFile4(){
    var preview = document.querySelector('img.image4');
    var file  = document.querySelector('input.file4').files[0];
    var reader = new FileReader();
    var url =$('.image4').attr('src') ;
    if(file.size>1024000){
        var html = '<span class="erroColor pa tac" style="top:50%;">上传的图片不能大于1M,请重新上传</span>'
        $('.file4').parents('div.pr.fl').append(html)
    }else{
        $('.image4').nextAll('.erroColor').detach();
        reader.onloadend = function () {
        preview.src = reader.result;
        $('.image4').show();
        $('.image4').prevAll().show();
        };
        if(file){
            reader.readAsDataURL(file);
        }else{
            preview.src = '';
        }
    }

}
function previewFile5(){

    var preview = document.querySelector('img.image5');
    var file  = document.querySelector('input.file5').files[0];
    var reader = new FileReader();
    var url =$('.image5').attr('src') ;
    if(file.size>1024000){
        var html = '<span class="erroColor pa tac" style="top:50%;">上传的图片不能大于1M,请重新上传</span>'
        $('.file5').parents('div.pr.fl').append(html)
    }else{
        $('.image5').nextAll('.erroColor').detach();
         $('.image5').show();
        $('.image5').prevAll().show();
        reader.onloadend = function () {
            preview.src = reader.result;
        };
        if(file){
            reader.readAsDataURL(file);
        }else{
            preview.src = '';
        }
    }

}
//检测图片大小

//删除已上传的图片
$(function(){
    function imgFileHide(obj){
        obj.hide();
        obj.parent('div.fl').find('img').attr('src','');
        obj.parent('div.fl').find('img').hide();
    }
    $('.advice_close_btn').on('click',function(){
        imgFileHide($(this))
    });
    $("#btnSuccess").click( function () {
        $("#divSuccess").hide();
    });

    // 点击意见反馈取消按钮
    $("#btnCencel").click( function () {
        $("#divAdvice").hide();
    });
})

$(function(){
    //获取焦点的时候
    $('#content').focus(function(){
      $('#content').removeClass('erroColor')
    })
    $('.advice_write input').each(function(){
       $(this).focus(function(){

           $('.advice_write .erroColor').hide();
       });
        $(this).blur(function(){
            if($('.advice_write #mobile').val()!='' || $('.advice_write #qq').val() !=''){
                $('.advice_write .erroColor').hide();
            }else{
                $('.advice_write .erroColor').show();
            }
        })
    });
    // 点击确认按钮，判断事件
    $("#btnOk").click( function () {
        var flag = validate();
        if (!flag) {
            return false;
        }

        var urls=[];  // 图片集合

        $(".advice_img  img").each(function(i){
            var src = $(".advice_img img:eq(" + i + ")").attr('src');
            if (src.length > 0) {
                urls.push(src);
            };
        })
        //console.log(urls)
        var content = $("#content").val();
        var mobile = $("#mobile").val();
        var qq = $("#qq").val();
        if(content < 15){$("#content").val('字数不能低于15个字');}
        if(content > 300){$("#content").val('字数不能大于300个字');}
        $.ajax({
            type: 'POST',
            url: 'http://www.vronline.com/ajax/adviceAjax',
            data: { content : content,mobile : mobile,qq : qq,urls : urls},
            dataType: 'json',
            success: function(data){
                if (data.code == 0) {
                    //显示提交成功框
                    $("#divAdvice").hide();
                    $("#divSuccess").show().find('.bounced_body p').html('谢谢您的反馈意见，我们会马上跟进处理！');

                }else{
                    $("#divSuccess").show().find('.bounced_body p').html('提交失败,请重新提交！');}
            },
            error: function(xhr, type){
                $("#divSuccess").show().find('.bounced_body p').html('提交失败,请重新提交！');
                return false;
            }
        });
        //设置回复默认弹框


    });
});


function validate(){

    var content = $("#content").val();
    var mobile = $("#mobile").val();
    var qq = $("#qq").val();
    var rs = /^(13|14|15|17|18)[0-9]{9}$/;
    var pattern=/^\d+(\.\d+)?$/;
    if (content.length < 15) {
        $("#content").val('字数不能低于15个字').addClass('erroColor');
        return false;
    }else if(content.length > 300){
        $("#content").val('字数不能大于300个字').addClass('erroColor');
        return false;
    }else {
      $("#content").removeClass('erroColor')
    }
    if (mobile.length == 0 && qq.length == 0 ) {
        $(".advice_write .erroColor").text('手机和qq必须留一个').show();
        return false;
    }else if(mobile.length != 0){

      if(!rs.test(mobile)){
        $(".advice_write .erroColor").text('请填写正确的手机号').show();
        return false;
      }
    }else if(qq.length != 0){
      if(!pattern.test(qq)){
        $(".advice_write .erroColor").text('请填写正确的QQ号').show();
        return false;
      }
    }

    return true;
}

//测试入口
function cptest(data){
    if(data.state == 1){
        $('.game_test').show();
    }else{
        $('.game_test').hide();
    }
}

//公共弹框
function public_bounced(data){
    $('body').find('.public_bounced').detach();
    var html ='<div class="mask public_bounced" funid="'+data.funid+'" style="display: block;">\
                    <div class="mask_container">\
                        <div class="mask_head">\
                            <h3>提示</h3>\
                        </div>\
                        <div class="mask_con">\
                            <p>'+data.txt+'</p>\
                        </div>\
                        <div class="mask_foot clearfix tac">\
                            <ul class="clearfix">\
                                <li class="fl sure">确定</li>\
                                <li class="fl cancel">取消</li>\
                            </ul>\
                        </div>\
                    </div>\
        </div>';
    $('.main_container').append(html);
}
//本地游戏设置弹框
function setgamekey(data){
    $('.commonSetting').find('.openset').val(data.common.openset);
    $('.commonSetting').find('.closerview').val(data.common.closerview)
    $('.commonSetting').find('.lenspull').val(data.common.lenspull)
    $('.commonSetting').find('.oepnhandle').val(data.common.oepnhandle)
    $('.commonSetting').find('.ctrlmouse').val(data.common.ctrlmouse)
    $('.commonSetting').find('.ctrlview').val(data.common.ctrlview)
    $('.gameSetting ').find('.key_choose_r_l  ul li').eq(0).find('input').val(data.gamewarworld.A)
    $('.gameSetting ').find('.key_choose_r_l  ul li').eq(1).find('input').val(data.gamewarworld.B)
    $('.gameSetting ').find('.key_choose_r_l  ul li').eq(2).find('input').val(data.gamewarworld.X)
    $('.gameSetting ').find('.key_choose_r_l  ul li').eq(3).find('input').val(data.gamewarworld.Y)
    $('.gameSetting ').find('.key_choose_r_l  ul li').eq(4).find('input').val(data.gamewarworld.LB)
    $('.gameSetting ').find('.key_choose_r_l  ul li').eq(5).find('input').val(data.gamewarworld.RB)
    $('.gameSetting ').find('.key_choose_r_l  ul li').eq(6).find('input').val(data.gamewarworld.LT)
    $('.gameSetting ').find('.key_choose_r_l  ul li').eq(7).find('input').val(data.gamewarworld.RT)
}


var getData = {
    'common':{'openset':'0x1141','closerview':'0x1157','lenspull':'0x1153','oepnhandle':'0x1154','ctrlmouse':'0x1155','ctrlview':'0x1156'},
    'gamewarworld':{'A':'0x41','B':'0x42','X':'0x43', 'Y':'0x44', 'LB':'0x45', 'RB':'46', 'LT':'0x47','RT':'0x48'}
}
//兑换码输入
function exchange_code_result(data){
  if(data.state == 1){
    if(data.gamename !='') $('.exchange_code_result').find('.bounced_body p.exchange_gamename').text(data.gamename);
    $('.exchange_code_result').show();
    $('.exchange_code').hide();
  }else {
     $('.exchange_code .input_code').addClass('erroColor').text(data.gamename);
     $('.exchange_code').find('input').val('');
  }

}
//显示版本号:
function showVersion(data){
    $('.abort_vr_mask').show().find('.bounced_body b').html(data.version);
}


//新手引导事件
$(function(){
    //轮播
    var $cast1 = $(".drivecast");
    $cast1.slide({
        mainCell: ".cast-list",
        titCell:".hd ul",
        effect: "leftLoop",
        autoPage:"<li></li>",
        autoPlay: false,
        interTime:"3000",
        prevCell:".arrow .prev",
        nextCell:".arrow .next"
    });
    //点击关闭按钮
    $('body').on('click','.homelead_con .close',function(){
      $(this).parents('.mask').hide();
    });
    //点击开始
    $('body').on('click','.homelead_con .start_btn',function(){
      $(this).parents('.in_homelead_con').hide();
      //
      $(this).parents('.homelead_con').find('.lead_drive_check').show();
    });
    //如果还没有vr
    $('body').on('click','.homelead_con .has_drive',function(){
        $.ajax({
            url: 'http://www.vronline.com/newer/buytips',
            type: 'GET',
           dataType: 'JSON',
            json:"callback",
           data:'',
        })
        .done(function(data) {
            console.dir(data.data.start);
            if(data.data.start == 1){
                $('.has_drive_con .charge_btn').show();
                $('.has_drive_con .charge_btn').attr('src',data.data.link); 
            }
            
        })
        .fail(function() {
            console.log("error");
        })
        .always(function() {
            console.log("complete");
        });
        $(this).parents('.lead_drive_check').hide();
        $(this).parents('.homelead_con').find('.has_drive_con ').show()
      
    });
    $('.has_drive_con .charge_btn').on('click',function(){
        var src = $('.has_drive_con .charge_btn').attr('src');
        var json = {
            url:src
        };
        PL.callFun('common', 'openurl', JSON.stringify(json));
    })
    $('body').on('click','.homelead_con .no_drive',function(){
      $(this).parents('.lead_drive_check').hide();
      $(this).parents('.homelead_con').find('.no_drive_container').show()
    });
    //点击去看vrgame
    $('body').on('click','.homelead_con .next_tip',function(){
      var index = $(this).parents('.has_drive_con ').find('li.cur').index();
      var sup = index +1;
      console.dir(sup);
       $.ajax({
           url: 'http://www.vronline.com/newer/top/vrgame',
           type: 'GET',
           dataType: 'JSON',
            json:"callback",
           data:{support:sup} ,
       })
       .done(function(data) {
            
            var src1='https://image.vronline.com/'+ data.data.recommend.data[0].image.logo;
            var id1= data.data.recommend.data[0].id;
            var name1 = data.data.recommend.data[0].name;
            var num1 = data.data.recommend.data[0].play;
            var src2= 'https://image.vronline.com/'+data.data.recommend.data[1].image.logo;
            var id2 = data.data.recommend.data[1].id;
            var name2 = data.data.recommend.data[1].name;
            var num2 = data.data.recommend.data[1].play;
            $('.go_detail .detail_con .in_detail').eq(0).attr('game-id',id1);
            $('.go_detail .detail_con .in_detail').eq(0).find('img').attr('src',src1);
            $('.go_detail .detail_con .in_detail').eq(0).find('.in_detail_bottom  i').text(name1);
            $('.go_detail .detail_con .in_detail').eq(0).find('.in_detail_bottom b').text(num1);
            $('.go_detail .detail_con .in_detail').eq(1).attr('game-id',id2);
            $('.go_detail .detail_con .in_detail').eq(1).find('img').attr('src',src2);
            $('.go_detail .detail_con .in_detail').eq(1).find('.in_detail_bottom  i').text(name2);
            $('.go_detail .detail_con .in_detail').eq(1).find('.in_detail_bottom b').text(num2);
            $('.has_drive_con ').hide();
            $('.homelead_con').find('.go_detail').show();
       })
       .fail(function() {
           console.log("error");
       })
       .always(function() {
           console.log("complete");
       });
       
    })
    //vrvideo
    $('body').on('click','.homelead_con .video_btn_drive ',function(){
        $.ajax({
            url: 'http://www.vronline.com/newer/top/video',
            type: 'GET',
           dataType: 'JSON',
            json:"callback",
            data: '',
        })
        .done(function(data) {
            console.dir(data);
            var src1='https://image.vronline.com/'+ data.data.recommend.data[0].image.cover;
            var id1= data.data.recommend.data[0].id;
            var name1 = data.data.recommend.data[0].name;
            var num1 = data.data.recommend.data[0].play;
            var src2= 'https://image.vronline.com/'+data.data.recommend.data[1].image.cover;
            var id2 = data.data.recommend.data[1].id;
            var name2 = data.data.recommend.data[1].name;
            var num2 = data.data.recommend.data[1].play;
            $('.go_video').find('.img_con img').eq(0).attr('src',src1);
            $('.go_video').find('li').eq(0).attr('video-id', id1);
            $('.go_video').find('.name_video').eq(0).find('i').text(name1);
            $('.go_video').find('.name_video').eq(0).find('b').text(num1);
            $('.go_video').find('.img_con img').eq(1).attr('src',src2);
            $('.go_video').find('li').eq(1).attr('video-id', id2);
            $('.go_video').find('.name_video').eq(1).find('i').text(name2);
            $('.go_video').find('.name_video').eq(1).find('b').text(num2);
            $('.homelead_con').find('.go_video').show()
            $('.no_drive_container').hide();
        })
        .fail(function() {
            console.log("error");
        })
        .always(function() {
            console.log("complete");
        });       
    })
    //点击视频
    $('.go_video').on('click','li',function(){
        var id = $(this).attr('video-id');
        var src = 'http://www.vronline.com/media/play/'+id;
        $('.loading').hide();
        $('#main').attr('src',src).show();
        $('.homelead_con').hide();
    });
    
    $('body').on('click','.homelead_con .game_btn',function(){
        $.ajax({
           url: 'http://www.vronline.com/newer/top/vrgame',
           type: 'GET',
           dataType: 'JSON',
            json:"callback",
           data:'',
       })
       .done(function(data) {
            
            var src1='https://image.vronline.com/'+ data.data.recommend.data[0].image.logo;
            var id1= data.data.recommend.data[0].id;
            var name1 = data.data.recommend.data[0].name;
            var num1 = data.data.recommend.data[0].play;
            var src2= 'https://image.vronline.com/'+data.data.recommend.data[1].image.logo;
            var id2 = data.data.recommend.data[1].id;
            var name2 = data.data.recommend.data[1].name;
            var num2 = data.data.recommend.data[1].play;
            $('.go_detail .detail_con .in_detail').eq(0).attr('game-id',id1);
            $('.go_detail .detail_con .in_detail').eq(0).find('img').attr('src',src1);
            $('.go_detail .detail_con .in_detail').eq(0).find('.in_detail_bottom  i').text(name1);
            $('.go_detail .detail_con .in_detail').eq(0).find('.in_detail_bottom b').text(num1);
            $('.go_detail .detail_con .in_detail').eq(1).attr('game-id',id2);
            $('.go_detail .detail_con .in_detail').eq(1).find('img').attr('src',src2);
            $('.go_detail .detail_con .in_detail').eq(1).find('.in_detail_bottom  i').text(name2);
            $('.go_detail .detail_con .in_detail').eq(1).find('.in_detail_bottom b').text(num2);
            $('.has_drive_con ').hide();
            $('.homelead_con').find('.go_detail').show();
       })
       .fail(function() {
           console.log("error");
       })
       .always(function() {
           console.log("complete");
       });
      // $(this).parents('.homelead_con').find('.go_detail').show()
      // $(this).parents('.no_drive_container ').hide();
    });
    //点击vrgame
    $('body').on('click','.go_detail .in_detail',function(){
        var id = $(this).attr('game-id');
        console.dir(id);
        //进入详情页
        $(this).parents('.mask').hide();
        var src = 'http://www.vronline.com/vrgame/'+id;
        $('.loading').hide();
        $('#main').attr('src',src).show();
        $('#main').load(function(){
            var id = $('#main').attr('src');
            if(id == src){
                if($('.vr_game_download_btn .btn').hasClass('ban')){
                    $('.tips_login').show();
                }
            }
        });
    });
    //点击去3d播播看看
    $('.remind_con').on('click','.button_3d',function(){
        $(this).parents('.mask').hide();        
        $('#main').attr('src','http://www.vronline.com/media/?platform=pc');
    });
    //点击进入vr助手
    $('body').on('click','.slide .into ',function(){
        $(this).parents('.mask').hide();
    });
    //点击登录
    $('body').on('click','.tips_login  .tips_login_btn',function(){
        PL.callFun('loginframe', 'prelogin', '');
    });
    $('body').on('click','.tips_login  .tips_login_in_btn ',function(){
        for(var i = 0 ;i < 7; i++){
            $('#registerForm p').eq(i).find('input').val('');
            $('#registerForm p').eq(i).find('span').removeClass('error_msg');
            $('#registerForm p').eq(i).find('span').text('');
            $('#registerForm p').eq(i).find('input').css({
                'border-color':'#828f9e'
            })
        }
        $('.login_mask').show();
        $('.tips_login').hide();
        $('.login_enter_mask').hide();
        $('#login_phoneNum').focus();
    });
  })


//显示平台介绍
function showPlatformInfor(){
    
}

//跳转到某款游戏详情页
function goGameDetail(data){
    //console.dir(id)
    var src = 'http://www.vronline.com/vrgame/'+data.id;
    $('#main').attr('src',src).show();
    $('.loading').hide();
    $('.add_title').find('li.vrgame').addClass('cur').siblings('').removeClass('cur')
}


//设备的类型
function getDrive(data){
    switch(data.deviceType){
        case 6:
            $('.has_drive_con').find('ul li').eq(0).addClass('cur').siblings('').removeClass('cur');
        break;
        case 1:
            $('.has_drive_con').find('ul li').eq(1).addClass('cur').siblings('').removeClass('cur');
        break;
        case 2:
            $('.has_drive_con').find('ul li').eq(2).addClass('cur').siblings('').removeClass('cur');
        break;
        case 3:
            $('.has_drive_con').find('ul li').eq(2).addClass('cur').siblings('').removeClass('cur');
        break;
        case 4:
            $('.has_drive_con').find('ul li').eq(3).addClass('cur').siblings('').removeClass('cur');
        break;
        default:
            $('.has_drive_con').find('ul li').eq(4).addClass('cur').siblings('').removeClass('cur');
        break;
    }
}
//设备的下载进度
function driveDown(data){
    if(data.pro!=''){
        $('.has_drive_con ul li.cur').find('.in_press').css('width', data.pro+'%');
        $('.has_drive_con ul li.cur').find('.download_con').show();
    }
    if(data.pro == 100){
        $('.has_drive_con ul li.cur').find('.drive_name ').text('安装完成');
        $('.has_drive_con ul li.cur').find('.download_con').show();

    }
}



//显示下载提示
function showDownloadTip(){
    $('.remind_con').show();
}

////显示第一次登录后的下载提示
function showInstallTips(){
    $('.tips_login').hide();
    $('.setup_con').show();
}