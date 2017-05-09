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
                    case 'vrOpen':
                        vrOpen();
                        break;
                    case 'vrClose':
                        vrClose();
                        break;
                }
                break;
            case 'pageGame':
            	switch(fn){
            		case 'startGame':
                        chooseGameSuit(data);
            		    break;
            	}
                break;
            case 'charge':
                switch (fn){
                    case 'charge':
                        chargeData(data);
                        break;
                }
                break;
            case 'video':
                switch (fn){
                    case 'addLocalVideo':
                        addLocalUrl(data);
                        break;
                }
                break;
            case 'localgameframe':
                switch (fn){
                    case 'local_detail':
                        localDetaiDate(data);
                        break;
                    case 'access_drive':
                        getDriveRecords(data);
                        getMenuRecords(data);
                        break;
                    case 'access_download_drive':
                        getDriveDownloadRecords(data);
                        break;
                    case 'update_drive':
                        updateDriveRecords(data);
                        break;
                    case 'delete_drive':
                        deleteDrive();
                        break;
                }
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
    $('.pageGame_window .manager .closeplate').on('click',function(){
        //点击最大化
        //如果是最大化添加类名
        window.CppCall('common', 'close','');
    });
};

function addLocalUrl(data){
    if(data.src !=''){
        $('.add_local_btn').hide();
        var html = '<div class="valiantPhoto" data-video-src="'+data.src+'" style="width: 100%; height: 100%;background: #000"></div>';
        $('.video_play_box').html(html);
        $('.valiantPhoto').Valiant360({
            clickAndDrag:true,
            muted:false
        });
    }
};


//vr模式开启
function vrOpen(){
    $('body').find('.vr_btn').addClass('cur');
}
//vr模式关闭
function vrClose(){
    $('body').find('.vr_btn').removeClass('cur');
}
