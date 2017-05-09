var app = angular.module('myApp',['ui.router']);

if (window.CppCall == undefined) {
    window.CppCall = function () {};
}
app.controller('headerController',function($scope){});
app.controller('driveController',function($scope){});
app.controller('leftListController',function($scope){});
app.controller('storeListController',function($scope){});

app.directive('ngRightClick', function($parse) {
    return function(scope, element, attrs) {
        var fn = $parse(attrs.ngRightClick);
        element.bind('contextmenu', function(event) {
            scope.$apply(function() {
                event.preventDefault();
                fn(scope, {$event:event});
            });
        });
    };
});

app.config(function($stateProvider,$urlRouterProvider){
    $stateProvider
        .state('game',{
            url:'/game',
            templateUrl:'./pbl/html/list.html'
        })
        .state('game.detail',{
            url:'/detail/:game_id',
            templateUrl:'./pbl/html/detail.html',
            controller:function($scope, $stateParams) {
                $scope.game_id = $stateParams.game_id;
            }
        })
        .state('drive',{
            url:'/drive',
            templateUrl:'./pbl/html/drive.html',
            controller:'driveController'
        });
    $urlRouterProvider.otherwise('/drive');
});
        app.controller('headerController',function($scope){
            var curAnchor = window.location.hash;
            switch(curAnchor){
                case"#/game":
                    $scope.gamecursor = true;
                    $scope.drivercursor = false;
                    break;
                case"#/drive":
                    $scope.gamecursor = false;
                    $scope.drivercursor = true;
                    break;
                default:
                    $scope.gamecursor = true;
                    $scope.drivercursor = false;
                    break;

            };
            $scope.isShow = true;
            $scope.go = function(event){
                var type = event.target.getAttribute('data-type');
                switch (type){
                    case 'go':
                        window.history.go(1);
                        break;
                    case 'back':
                        window.history.go(-1);
                        break;
                }
                setTimeout(function(){
                    var curAnchor = window.location.hash;
                    //console.dir(curAnchor)
                    if(curAnchor == '#/drive'){
                        $scope.gamecursor = false;
                        $scope.drivercursor = true;
                    }else if(curAnchor == '#/game'){
                        $scope.gamecursor = true;
                        $scope.drivercursor = false;
                    }else if(curAnchor == '#/game/detail/'){
                        $scope.gamecursor = true;
                        $scope.drivercursor = false;
                    }
                },1)
            }
        });

function MainFn() {
    var gameListDataCon,gameListDataPro,gameListDataStatus,gameListLocalData,gameListLocalListDate;
    var storeListDataCon;
    var detailDataCon,detailDataPro,detailDataStatus ;
    var driveDataCon,driveDataPro,driveDataStatus ;
    //配置路由
    //驱动页
    function getDriveRecords(dataCon,dataPro,dataStatus){
        app.controller('driveController',function($scope){
            $scope.driveBtn = true ;
            $scope.pause = false ;
            $scope.driveMs = dataCon;
            $scope.driveBtn = function(){
                $scope.driveBtn = false ;
                $scope.drivePro = true;
                $scope.driveDow = dataPro;
            };
            $scope.stopBtn=function(){
                $scope.pause = ! $scope.pause;
            }
            if(dataStatus.status == 0){
                $('.act_con .drive_schedule span').addClass('pause');
            }else if(dataStatus.status == 1){
                $scope.driveBtn = false ;
                $('.act_title ').attr('data-name','finish');
                $('.drive_schedule').hide();
            }else if(dataStatus.status == 2){
                $('.drive_schedule').show();
                $('.act_con .drive_schedule span').removeClass('pause');
            }
            setTimeout(function(){
                bindDriveEvent();
            },5)
        });
    }

    //驱动页
    //驱动数据
    function getDriveRecords(data){
        driveDataCon =data ;
        getDriveRecords(driveDataCon,driveDataPro,driveDataStatus)
    }
    //驱动下载数据
    function getDriveDownloadRecords(data){
        driveDataPro =data ;
        getDriveRecords(driveDataCon,driveDataPro,driveDataStatus)
    }
    //驱动更新状态数据
    function updateDriveRecords(data){
        driveDataStatus =data ;
        getDriveRecords(driveDataCon,driveDataPro,driveDataStatus)
    }
    //游戏列表页

    //左侧列表调用函数
    function getLeftRecords(data){
        gameListDataCon = data ;
        gameListController(gameListDataCon,gameListDataPro,gameListLocalData,gameListLocalListDate);
    }
    //左侧列表下载进度
    function getLeftDownRecords(data){
        gameListDataPro = data ;
        gameListController(gameListDataCon,gameListDataPro,gameListLocalData,gameListLocalListDate);
    }
    //左侧下载列表状态进度
    /*function list_update_statue(data){
        gameListDataStatus = data ;
        gameListController(gameListDataCon,gameListDataPro,gameListLocalData,gameListLocalListDate);
    }*/
    //添加弹框本地列表
    function addLocalRecords(data){
        gameListLocalData = data ;
        gameListController(gameListDataCon,gameListDataPro,gameListLocalData,gameListLocalListDate);
    }
    //添加左侧列表
    function addLeftRecords(data){
        gameListLocalListDate = data ;
        gameListController(gameListDataCon,gameListDataPro,gameListLocalData,gameListLocalListDate);
    }
    //商城
    function getStoreRecords(data){
        storeListDataCon = data ;
        storeListController(storeListDataCon)
    }
    //详情页
    //点击列表进入详情页
    function getDetailRecords(data){
        detailDataCon = data ;
        detailController(detailDataCon,detailDataPro,detailDataStatus)
    }
    //详情下载数据
    function updateRecords(data){
        detailDataPro = data ;
        detailController(detailDataCon,detailDataPro,detailDataStatus)
    }
    //详情下载状态
    function detail_update_statue(data){
        detailDataStatus = data ;
        detailController(detailDataCon,detailDataPro,detailDataStatus)
    }

    //左侧游戏列表
    function gameListController(dataCon,dataPro,localData,localListDate){
        app.controller('leftListController',function($scope){
            $scope.curShow = false ;
            $scope.gameList = dataCon;
            $scope.listDownload = dataPro;
            $scope.bounced = false;
            setTimeout(function(){
                //console.dir($('.in_side_con').attr('game-id'))
                for(var i=0;i<$('.in_side_con').length;i++){
                    if($('.in_side_con').eq(i).attr('game-id') == dataCon.game_id){
                        if(dataPro.status== '0'){
                            $('.in_side_con').eq(i).find('.download_progress ').hide();
                        }else if(dataPro.status== '1'){
                            $('.in_side_con').eq(i).find('.download_progress ').show();
                        }else if(dataPro.status== '2'){
                            $('.in_side_con').eq(i).find('.download_progress ').hide();
                        }
                    }
                }
                //点击左键添加cur
                $('.in_side_list').on('click','li',function(){
                    $(this).addClass('cur').siblings().removeClass('cur');
                })
                $('.in_side_con').mousedown(function(e) {
                    var left = e.pageX;
                    var top = e.pageY;
                    var game_id = $(this).attr('game-id');
                    var winHeight = window.innerHeight;
                    if(3 == e.which){
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
                    //右键点击删除
                    $scope.manage_delete = function(){
                        $scope.rightConfirm = !$scope.rightConfirm;
                        console.dir( game_id < 2000000 )
                        if(game_id < 2000000){
                            //alert($('.delete_local').length);
                            $('.delete_local').show();
                        }else{
                            $('.delete_local').hide();
                        }
                    }
                    //确定删除本地游戏
                    $scope.confirmation_sure = function(idx){
                        $scope.rightConfirm = false;
                        if($('.in_confirmation input').is(":checked")){
                            window.CppCall('gamelistframe', 'menu_deletegame', '{"game_id":'+game_id+',"delete_localGame":1}');
                        }else{
                            window.CppCall('gamelistframe', 'menu_deletegame', '{"game_id":'+game_id+',"delete_localGame":0}');
                        };
                        $scope.gameList.splice(idx,1);
                    };
                    //取消删除本地
                    $scope.confirmation_cancel = function(){
                        $scope.rightConfirm = false;
                    }
                    e.stopPropagation();
                })
                //判断左侧列表是否为空
                leftListStatus();
                //bindListEvent();
                resizeFn();
            });
            //左键点击事件
            $scope.listClick = function(idx){
                var game_id = this.list.game_id ;
                //接收数据
                window.CppCall('gamelistframe', 'item_clicked', '{"game_id":'+game_id+'}');
            }
            //点击出现弹窗
            $scope.addGame = function(){
                //弹窗显隐
                $scope.bounced= !$scope.bounced;
                //加载本地数据
                $scope.addLocalGame= localData;
                //alert(data1111.length)
                //弹窗全选
                $scope.selectAll =function(){
                    $scope.select = !$scope.select;
                }
                //点击列表
                var gameId = [];
                $scope.localSelect = function(){
                    this.select= !this.select;
                    if(this.select == true){
                        gameId=gameId.concat(this.list.game_id);
                        //console.dir(gameId)
                    }else{
                        //删除取消选择的
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
                        gameId.remove(this.list.game_id);
                    }
                    this.current = !this.current;
                    setTimeout(function(){
                        //弹框判断是否选中
                        if($('.in-con-body li').hasClass('cur')){
                            $('.in-foot div.addSelect ').addClass('cn')
                        }else{
                            $('.in-foot div.addSelect ').removeClass('cn')
                        }

                    },1)

                }
                //关闭弹框
                $scope.close = function(){
                    $scope.bounced= false;
                };
                //取消弹框
                $scope.cancel = function(){
                    $scope.bounced= false;
                }
                //点击所选程序添加本地游戏列表
                $scope.addLeftGameList= function(){
                    $scope.bounced= false;
                    /*alert(1)*/
                    /*console.dir((localListDate));*/
                    //$scope.gameList.push(localListDate[0])
                    for(var i = 0; i< localListDate.length; i++){
                        $scope.gameList.push(localListDate[i]);
                    }
                    /*for(var i = 0 ; i <localListDate.length ; i++){
                        $scope.gameList.push(localListDate[i]);
                        resizeFn();
                    }*/
                }
            };
        });
    }
    //判断左侧列表是否为空
    function leftListStatus(){
        $('.in_side_con').length >0 ? $('.no_game').hide():$('.no_game').show();
    };
    //商城列表
    function storeListController(dataCon){
        app.controller('storeListController',function($scope){
            $scope.storeList = dataCon ;
            $scope.storeClick = function(){
                var game_id = this.list.game_id
                //调用数据
                window.CppCall('gameframe', 'item_clicked', '{"game_id":'+game_id+'}');
            }
            setTimeout(function(){
                bindStoreEvent();
                resizeFn();
                changeLanguage(dataCon);
            },10)
        });

    };
    //详情页
    function detailController(dataCon,dataPro,dataStatus){
        app.controller('detailController',function($scope){
            $scope.detailDowProShow= false;
            $scope.detailDate = dataCon;
            $scope.detailDowDate = dataPro ;
            $scope.btnData = dataStatus;
            $scope.detailBtn= function(){
                $scope.detailDowProShow= true;
                switch (dataStatus.status){
                    case '0':
                        $scope.btnData.btnStatus = 'install';
                        break;
                    case '1':
                        $scope.btnData.btnStatus = 'pause';
                        $scope.detailDowProShow= true;
                        break;
                    case '2':
                        $scope.btnData.btnStatus = 'continue';
                        $scope.detailDowProShow= true;
                        break;
                    case '3':
                        $scope.btnData.btnStatus = 'started';
                        $scope.detailDowProShow= false;
                        break;
                    case '4':
                        $scope.btnData.btnStatus = 'update';
                        $scope.detailDowProShow= true;
                        break;
                }
            };
            setTimeout(function(){
                resizeFn();
                //如果小图片显示滚动条 轮播
                if($('.listBox ul li').length>4) $('.detail_btn').show();
                banner();
                //详情页配置信息切换
                tableDrive();
                //详情页下载按钮
                bindDetailEvent();
                changeLanguage(dataCon,dataPro,dataStatus);
            },10)
        });
    }
    //详情页配置信息切换
    function tableDrive(){
        $('#drive_configuration').on('click','li',function(){
            var index = $(this).index();
            $(this).addClass('cur').siblings().removeClass('cur');
            $('.message_bd ul').eq(index).show().siblings().hide();
        })
    }

    //list选中
    function selectListFn(dataCon){
        $(dataCon.data).each(function(key,val){
            for(var i= 0 ; i<$('.in_side_con ').length; i++ ){
                if(val.game_id == $('.in_side_con ').eq(i).attr('game_id') && val.title ==$('.in_side_con ').eq(i).attr('gameName') ){
                    $('.in_side_con').eq(i).addClass('cur').siblings().removeClass('cur')
                }
            }
        })
    }
    //最大化 最小化
    function  maxFn(dataCon,dataPro,dataStatus){
        $(dataCon.data).each(function(key,val){
            if(val.window_state == 0 ) {
                $('.manager i.max').css('background-position','-72px -200px');
                $('.manager i.max').hover(function(){
                    $(this).css('background-position','-72px -230px')
                },function(){
                    $(this).css('background-position','-72px -200px');
                });
            }else {
                $('.manager i.max').css('background-position','-48px -200px');
                $('.manager i.max').hover(function(){
                    $(this).css('background-position','-48px -230px');
                },function(){
                    $(this).css('background-position','-48px -200px');
                });

            }
        })
    }
    //隐藏弹框
    function bouncedHide(){
        $('.manager ul').hide();
        $('.delete').hide();
    }

    //语言
    function changeLanguage(dataCon,dataPro,dataStatus, $_tar){
        // console.log($_tar);
       /* var $tar = $_tar == undefined? $("html"): $_tar;
        $('html').find(".language").each(function(){
            var name = $(this).data('name');
            $(this).text(dataCon.data[name]);
        })
        return $tar;*/
    }
    //游戏开始调用数据
    function getStartGame(dataCon,dataPro,dataStatus){
        $(dataCon.data).each(function(key,val){
            if(val.state == 0){
                //开始游戏
                $('.download_btn .btn').data('name','in_game');
                $('.download_btn .btn').addClass('ban');
                //alert($('.download_btn div.btn').data('name'));
                window.CppCall('mainframe', 'menu_startgame', '"game_id":'+game_id+'');
            }else if(val.state == 1){
                //关闭游戏
                $('.download_btn .btn').data('name','started');
                $('.download_btn .btn').removeClass('ban');
            }
        });
        changeLanguage(dataCon,dataPro,dataStatus);

    }
    //函数调用
    function interface(module,fn,data){
        switch(module){
            case 'main_panel':
                switch (fn) {
                    case 'changeLanguage':
                        changeLanguage(data);
                        break;
                    case 'add_game':
                        addLeftRecords(data);
                        break;
                    case 'prev':
                        break;
                    case 'bounced_hide':
                        bouncedHide();
                        break;
                    case 'next':
                        break;
                    case 'min':
                        break;
                    case 'max':
                        maxFn(data);
                        break;
                    case 'close':
                        break;
                    case 'menu':
                        break;
                }
                break;
            case 'list':
                switch(fn){
                    case 'left_item':
                        getLeftRecords(data)
                        break;
                    case 'store':
                        getStoreRecords(data);
                        break;
                    case 'list_download_pro':
                        getLeftDownRecords(data);
                        break;
                    case 'add_local':
                        addLocalRecords(data)
                        break;
                    case 'delete_game':
                        deleteRecords(data);
                        break;
                    case 'select_list':
                        selectListFn(data);
                }
                break;
            case 'detail':
                switch(fn){
                    case 'detail_click':
                        getDetailRecords(data);
                        break;
                    case 'detail_online_lick':
                        getDetailRecords(data);
                        break;
                    case 'detail_add_leftList':
                        addLeftRecords(data);
                        break;
                    case 'detail_downLoad_pro':
                        updateRecords(data);
                        break;
                    case 'detail_update_statue':
                        upDateStatu(data);
                        break;
                    case 'start_game':
                        getStartGame(data);
                        break;
                };
                break;
            case 'drive':
                switch (fn){
                    case 'access_drive':
                        getDriveRecords(data);
                        break;
                    case 'access_download_drive':
                        getDriveDownloadRecords(data);
                        break;
                    case 'update_drive':
                        updateDriveRecords(data);
                        break;
                }
                break;
        }
    }

    function bindStoreEvent(){
        //点击商城进入详情页
        $('.list_container').on('click','li[game_id]',function(){
            var game_id =$(this).attr('game_id');
            //alert(gameName)
            $('.list_container ').hide();
            $('.detail_box').detach();
            $('.detail_container').show();
            //调用数据
            window.CppCall('gameframe', 'item_clicked', '{"game_id":'+game_id+'}');
        })
    }
    function bindDetailEvent(){
        //详情页
        //点击下载按钮
        $('.download_btn .btn').on('click',function(){
            var gameName = $(this).parents().find('.detail_box').attr('gameName');
            var game_id = $(this).parents().find('.detail_box').attr('game_id');
            if($('.download_btn .btn').data('name') == 'install'){
                window.CppCall('gameframe', 'startinstall', '{"game_id":'+game_id+'}');
                //接收数据
            }else if($('.download_btn .btn').data('name') == 'pause'){
                window.CppCall('gameframe', 'pauseinstall', '{"game_id":'+game_id+'}');
                $('.do_in_sch').css('background','linear-gradient(to right, rgba(51,51,51,0.2) , rgba(100,100,100,1))');
                //$('.do_btn').css('background','linear-gradient(to right, rgba(51,51,51,0) , rgba(51,51,51,1))');

            }else if($('.download_btn .btn').data('name')=='continue'){
                //继续接收数据
                window.CppCall('gameframe', 'resumeinstall', '{"game_id":'+game_id+'}');
            }else if($('.download_btn .btn').data('name') =='update'){
                window.CppCall('gameframe', 'updategame', '{"game_id":'+game_id+'}');
            }
            else if($('.download_btn .btn').data('name') =='started'){
                //进入游戏
                $('.download_btn .btn').data('name','in_game');
                window.CppCall('gameframe', 'startgame', '{"game_id":'+game_id+'}');
            }

        })

    }
    function bindDriveEvent(){
        //驱动页
        $('.install_btn').on('click',function(){
            $(this).hide();
            $('.drive_schedule').show();
            //alert(1)
            //接收数据
            window.CppCall('driverframe', 'startinstall', 'drivertype');
        })
        $('.act_con .drive_schedule span').on('click',function(){
            if(!$(this).hasClass('pause')) {
                //alert(1)
                window.CppCall('driverframe', 'pauseinstall', 'drivertype');
            }else{
                //alert(2)
                window.CppCall('driverframe', 'resumeinstall', 'drivertype');
            }
        })

    }
    //事件绑定
    function bindEvent(){
        //主面板
        //菜单切换
        $('.add_title').on('click','li',function(){
            //
            $(this).addClass('cur').siblings().removeClass('cur');
            $('.in_side_list li').each(function(i, el) {
                $(this).removeClass('cur');
            });
            if($(this).hasClass('game')){
                //列表显示，商城加载
                $(document.body).css({
                    "background":'#1d222c'
                })
                $('.list_con ').show();
                $('.detail_container').hide();
                $('.list_container ').show();
            }else if(!$(this).hasClass('game')){
                $('.drive ').show();
                $('.list_con ').hide();
                $(document.body).css({
                    "background":'#1d222c'
                })
            };
        })
        //菜单按钮
        //vr按钮
        $('.vrBtn').on('click', function() {
            window.CppCall('mainframe', 'vrBtn','');
            /* Act on the event */
        });
        $('.mini').on('click',function(){
            //
            window.CppCall('mainframe', 'min','');
        });
        $('.max').on('click',function(){
            //点击最大化
            //如果是最大化添加类名
            window.CppCall('mainframe', 'max','');
        });
        $('.close').on('click',function(){
            //点击最大化
            //如果是最大化添加类名
            window.CppCall('mainframe', 'close','');
        });
        //点击设置按钮
        $('.manager ul').on('click','li',function(){
            //点击设置
            if($(this).hasClass('setting')){
                //点击设置时候调用
                window.CppCall('mainframe', 'menu_itemclicked','item_set');
            }else if($(this).hasClass('idea')){
                //点击意见反馈调用
                window.CppCall('mainframe', 'menu_itemclicked','item_feedback');
            }else if($(this).hasClass('change')){
                //点击切换账号时候调用
                window.CppCall('mainframe', 'menu_itemclicked','item_chgaccount');
            }else if($(this).hasClass('exit')){
                //点击退出的时候调用
                window.CppCall('mainframe', 'menu_itemclicked','item_exit');
            }
        });
        $('.language_list').on('click','li',function(){
            //切换中文
            $('.language_list').hide();
            if($(this).hasClass('chinese')){
                window.CppCall('mainframe', 'menu_itemclicked','item_chglang_2052');
            }else if(($(this).hasClass('english'))){
                window.CppCall('mainframe', 'menu_itemclicked','item_chglang_1033');
            }
        })
    }
    bindEvent();
    leftListStatus();
    return {interface:interface}
}
var mainFn = new MainFn();



/*
mainFn.interface('drive','insert_driver',data11);
mainFn.interface('list','left_item',data3);
mainFn.interface('list','add_local',data1111);
mainFn.interface('list','store',data4);
mainFn.interface('detail','detail_click',data5);
mainFn.interface('main_panel','add_game',data1111);

 mainFn.interface('drive','access_drive',data1,data2,data21);
 mainFn.interface('main_panel','changeLanguage',data9,data9,data9);


 mainFn.interface('list','left_item',data3,data33,data3,data3,data333);
 mainFn.interface('list','store',data4,data4,data4);
 mainFn.interface('detail','detail_click',data5,data6,data7);
 mainFn.interface('list','delete_game',data10,data4,data4);

*/


