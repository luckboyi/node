//游戏左侧列表html
function leftListHtml(val) {
    if(val.game_id >= 2000000){
        var html = '<li class="in_side_con left_list_con clearfix" vr-support="'+val.sup_vr+'" game-id="' + val.game_id + '" gameName="'+ val.title +'"><a href="javascript:;">\
                    <div class="lise_content clearfix">\
                    <img src="' + val.imgSrc + '" />\
                    <div class="fl pr">';
        if(val.sup_vr  == 1){
            html += '<i class="vr_sup_icon"></i>';
        }
        html +='<p class="title" title=' + val.title +'>' + val.title + '</p>';
        for (var i = 0; i < val.tag.length; i++) {
            html += ' <span>' + val.tag[i] + '</span>';
        };
        html += '</div></div></a></li>';
        $('.local_game_list  ul').prepend(html);
    }else{
        var html = '<li class="in_side_con left_list_con clearfix vrgame_left_list" vr-support="'+val.sup_vr+'" game-id="' + val.game_id + '" gameName="'+ val.title +'">\
                        <a href="javascript:;" class="pr">\
                            <img src="' + val.imgSrc + '" >\
                            <p class="title pa" title=' + val.title +'>' + val.title + '</p>\
                        </a>\
            </li>';
        $('.online_game_list ul').prepend(html);
    }
};
//获取vr游戏左侧列表数据
function getLeftRecords(data){
    $(data).each(function(key,val){
        leftListHtml(val);
    });
    scrollBar();
    unlogin_nogame_show();
};
//获取数据左侧列表下载
function download_progress(val){
    $('.vr_list_progress').detach();
    var style = "width:"+val.percent+"%";
    html ='<p class="vr_list_progress pr"><i class="in_download_pro pa" style="'+style+'"></i></p>';
    for(var i= 0 ; i<$('.online_game_list .in_side_con ').length; i++ ){
        if(val.game_id == $('.in_side_con ').eq(i).attr('game-id') ){
            $('.vr_game_list_hei .online_game_list  .in_side_con a').eq(i).append(html);
        }
    };
};
//获取左侧列表下载数据
function getLeftDownRecords(data){
    $(data).each(function(key,val){
        download_progress(val);
        if(val.status == 1){
            $('.vr_list_progress').show().parents('a').find('p.title').hide();
        }else{
            $('.vr_list_progress').hide().parents('a').find('p.title').show();
        }
    });
};
//删除左侧列表
function deleteRecords(data){
    $(data).each(function(key,val){
        if(val.game_id >= 2000000){
            for(var i= 0 ; i<$('.local_game_list').find('li.in_side_con').length; i++ ){
                if(val.game_id == $('.local_game_list .in_side_con ').eq(i).attr('game-id')){
                    $('.local_game_list .in_side_con').eq(i).detach();
                }
            }
        }else{
            for(var i= 0 ; i<$('.online_game_list').find('li.in_side_con').length; i++ ){
                if(val.game_id == $('.online_game_list .in_side_con ').eq(i).attr('game-id')){
                    $('.online_game_list .in_side_con').eq(i).detach();
                }
            }
        }

    })
}
//左侧列表选中list选中
function selectListFn(data){
    $(data).each(function(key,val){
        for(var i= 0 ; i<$('.in_side_con ').length; i++ ){
            if(val.game_id == $('.in_side_con ').eq(i).attr('game-id') ){
                $('.in_side_con').eq(i).addClass('cur').siblings().removeClass('cur')
            }
        }
    })
};
//改变左侧礼拜的图片
function changeGameListImg(data){
    $(data).each(function(key,val){
        for(var i=0;i< $('li.in_side_con').length;i++){
            if(val.game_id == $('li.in_side_con').eq(i).attr('game-id')){
                $('li.in_side_con').eq(i).find('img').attr('src',val.img);
            }
        }
    })
}
//清空左侧列表
function gamelist_empty(){
    $('.vr_game_list_hei ul').empty();
};
//游戏列表事件
function downloadStatue(data){
    switch (data.fun){
        case "enable":
            $('.vr_game_download_btn .btn').removeClass('ban');
            break;
        case "disable":
            $('.vr_game_download_btn .btn').addClass('ban');
            break;
        case 'settext':
            $('.vr_game_download_btn .btn').text(data.text);
            break;
        case 'gameid':
            $('.vr_game_download_btn .btn').attr('game-id',data.text);
            break;
    };
};
function downloadProgress(data){
    switch (data.fun){
        case "setpro":
            $('.vr_game_download_btn .schedule .do_in_sch ').width(data.text.percent+'%');
            $('.vr_game_download_btn .schedule .in_text').text(data.text.txt);
            break;
        case "show":
            $('.vr_game_download_btn .schedule').addClass('show');
            break;
        case "hide":
            $('.vr_game_download_btn .schedule').removeClass('show');
            break;
        case "unable":
            $('.vr_game_download_btn .schedule .do_in_sch').removeClass('unable');
            break;
        case 'disable':
            $('.vr_game_download_btn .schedule .do_in_sch').addClass('unable');
            break;
    }
}

//左侧列表的事件
//下载
$(function(){

    $('.vr_game_download_btn .btn').on('click',function(){
        var game_id = $(this).attr('game-id');
        $('.setup_con').hide();
        if($(this).parents('.vr_game_download_btn').find('.sup_vr_btn .in_btn').hasClass('close')){
            var openvr = 0;
        }else{
            var openvr = 1
        }
        //
        //
        PL.callFun('gameframe', 'gamefuncclicked', '{"game_id":'+game_id+',"openvrmode":'+openvr+'}');
    });
    //点击vr游戏展开
    $('body').on('click','.left_list_title',function(){
        $(this).toggleClass('cur');
        if($(this).hasClass('cur')){
            $(this).next('ul').show();
        }else{
            $(this).next('ul').hide();
        };
        platformRisze();
    });
    //点击本地游戏
    /*$('.local_game_list').on('click','.left_list_title',function(){
        $(this).toggleClass('cur');
    });*/
    /*点击左侧选中*/
    $('body').on('click','li.in_side_con',function(){
        $(this).parents('.game_list').siblings('').find('li.in_side_con').removeClass('cur');
    });
    //左侧点击事件
    $('body').on('click','.vr_game_list_hei li.in_side_con',function(){
        var game_id = $(this).attr('game-id');
        var vr_sup = $(this).attr('vr-support');
        PL.callFun('gamelistframe', 'item_clicked', '{"game_id":'+game_id+'}');
        $(this).addClass('cur').siblings().removeClass('cur');
        if(game_id >=2000000){
            var url = './startGame/localgame.html';
            $('#main').attr('src',url);
            var imgSrc = $(this).find('img').attr('src');
            var title = $(this).find('.title').html();
            var html ;
            if(vr_sup == 1){
                    /*支持vr3d*/
                    html = '<div class="local_detail clearfix">\
                                <div class="local_detail_header fl">\
                                    <h4 class="vr_sup">'+title+'</h4>\
                                    <div>\
                                        <img src="'+imgSrc+'">\
                                    </div>\
                                </div>\
                                <div class="local_msg clearfix fl">\
                                    <h4 class="language " data-name="game_plain">游戏简介</h4>\
                                    <div class="fl">\
                                        <p>\
                                            <i class="fl language" data-name="click_start">点击下方的“开始”按钮，即可启动</i>\
                                            <b class="fl">《</b>\
                                            <span class="fl">'+title+'</span>\
                                            <b class="fl">》</b>\
                                        </p>\
                                        <p class="clearfix vr_play_game">\
                                            <i class="fl language" data-name="support">我们支持</i><b class="fl language" data-name="overwatch">守望先锋</b><i class="fl">、</i><b class="fl language" data-name="wow">魔兽世界</b><i class="fl language" data-name="vr_play">以VR模式运行</i>\
                                        </p>\
                                        <p class="support_vr language show" data-name="">本游戏支持用VR模式运行</p>\
                                    </div>\
                                </div>\
                            </div>\
                            <div class="vr_3d_course show">\
                                <h4 class="language" data-name="hove_open_vr_model">如何启动VR模式</h4>\
                                <div class="clearfix vr_con">\
                                    <div class="fl">\
                                      <div class="fl tips1">\
                                        <p class="tips_title language" data-name="first_step">第一步</p>\
                                        <p class="language" data-name="click_start_vr">点击按钮，开启VR模式</p>\
                                      </div>\
                                      <div class="fl vr_btn language" data-name="vr_model">VR模式</div>\
                                    </div>\
                                    <div class="fl">\
                                        <div class="fl tips2">\
                                            <p class="tips_title language" data-name="secend_step">第二步</p>\
                                            <p class="language" data-name="click_start_btn">点击开始按钮</p>\
                                        </div>\
                                        <div class="fl start_btn language" data-name="started" style="margin: 8px 0 0 18px;">开始</div>\
                                    </div>\
                                </div>\
                                <h4 class="language" data-name="warm_prompt">温馨提示</h4>\
                                <p class="language" data-name="if_open_vr">如果您的“开启VR模式”按钮无法开启，请确认设备是否插好，是否安装了最新驱动</p>\
                            </div>';
                    local_game_sup_vr();
                document.getElementById("main").onload =function(){
                    window.frames['main'].document.getElementById('local_detail_con').innerHTML=html;
                };
            }else{
                html='<div class="local_detail_header fl" style="color: #fff">\
                            <h4 style="color: #fff" >'+title+'</h4>\
                            <div>\
                            <img src="'+imgSrc+'">\
                            </div>\
                        </div>\
                        <div class="local_msg clearfix fl">\
                            <h4 class="language " data-name="game_plain"  style="color: #fff">游戏简介</h4>\
                            <div class="fl">\
                                <i class="fl language" data-name=""  style="color: #fff">点击下方的“开始”按钮，即可启动</i>\
                                <b class="fl"  style="color: #fff">《</b>\
                                <span class="fl"  style="color: #fff">'+title+'</span>\
                                <b class="fl"  style="color: #fff">》</b>\
                            </div>\
                            <p class="clearfix vr_play_game" style="color: #fff;">\
                                <i class="fl language" data-name="support">我们支持</i><b class="fl language" data-name="overwatch">守望先锋</b><i class="fl">、</i><b class="fl language" data-name="wow">魔兽世界</b><i class="fl language" data-name="vr_play">以VR模式运行</i>\
                            </p>\
                    </div>';
                local_game_un_sup_vr();
                document.getElementById("main").onload =function(){
                    window.frames['main'].document.getElementById('local_detail_con').innerHTML=html;
                };
            };
            $('body').css('background','#191f2d url(image/bg.jpg) top center no-repeat');
        }else{
            var url = 'http://www.vronline.com/vrgame/'+ game_id;
            $('#main').attr('src',url);
            vr_online_game_show_btn();
        };
    });
    //左侧右键事件
    $('body').on('mousedown','.vr_game_list_hei li.left_list_con',function(e){
        var left = e.pageX;
        var top = e.pageY;
        var winHeight = window.innerHeight;
        //列表页 点击左键列表进入详情页
        if( 3 == e.which){
            //alert(left)
            $('.delete').detach();
            html = '<ul class="delete pa"><li><p>x</p><span class="in_delete language" data-name="">删除</span></li></ul>'
            $(this).append(html);
            $('.delete').show();
            if(top+80< winHeight){
                $('.delete').css({
                    'left':left,
                    'top':top
                })
            }else{
                $('.delete').css({
                    'left':left,
                    'top':top-60
                })
            }
        }
        e.stopPropagation();
        //alert($('.delete li').length)
    });
    //左侧列表右键删除
    $('body').on('click',' li.in_side_con .delete li',function(e){
        var game_id =$(this).parents('li.in_side_con').attr('game-id');
        $(this).parents('.delete').hide();
        if($(this).find('span').hasClass('in_delete')){
            $('.confirmation').show();
            if($(this).parents('.in_side_con').attr('game-id') < 2000000){
                $('.delete_local').show();
            }else{
                $('.delete_local').hide();
            }
            $('.confirmation div.sure').on('click',function(){
                $('.confirmation').hide();
                //删除列表信息
                if($('.in_confirmation input').is(":checked")){
                    PL.callFun('gamelistframe', 'menu_deletegame', '{"game_id":'+game_id+',"delete_localGame":1}');
                }else{
                    PL.callFun('gamelistframe', 'menu_deletegame', '{"game_id":'+game_id+',"delete_localGame":0}');
                };
                $('#main').attr('src','http://www.vronline.com/vrgame/')
            });
            $('.confirmation div.cancel').on('click',function(){
                $('.confirmation').hide();
            })
        }else if($(this).find('span').hasClass('exie')){
            $('.delete').detach();
        }
        e.stopPropagation();
    });

    //dianji 登录
    $('.submit_enter').on('click',function(){
        login_enterFn();
    });
});



//显示关于vr
function showVrStep(){
    $('.about_vr_stip1').show();
    $('.about_vr_stip1').on('click','.sure',function(){
        $('.about_vr_stip1').hide();
        $('.about_vr_stip2').show();
    });
    $('.about_vr_stip2').on('click','.sure',function(){
        $('.about_vr_stip2').hide();
    });
};
//测试代码
$(function(){
   /* $('.add_title .btn ').on('click',function(){
    });*/
});


//左侧列表未登录的时候提示并且没有游戏的时候
function unlogin_nogame_show(){
    //判断是否登录
    if($('.online_game_list').find('ul li').length>0 && $('.user .name').html()  != ''){
        $('.online_game_list').show();
    }else{
        $('.online_game_list').hide();
    }
    if($('.local_game_list').find('ul li').length>0){
        $('.local_game_list').show();
    }else{
        $('.local_game_list').hide();
    }
}


//获取左侧热门游戏的列表
function getHotListFn(){
    $('.hot_game_list ul').html('');
    $.ajax({
        url:'http://www.vronline.com/hotvrgame?num=4',
        async:true,
        type:'GET',
        dataType:'json',
        json:"callback",
        success: function(data){
            $(data.data).each(function(key,val){
                getHotList(val);
            })
        }
    })
}

function getHotList(val){
    var html ='<li class="in_side_con clearfix" game-id="' + val.id + '" gameName="'+ val.title +'"  title="'+val.name+'">\
                    <a href="javascript:;" class="pr">\
                        <img src="'+val.logo+'" >\
                        <p class="game_title pa">\
                            <span class="fl els">'+val.name+'</span>\
                            <span class="fr els">评分：'+val.score+'</span>\
                        </p>';
        if(val.sell == 0){
            html +='<i class="price pa free hide">免费</i>';
        }else{
            html +='<i class="price pa free hide">$'+val.sell+'</i>';
        }
        html+='</a> </li>';
    $('.hot_game_list ul').append(html);
}
