/**
 * Created by zhengy on 2016/11/14.
 */
//显示驱动
function driveShow(data){
    $('.add_title li.drive').addClass('show');
    $('.add_title li.drive').text(data.name);
}
//隐藏驱动
function driveHide(){
    $('.add_title li.drive').removeClass('show');
    $('.drive_con').hide();
}
// 驱动的名称
function drive_name(data){
    var html = '<h3 class="act_title language" data-name="">欢迎使用'+data.name+'</h3>';
    $('.drive_con .drive_name').html(html);
}
//错误的提示信息
function drive_erro_info(data){
    var html ='<p>您的显卡为：<b class="erroColor">'+data.gpu+'，</b>'+data.title+'<b class="erroColor">暂不支持</b>'+data.msg+'！</p>';
    $('.drive_con .drive_information').html(html);
    var imgHtml = '<img src="'+data.imgsrc+'"/>';
    $('.drive_con .act_img').html(imgHtml);
    $('.drive_undown').hide();
}
//驱动的信息
function drive_information(data){
    var html ='<p class="act_text f14">'+data.txt+'</p>';
    $('.drive_con .drive_information').html(html);
    var imgHtml = '<img src="'+data.imgsrc+'"/>';
    $('.drive_con .act_img').html(imgHtml);
    $('.drive_undown').show();
}
//驱动的下载信息
function drive_pro(data){
    $('.drive_con .drive_schedule ').show();
    var pro = parseInt(data.pro)/10+'%';
    var html = '<div class="do_in_sch pr fl"  style="width:'+pro+'">\
            <i class="do_btn"></i>\
        </div>\
        <div class="pa clearfix fl download_text hide" id="drive_down_pro">\
            <div class="clearfix text_pro" style="left:5px; top:0;">\
                <p class="fl">'+data.txt+'</p>\
                <div class="spinner fl hide"><div class="bounce1"></div><div class="bounce2"></div><div class="bounce3"></div></div>\
            </div>\
        </div>';
    $('.download_pro_text b').html(pro);
    $('.drive_con .in_sch').html(html);
};
//显示按钮
function show_downBtn(data){
    if(data.state == 1){
        $('.drive_con .drive_undown').show();
    }else{
        $('.drive_con .drive_undown').hide();
    }
}
//显示下载页
function showDrive_pro(){
    $('.drive_download_con').show();
}
//隐藏下载页
function hideDrive_pro(){
    $('.drive_download_con').hide();
}
//显示下载进度按钮
function drive_pro_show(){
    $('.drive_con .drive_schedule ').show();
};
//隐藏下载进度按钮
function drive_pro_hide(){
    $('.drive_con .drive_schedule').hide();
};
//继续下载
function continue_down(){
    $('body').find('.drive_schedule span').addClass('pause');
}
//暂停下载
function pause_down(){
    $('body').find('.drive_schedule span').removeClass('pause');
}
$(function(){
    $('.fail_install_btn').on('click',function(){
        PL.callFun('driverframe','startinstall','');
    });
    $('body').on('click','.drive_schedule span',function(){
            PL.callFun('driverframe','pauseresumeinstall','');
    });
    //点击vrgame
    /*$('body').on('click','.suc_drive .vrgame',function(){
        vrGameShow();
    });
    $('body').on('click','.suc_drive .media',function(){
        videoShow();
    })*/
    /*var data2 ={
    msg:['123','请先更新至最新版本后再同步至其它客机电脑中！'],////信息
    btnTxt:['确定','取消'],
    callback:function(){
        
    }
    }
    tipsWindow(data2)*/
});
//显示安装成功
function showInstallSuc(){
    $('.suc_drive').show();
}
//隐藏安装成功
function hideInstallSuc(){
    $('.suc_drive').hide();
}
//显示安装失败
function showInstallFail(){
    $('.fail_drive').show();
}
//隐藏安装失败
function hideInstallFail(){
    $('.fail_drive').hide();
}
//显示loading
function showInstallLoading(){
    $('.loading_drive').show();
}
//隐藏loading
function hideInstallLoading(){
    $('.loading_drive').hide();
}


