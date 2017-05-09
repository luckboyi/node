function MainFn() {
    //函数调用
    function interface(module,fn,data){
        //data = data == undefined?JSON.parse(data): data;
        data = data != ''?JSON.parse(data):data;
        switch(module){
            case 'main_panel':
                switch (fn) {
                    case 'next':
                        break;
                    case 'min':
                        break;
                    case 'max':
                        maxFn(data);
                        break;
                    case 'setdevice':
                        showDrive(data);
                        break;
                    case 'seturl':
                        seturl(data);
                        break;
                    case 'updatetime':
                        updatetime(data);
                        break;
                    case 'tipsWindow':
                        tipsWindow(data);
                }
                break;
            case 'login':
                switch(fn){
                    case 'login_in':
                        loginReminderData(data);
                        break;
                    case 'login_state':
                        successLoginData(data);
                        userMsgData(data);
                        break;
                    case 'register':
                        registerSucData(data);
                        break;
                    case 'erroThree':
                        erroThree(data);
                        break;
                    case 'verification':
                        checkVerification(data);
                        break;
                    case 'select_phoneNum':
                        selectUserDate(data);
                        break;
                    case 'verificationCheck':
                        verificationData(data);
                        break;
                    case 'checkaccountres':
                        checkaccountres(data);
                        break;
                    case 'show_login':
                        showLogin();
                        break;
                    case 'user_logout':
                        user_logout();
                        break;
                    case 'update_usermsg':
                        update_usermsg(data);
                        break;
                    case 'offline_login':
                        offline_login();
                        break;
                    case 'network_error':
                        network_error();
                        break;
                    case 'show_code':
                        show_code(data);
                        break;
                    case 'checkcode':
                        checkcode(data);
                        break;
                    case 'refresh_page':
                        refresh_page();
                        break;
                }
                break;
            case 'drive':
                switch (fn){
                    case "show_drive_title":
                        driveShow(data);
                        break;
                    case "hide_drive_title":
                        driveHide();
                        break;
                    case "drive_name":
                        drive_name(data);
                        break;
                    case "drive_information":
                        drive_information(data);
                        break;
                    case "drive_pro":
                        drive_pro(data);
                        break;
                    case "drive_pro_show":
                        drive_pro_show();
                        break;
                    case "drive_pro_hide":
                        drive_pro_hide();
                        break;
                    case "continue_down":
                        continue_down();
                        break;
                    case "pause_down":
                        pause_down();
                        break;
                    case "drive_erro_info":
                        drive_erro_info(data);
                        break;
                    case 'show_downBtn':
                        show_downBtn(data);
                        break;
                    case 'showInstallSuc':
                        showInstallSuc();
                        break;
                    case 'hideInstallSuc':
                        hideInstallSuc();
                        break;
                    case 'showInstallFail':
                        showInstallFail();
                        break;
                    case 'hideInstallFail':
                        hideInstallFail();
                        break;
                    case 'showInstallLoading':
                        showInstallLoading();
                        break;
                    case 'hideInstallLoading':
                        hideInstallLoading();
                        break;
                    case 'showDrive_pro':
                        showDrive_pro();
                        break;
                    case 'hideDrive_pro':
                        hideDrive_pro();
                        break;
                }
                break;
            case 'list':
            var data = data != ''?JSON.stringify(data):data;
                //console.dir(data);
                var data = '{"type":"' + fn + '","data":'+ data + '}'; 
                getgamestate(data);
                break;


        }
    };


    return {interface:interface}
}

var mainFn = new MainFn();
//最大化 最小化
function  maxFn(data){
    $(data).each(function(key,val){
        if(val.window_state == 0 ) {
            $('.manager div.max').removeClass('minMax');
        }else {
            $('.manager div.max').addClass('minMax');
        }
    })



}
function windowFn(){
    $('.pageGame_window .manager .mini').on('click',function(){
        //
        window.CppCall('common', 'min','');
    });
    $('.pageGame_window .manager .max').on('click',function(){
        //点击最大化
        //如果是最大化添加类名
        window.CppCall('common', 'max','');
    });
    $('.pageGame_window .manager .close').on('click',function(){
        //点击最大化
        //如果是最大化添加类名
        window.CppCall('common', 'close','');
    });
};

//显示驱动名称
function showDrive(data){
    if(data.devname !=''){
        //alert(data.devname)
        $('.header_tool .drive_name').show();
        $('.header_tool .drive_name b').text(data.devname);
    }
    if(data.img !=''){
        $('.drive_name img').attr('src',data.img);
    }

}
//写入ifrme的url
function seturl(data){
    
    $('#iframe_con').attr('src',data.url);
    iframeLoad();
}

//显示时间
function updatetime(data){
    $('.time_remain').show();
    $('.time_remain i').text(data.txt);
}


function iframeLoad(){
    $('#iframe_con').load(function(){
        $('.loading').hide();
        $('#iframe_con').show();
    });
}



function getgamestate(data){

    $(function(){
        var  win = document.getElementById('iframe_con').contentWindow;
        console.dir(data);
        win.postMessage(data,'*');
    })
    
}



function tipsWindow(data){
    $('body').tipsFn(data);
}

/*$(function(){
    $('body').tipsFn({
        msg:['当前游戏有最新版本！','请先更新至最新版本后再同步至其它客机电脑中！'],////信息
        btnTxt:['确定','取消'],
    });
})
*/