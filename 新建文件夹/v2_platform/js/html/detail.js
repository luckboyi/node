
//不显示按钮区域
function vr_game_btn_hide(){
    $('.in_platform_con .vr_game_download_btn').removeClass('show');
    $('.vr_con_height').height($('.con_hei').height());
    $('.vr_con_height #main').height($('.con_hei').height());
}
//游戏详情页显示的内容
function vr_online_game_show_btn(){
    var hei =$('.con_hei').height()-110;
    console.dir(hei);
    $('.in_platform_con .vr_game_download_btn').addClass('show');
    $('.vr_con_height').height(hei);
    $('.vr_con_height #main').height(hei);
    //未登录的时候
    //console.dir(hei)
    if($('.user .name').html()  == ''){
        $('.un_sup_vr_login').show();
    }else{
        $('.un_sup_vr_login').hide();
    };
    //支持魔兽tips
    //vr模式切换按钮
    $('.sup_vr_btn ').hide();
    //支持vr模式的本地游戏的登录
    $('.sup_vr_login').hide();
    //未检测设备tips
    $('.un_service_tips').hide();
    //不支持vr模式的本地游戏
    $('.un_service_title ').hide();
}
//本地游戏的按钮显示
function vr_local_game_show(){
    $('.in_platform_con .vr_game_download_btn').addClass('show');
}
//本地游戏支持vr模式
function local_game_sup_vr(){
    //显示vr模式btn
    $('.in_platform_con .vr_game_download_btn').addClass('show');
    if($('.user .name').html() == ''){
        $('.sup_vr_btn ').hide();
    }else{
        $('.sup_vr_btn').show();
    }
    $('.un_service_title ').hide();
    $('.un_sup_vr_login').hide();
    //是否登录
    if($('.user .name').html()  == ''){
        $('.sup_vr_login').show();
    }else{
        $('.sup_vr_login').hide();
    }
}
//本地游戏不支持vr模式
function local_game_un_sup_vr(){
    $('.in_platform_con .vr_game_download_btn').addClass('show');
    $('.sup_vr_btn ').hide();
    $('.un_sup_vr_login').hide();
    $('.sup_vr_login').hide();
    $('.un_service_tips').hide();
    $('.un_service_title').show();
}
//是否显示支持魔兽的提示
function vr_sup_tips(data){
    if(data.state == 1){
        $('.vr_sup_tips').show();
        $('.un_service_tips').hide();
    }else{
        $('.vr_sup_tips').hide();
    }
}
//是否显示设备没有的tips
function un_service_tips(data){
    if(data.state == 1){
        $('.un_service_tips').show();
    }else{
        $('.un_service_tips').hide();
    }
}
//是否插入设备
function usable_vr(data){
    if(data.state == 1){
        clickVr3d();
    }else{
        unClickVr3d();
    }
}
//v模式不可点
function unClickVr3d(){
    $('.sup_vr_btn .in_btn').unbind('click');
}
function clickVr3d(){
    $('.sup_vr_btn .in_btn').unbind('click').on('click',function(){
        //$(this).addClass('close');
        if($(this).hasClass('close')){
            $(this).removeClass('close').addClass('open').find('b').html('on');
        }else{
            $(this).removeClass('open').addClass('close').find('b').html('off');
        }
    });
}

//登录成功后隐藏未登录的提示
function hide_login_tips(){
    $('.un_sup_vr_login').hide();
    $('.sup_vr_login').hide();
}

//下载提示
function download_tips_show(){
    $('.download_tips').show();
}
//下载提示隐藏
function download_tips_hide(){
    $('.download_tips').hide();
}
function download_tips_data(data){
    $('.download_tips').html(data.txt);
}
//充值中心加载
function chargereload(){
    var src = $('#main').attr('src');
    $('#main').attr('src',src);
}
