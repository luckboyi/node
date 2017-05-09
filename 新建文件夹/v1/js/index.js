if (window.CppCall == undefined) {
    window.CppCall = function () {};
}

function MainFn() {
    var leftDate;
    var storeDate;
    var detail_listDate;
    var detail_onlineDate;
    //左侧列表
    function leftListHtml(val) {
        html = '<li class="in_side_con clearfix" game_id="' + val.game_id + '" gameName="'+ val.title +'">\
                    <div class="lise_content clearfix">\
                    <img src="' + val.imgSrc + '" />\
                    <div class="fl">\
                    <p class="title" title=' + val.title +'>' + val.title + '</p>';
        for (var i = 0; i < val.tag.length; i++) {
            html += ' <span>' + val.tag[i] + '</span>';
        };
        html += '</div>\
                    </div>\
            </li>';
        html = changeLanguage(languageDate, $(html));
        $('.in_side_list .overview .game_list_con ul').append(html);
        resizeFn();
    }
    //视频列表
    function videoListHtml(val) {
        html = '<li class="in_side_con clearfix" game_id="' + val.game_id + '" gameName="'+ val.title +'">\
                    <div class="lise_content clearfix">\
                    <img src="' + val.imgSrc + '" />\
                    <div class="fl">\
                    <p class="title" title=' + val.title +'>' + val.title + '</p>';
            html += ' <span>' + val.explain + '</span>';
        html += '</div>\
                    </div>\
            </li>';
        $('.in_side_list .overview .video_list_con ul').append(html);
        resizeFn();
    }
    //获取视频列表数据
    var videoData = [
        {
            'game_id':'1',
            'title':'精选',
            'imgSrc':'image/list1.jpg',
            'explain':'最新精彩视频'
        },
        {
            'game_id':'1',
            'title':'游戏',
            'imgSrc':'image/list2.jpg',
            'explain':'宣传片、精彩CG'
        },
        {
            'game_id':'1',
            'title':'场景',
            'imgSrc':'image/list3.jpg',
            'explain':'足不出户，领略世界'
        }, {
            'game_id':'1',
            'title':'旅游景区',
            'imgSrc':'image/list4.jpg',
            'explain':'各地风景，尽收眼底'
        }, {
            'game_id':'1',
            'title':'其他',
            'imgSrc':'image/list5.jpg',
            'explain':'更多精彩内容'
        }
    ]
    function videoListData(data){
        $(data).each(function(key,val){
            videoListHtml(val);
        });
        resizeFn();
    }
    videoListData(videoData)
    //商城列表
    function storeListHtml(val) {
        html = '<li     game_id="' + val.game_id + '" gameName="'+ val.title +'"><div class="list_img">\
                <i class="' + val.state + '"></i>\
                <img src="' + val.imgSrc + '"/> </div><div class="list_state clearfix">\
                <p class="fl list_name">' + val.title + '</p>\
                <p class="fr list_platform">';
        for (var i = 0; i < val.type.length; i++) {
            html += '<i class="' + val.type[i] + '"></i>';
        }
        html += '</p></div></li>';
        html = changeLanguage(languageDate, $(html));
        $('.list_container .overview').append(html);
        resizeFn();
    }
    //详情页
    function detailHtml(val) {
        html = '<div class="detail_box" game_id="'+ val.game_id +'" gameName="'+ val.title +'"><div class="left_contain fl">\
                    <h3>'+val.title+'</h3>\
                    <div class="lanrenzhijia">\
                        <div id="picBox" class="picBox">\
                            <ul class="cf">';
        for(var i=0; i<val.bigImg.length;i++){
            html +='<li><a href="#"><img src="'+val.bigImg[i]+'" />';
        };
        html +=' /ul>\
                        </div>\
                    <div id="listBox" class="listBox">\
                        <ul class="cf">';
        for(var i=0; i<val.miImg.length; i++){
            html +='<li><div class="arrow-up pa"></div><img src="'+val.miImg[i]+'"/></li>';
        };
        html +='    </ul>\
                    </div>\
                    <div class="detail_btn">\
                        <span id="prev" class="btn prev"></span>\
                        <span id="next" class="btn next"></span>\
                        <span class="btn_center" id="center"><em></em></span>\
                    </div>\
                </div></div>';
        $('.detail_text').append(html);
        html=    '<div class="right_contain fl">\
                        <div class="content1">\
                            <div class="right_con">\
                                <h3 class="language" data-name="game_plain">玩家评分</h3>\
                            </div>\
                            <div class="content_con clearfix">\
                                <span>9.5分</span>\
                                <span>（已有1314人评分）</span>\
                            </div>\
                        </div>\
                        <div class="content1">\
                            <div class="right_con">\
                                <h3 class="language" data-name="game_plain">游戏简介</h3>\
                            </div>\
                            <p>'+val.introduction+'</p> \
                        </div>\
                        <div class="content2">\
                            <div class="right_con">\
                                <h3 class="language" data-name="support_equipment">支持设备</h3>\
                            </div>\
                            <ul class="con_list clearfix">';
        for( var i=0 ; i<val.support.length;i++){
            html +='<li><a href="javascript:;">'+val.support[i]+'</a></li>';

        };
        html +='        </ul>\
                        </div>\
                        <div class="content3">\
                               <div class="right_con">\
                                    <h3 class="language" data-name="system">系统需求</h3>\
                                </div>\
                                <div class="message_hd">\
                                    <ul class="clearfix" id="drive_configuration">\
                                        <li class="fl cur language" data-name="configuration">推荐配置</li>\
                                        <li class="fl language" data-name="minimum">最低配置</li>\
                                    </ul>\
                                </div>\
                                <div class="message_bd">\
                                    <ul class="recommend ">\
                                        <li class="clearfix"><div class="fl language" style="width: 100px" data-name="os">操作系统:</div> <span class="message"></span></li>\
                                        <li class="clearfix"><div class="fl language" style="width: 100px" data-name="processor">处理器:</div><span class="message"></span></li>\
                                        <li class="clearfix"><div class="fl language" style="width: 100px" data-name="storage">内存:</div><span class="message"></span></li>\
                                        <li class="clearfix"><div class="fl language" style="width: 100px" data-name="versions">DirectX 版本:</div><span class="message"></span></li>\
                                        <li class="clearfix"><div class="fl language" style="width: 100px" data-name="space">存储空间:</div><span class="message"></span></li>\
                                    </ul>\
                                    <ul class="mini">\
                                        <li class="clearfix"><div class="fl language" style="width: 100px" data-name="os">操作系统:</div> <span class="message"></span></li>\
                                        <li class="clearfix"><div class="fl language" style="width: 100px" data-name="processor">处理器:</div><span class="message"></span></li>\
                                        <li class="clearfix"><div class="fl language" style="width: 100px" data-name="storage">内存:</div><span class="message"></span></li>\
                                        <li class="clearfix"><div class="fl language" style="width: 100px" data-name="versions">DirectX 版本:</div><span class="message"></span></li>\
                                        <li class="clearfix"><div class="fl language" style="width: 100px" data-name="space">存储空间:</div><span class="message"></span></li>\
                                    </ul>\
                                </div>\
                        </div>\
                    </div>';
        html = changeLanguage(languageDate, $(html));
        $('.detail_box').append(html);
        $('.recommend .message').each(function(i){
            $(this).text(val.message[i]);
        })
        $('.mini .message').each(function(i){
            $(this).text(val.mini_message[i]);
        })
        if($('.picBox li').length> 0 && $('.listBox li').length> 0){banner();}
		else{
			$('.detail_btn').hide();
		}
        resizeFn();
        tableDrive();
    }
    //驱动
    function driveMainHtml(val){
        $('.add_title li').eq(2).addClass('cur').siblings().removeClass('cur')
        html = '<div class="drive clearfix ">\
                    <div class="act_con fl">\
                        <h3 class="act_title language" data-name="">'+val.title+'</h3>\
                        <p class="act_text">'+val.explain+'</p>\
                        <div class="drive_undown"><div class="install_btn language" data-name="install"></div></div>\
                    </div>\
                    <div class="act_img fr">\
                    <img src="image/act_bg.png"/>\
                    </div>\
                    </div>';
        html = changeLanguage(languageDate, $(html));
        $('.main_list_container').append(html);
        resizeFn();
    }
    //驱动下载数据
    function driveDownloadHtml(val){
        $('.drive_schedule').detach();
        var style = "width:"+parseInt(val.percent)*3.88+"px";
        html ='<div class="drive_schedule pr">\
                    <span class="pa"></span>\
                    <div class="in_sch pr">\
                    <div class="do_in_sch pr"  style="'+style+'">\
	                    <div class="pa clearfix">\
	                    	<p class="fl" style="left:5px; top:0;">'+val.text+'\
							<div class="spinner fl"><div class="bounce1"></div><div class="bounce2"></div><div class="bounce3"></div></div>\
	                    </p>\
                    </div>\
                    <i class="do_btn"></i>\
                    </p>\
                    </div>\
                    </div>';
        html = changeLanguage(languageDate, $(html));
            $('.act_con').append(html);
    }
    //获取数据左侧列表下载
    function download_progress(val){
        $('.download_progress').detach();
        var style = "width:"+parseInt(val.percent)*2.08+"px";
        html ='<p class="download_progress pr"><i class="in_download_pro pa" style="'+style+'"></i></p>';
        for(var i= 0 ; i<$('.in_side_con ').length; i++ ){
                if(val.game_id == $('.in_side_con ').eq(i).attr('game_id') ){
                    $('.in_side_list .in_side_con').eq(i).append(html);
                }
            }
        
    };
    //获取左侧列表下载数据
    function getLeftDownRecords(data){
        $(data).each(function(key,val){
            download_progress(val);
			if(val.status == 1){
				$('.download_progress').show();
            }else{
				$('.download_progress').hide();
			}
           
        });
    }
    //获取驱动信息
    function getDriveRecords(data){
        resizeFn();
        $('.list_con').hide();
        $(data).each(function(key,val){
            driveMainHtml(val);
        });
    };
    //获取驱动数据
    function getDriveDownloadRecords(data){
        $(data).each(function(key,val){
			 $('.install_btn').hide();
			 $('.drive_schedule ').show();
			driveDownloadHtml(val);
        });
    }
    //获取左侧列表数据
    function getLeftRecords(data){
        $(data).each(function(key,val){
            leftListHtml(val);
        });
        resizeFn();
    };
    //获取商城数据
    function getStoreRecords(data){
        $(data).each(function(key,val){
            storeListHtml(val);
        });
    };
    //获取详情download数据
    function detail_downLoad_progress(val){
        $('.schedule').detach();
        html='<div class="schedule">\
                        <div class="in_sch pr clearfix">\
                            <p class="in_text fl">'+val.text+'</p>\
                            <p class="do_in_sch pr"  style="'+"width:"+parseInt(val.percent)+"%"+'"><i class="do_btn"></i></p>\
                        </div>\
                </div>'
        $('.download_btn').append(html);
    }
    
    //获取详情按钮数据
    //获取详情数据
    function getDetailRecords(data){
        $('.list_container ').hide();
        $('.detail_box').detach();
        $(data).each(function(key,val){
            detailHtml(val);
            if(val.background !='' || val.background != undefined ){$(document.body).css("background",'url('+val.background+') top center no-repeat')}
			else{
				
                $(document.body).css({"background":'#1d222c'})
            }
        });
        resizeFn();
    };
    //详情页配置信息切换
    function tableDrive(){
        $('#drive_configuration').on('click','li',function(){
            var index = $(this).index();
            $(this).addClass('cur').siblings().removeClass('cur');
            $('.message_bd ul').eq(index).show().siblings().hide();
        })
    }

    //商城更新状态
    function updateRecords(data){
        $(data).each(function(key,val){
        	if(val.game_id == $('.detail_box').attr('game_id')){
        		detail_downLoad_progress(val);
        	}
        });
    }
    //更新详情状态
    function upDateStatu(data){
        $(data).each(function(key,val){
            if(val.game_id == $('.detail_box').attr('game_id')){
                if(val.status == 3){
                    $('.download_btn .btn').data("name", 'started');
                    $('.schedule').hide()
                }else if(val.status == 0){
                    $('.download_btn .btn').data("name",'install');
                    $('.schedule').hide();
                }else if(val.status == 1 ){
                    $('.download_btn .btn').data("name", 'pause');
                    $('.schedule').show();
                }else if(val.status == 4){
                    $('.download_btn .btn').data("name", 'update');
                    $('.schedule').hide();
                }else if(val.status == 2 ){
                    $('.download_btn .btn').data("name", 'continue');
                    $('.schedule').show();
                }
            }
            changeLanguage(languageDate);
        })
    }
    //游戏开始调用数据
    function getStartGame(data){
        $(data).each(function(key,val){
           if(val.state == 0){
               //开始游戏
               $('.download_btn .btn').data('name','in_game');
               $('.download_btn .btn').addClass('ban');
               //alert($('.download_btn div.btn').data('name'));
               changeLanguage(languageDate);
               window.CppCall('mainframe', 'menu_startgame', '{"game_id":'+game_id+',"gamename":"'+gameName+'"}');
           }else if(val.state == 1){
               //关闭游戏
               $('.download_btn .btn').data('name','started');
               $('.download_btn .btn').removeClass('ban');
               changeLanguage(languageDate);
           }
        });


    }
    //状态驱动更新
    function updateDriveRecords(data){
        $(data).each(function(key,val){
            if(val.status == 1){
                $('.act_con .drive_schedule span').addClass('pause');
            }else if(val.status == 2){
                $('.act_title').data('name','finish');
                $('.drive_schedule').hide();
                changeLanguage(languageDate);
            }else if(val.status == 0){
				$('.drive_schedule').show();
				$('.act_con .drive_schedule span').removeClass('pause');
			}
        })
        changeLanguage(languageDate);
    }
    //添加菜单

    //菜单结构添加
    function menuHtml(val){
    	html = '<li class="fl drive language" data-name="drive_title">'+val.add_head+'</li>';
        html = changeLanguage(languageDate, $(html));
        if(!$('.add_title li').eq(2).hasClass('drive'))  $('.add_title').append(html);
    }
    //获取数据
    function getMenuRecords(data){
        $(data).each(function(key,val){
            menuHtml(val);
        })
        $('.add_title li').eq(2).addClass('cur').siblings().removeClass('cur');
    }
    //删除左侧列表
    function deleteRecords(data){
        $(data).each(function(key,val){
            for(var i= 0 ; i<$('.in_side_con ').length; i++ ){
                if(val.game_id == $('.in_side_con ').eq(i).attr('game_id') && val.title ==$('.in_side_con ').eq(i).attr('gameName') ){
					$('.in_side_con').eq(i).detach();
					if($('.detail_box').attr('game_id') == val.game_id && val.title ==$('.detail_box').attr('gameName')){
						$('.detail_box').hide();
						$('.list_container').show();
					}
					leftListStatus()
                }
            }
        })
    }
    
    //list选中
    function selectListFn(data){
        $(data).each(function(key,val){
            for(var i= 0 ; i<$('.in_side_con ').length; i++ ){
                if(val.game_id == $('.in_side_con ').eq(i).attr('game_id') && val.title ==$('.in_side_con ').eq(i).attr('gameName') ){
                    $('.in_side_con').eq(i).addClass('cur').siblings().removeClass('cur')
                }
            }
        })
    }
    //最大化 最小化
    function  maxFn(data){
        $(data).each(function(key,val){
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
    //左侧列表是否为空
    function leftListStatus(){
        $('.game_list_con .in_side_con').length >0 ? $('.no_game').hide():$('.no_game').show();
    }
    //语言
    function changeLanguage(data, $_tar){
        // console.log($_tar);
        var $tar = $_tar == undefined? $("html"): $_tar;
        $tar.find(".language").each(function(){
            var name = $(this).data('name');
            $(this).text(data[name]);
        })
        return $tar;
    }
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
        html = changeLanguage(languageDate, $(html));
        $('.addGame .in-con-body .localGameList').append(html);
        resizeFn();
    }
    //添加本地程序
    function addLocalRoutine(data){
        $(data).each(function(key,val){
            addRoutineHtml(val);
            if(val.state == 1){
                $('.addGame .in-con-body .localGameList li').eq(key).addClass('cur');
                $('.addGame .in-con-body .localGameList li').eq(key).find('span.in-con-check').addClass('selected');
            }
        });
    }

    //设置数据调用
    function setDateFn(data){
        $(data).each(function(key,val){
            if(val.languageState == 1033){
                $('.language_selected').data('name','Chinese')
            }else{
                $('.language_selected').data('name','English')
            };
            if(val.selected == 0){
                $('.selected_btn li').eq(0).addClass('selected');
                $('.selected_btn li').eq(1).removeClass('selected');
            }else{
                $('.selected_btn li').eq(0).removeClass('selected');
                $('.selected_btn li').eq(1).addClass('selected');
            };
            if(val.miniSelected == 0){
                $('.selected_btn .min').addClass('selected');
                $('.selected_btn .close_set').removeClass('selected');
            }else{
                $('.selected_btn .min').removeClass('selected');
                $('.selected_btn .close_set').addClass('selected');
            }
            $('.download_path input').val(val.dir)
        });
        $('.set_bounced').show();
        setBindFn();
        changeLanguage(languageDate);

    }
    //评论
    function commentData(data){
        var height =$('.js_detail_hei').height() -200;
        var nums = parseInt(height/77); //每页出现的数量
        var pages = Math.ceil(data.length/nums); //得到总页数
        var thisDate = function(curr){
            //此处只是演示，实际场景通常是返回已经当前页已经分组好的数据
            var str = '', last = curr*nums - 1;
            last = last >= data.length ? (data.length-1) : last;
            for(var i = (curr*nums - nums); i <= last; i++){
                str += '<li class="comment_list">\
                        <div class="comment_body_con clearfix">\
                            <div class="fl com_portrait">\
                                <img src="'+data[i].imgSrc+'">\
                            </div>\
                            <div class="fl right_com pr">\
                                <div class="right_com_title clearfix ">\
                                    <h3 class="fl">'+data[i].title+'：</h3>\
                                    <span class="fl">'+data[i].content+'</span>\
                                </div>\
                                <div class="right_com_con clearfix">\
                                    <p class="fl">'+data[i].commentTime+'</p>\
                                    <p class="fl playGame_time">进行游戏时间：<b>'+data[i].gameTime+'</b>个小时</p>\
                                    <div class="fr clearfix comment_comment">\
                                        <div class="fl comment_delete">删除</div>\
                                        <i class="fl">|</i>\
                                        <div class="fl pr like">(<b>'+data[i].like+'</b>)</div>\
                                        <i class="fl">|</i>\
                                        <div class="fl pr unlike">(<b>'+data[i].unlike+'</b>)</div>\
                                    </div>\
                                </div>\
                            </div>\
                        </div>\
                    </li>';
            };
            return str;
        };
        //调用分页
        laypage({
            cont: 'comment_page',
            pages: pages,
            jump: function(obj){
                document.getElementById('comment_con').innerHTML = thisDate(obj.curr);
                //评论事件
                commentFn();
            }
        });

    }
    //改变左侧礼拜的图片
    function changeGameListImg(data){
        $(data).each(function(key,val){
            for(var i=0;i< $('li.in_side_con').length;i++){
                if(val.game_id == $('li.in_side_con').eq(i).attr('game_id')){
                    $('li.in_side_con').eq(i).find('img').attr('src',val.img);
                }
            }
        })
    }
    //修改商城列表的图片
    function changeStoreImg(data){
        $(data).each(function(key,val){
            for(var i=0;i< $('.list_container .overview li').length;i++){
                if(val.game_id == $('.list_container .overview li').eq(i).attr('game_id')){
                    $('.list_container .overview li').eq(i).find('img').attr('src',val.img);
                }
            }
        })
    }
    //视频分类
    //视频首页列表

    //视频详情列表

    //视频详情
    //播放本地视频
    //添加本地视频
    function addLocalVideo(data){
        $('.video_play .valiantPhoto').attr('data-video-src',data.src);
        $('.valiantPhoto').Valiant360();
    }
    //播放服务器视频
    //函数调用
    function interface(module,fn,data){
        //data = data == undefined?JSON.parse(data): data;
        data = data != ''?JSON.parse(data):data;
        switch(module){
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
                        verificationData(data)
                        break;
                }
            case 'main_panel':
                switch (fn) {
                    case 'changeLanguage':
                        languageDate = data;
                        changeLanguage(data);
                        break;
                    case 'add_game':
                        getLeftRecords(data);
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
                        setDateFn(data);
                        break;
                    case 'vrBtn':
                        break;
                }
                break;
            case 'list':
                switch(fn){
                    case 'left_item':
                        leftDate = data;
                        getLeftRecords(data);
                        bindListEvent();
                        leftListStatus();
                        break;
                    case 'store':
                        storeDate = data;
                        getStoreRecords(data);
                        bindStoreEvent();
                        break;
                    case 'list_download_pro':
                        getLeftDownRecords(data);
                        break;
                    case 'delete_game':
                        deleteRecords(data);
                        break;
                    case 'add_local':
                        addLocalRoutine(data);
                        break;
                    case 'select_list':
                        selectListFn(data);
                        break;
                    case 'changeGameListImg':
                        changeGameListImg(data);
                        break;
                    case 'changeStoreImg':
                        changeStoreImg(data);
                        break;
                }
                break;
            case 'detail':
                switch(fn){
                    case 'detail_click':
                        detail_listDate =data;
                        getDetailRecords(data);
                        break;
                    case 'detail_online_lick':
                        detail_onlineDate = data;
                        getDetailRecords(data);
                        break;
                    case 'detail_add_leftList':
                        getLeftRecords(data);
                        break;
                    case 'detail_downLoad_pro':
                        updateRecords(data);
                        break;
                    case 'detail_update_statue':
                        upDateStatu(data);
						 bindDetailEvent();
                        break;
                    case 'start_game':
                        getStartGame(data);
                        break;
                    case 'game_comment':
                        commentData(data);
                        break;
                };
                break;
            case 'video':
                switch (fn){
                    case 'left_item':
                        videoListData(data);
                        break;
                    case 'right_item':
                        break;
                    case 'addLocalVideo':
                        addLocalVideo(data);
                        break;
                    case 'videoLocalPlay':
                        localVideoPlay(data);
                        break;
                    case 'videoOnlinePlay':
                        onlinePlay(data);
                        break;
                }
            case 'drive':
                switch (fn){
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
                }
                bindDriveEvent();
                break;
        }
    }
    //游戏列表事件
    function bindListEvent(){
        //右侧点击事件
        $('.game_list_con .in_side_con').mousedown(function(e){
            var left = e.pageX;
            var top = e.pageY;
            var game_id =$(this).attr('game_id');
            var gameName = $(this).attr('gameName');
            var winHeight = window.innerHeight;
            //列表页 点击左键列表进入详情页
           if(1 == e.which){
               var game_id =$(this).attr('game_id');
               var gameName = $(this).attr('gameName');
               $('.list_container ').hide();
               $('.detail_container').show();
               $(this).addClass('cur').siblings().removeClass('cur');
			   //$(this).css('pointer-events', 'none');
               //接收数据
               window.CppCall('gamelistframe', 'item_clicked', '{"game_id":'+game_id+',"gamename":"'+gameName+'"}');
           }else if( 3 == e.which){
               //alert(left)
               $('.delete').detach();
			   //$(this).css('cursor', 'pointer');
              //
            html = '<ul class="delete pa"><li><p>x</p><span class="in_delete language" data-name="manage_delete"></span></li><li class="exit"><p></p><span class="delete language" data-name="manage_exit">退出</span></li></ul>'
            html = changeLanguage(languageDate, $(html));
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
            $('.delete li').on('click',function(){
                if($(this).find('span').hasClass('in_delete')){
                    $('.confirmation').show();
                    if($(this).parents('.in_side_con').attr('game_id') < 2000000){
                        $('.delete_local').show();
                    }else{
                        $('.delete_local').hide();
                    }
                    $('.confirmation div.sure').on('click',function(){
                        $('.confirmation').hide();
                        //删除列表信息
                        if($('.in_confirmation input').is(":checked")){
                        	window.CppCall('gamelistframe', 'menu_deletegame', '{"game_id":'+game_id+',"gamename":"'+gameName+'","delete_localGame":1}');
                        }else{
                        	window.CppCall('gamelistframe', 'menu_deletegame', '{"game_id":'+game_id+',"gamename":"'+gameName+'","delete_localGame":0}');
                        }
                    })
                    $('.confirmation div.cancel').on('click',function(){
                        $('.confirmation').hide();
                    })
                }else if($(this).find('span').hasClass('exie')){
                    $('.delete').detach();
                }
            })
        })
        //右击菜单

    }
    //商城事件
    function bindStoreEvent(){
        //点击商城进入详情页
        $('.list_container').on('click','li[game_id]',function(){
            var game_id =$(this).attr('game_id');
            var gameName = $(this).attr('gameName');
            //alert(gameName)
            $('.list_container ').hide();
            $('.detail_box').detach();
            $('.detail_container').show();
            //调用数据
            window.CppCall('gameframe', 'item_clicked', '{"game_id":'+game_id+',"gamename":"'+gameName+'"}');
        })
    }
    //详情页事件
    function bindDetailEvent(){
        //详情页
        //点击下载按钮
        $('.download_btn .btn').on('click',function(){
            var gameName = $(this).parents().find('.detail_box').attr('gameName');
            var game_id = $(this).parents().find('.detail_box').attr('game_id');
            if($('.download_btn .btn').data('name') == 'install'){
                window.CppCall('gameframe', 'startinstall', '{"game_id":'+game_id+',"gamename":"'+gameName+'"}');
                //接收数据
            }else if($('.download_btn .btn').data('name') == 'pause'){
                window.CppCall('gameframe', 'pauseinstall', '{"game_id":'+game_id+',"gamename":"'+gameName+'"}');
                $('.do_in_sch').css('background','linear-gradient(to right, rgba(51,51,51,0.2) , rgba(100,100,100,1))');
                //$('.do_btn').css('background','linear-gradient(to right, rgba(51,51,51,0) , rgba(51,51,51,1))');

            }else if($('.download_btn .btn').data('name')=='continue'){
                //继续接收数据
                window.CppCall('gameframe', 'resumeinstall', '{"game_id":'+game_id+',"gamename":"'+gameName+'"}');
            }else if($('.download_btn .btn').data('name') =='update'){
                window.CppCall('gameframe', 'updategame', '{"game_id":'+game_id+',"gamename":"'+gameName+'"}');
            }
            else if($('.download_btn .btn').data('name') =='started'){
                //进入游戏
                $('.download_btn .btn').data('name','in_game');
                window.CppCall('gameframe', 'startgame', '{"game_id":'+game_id+',"gamename":"'+gameName+'"}');
            }

        })
        changeLanguage(languageDate);
    }
    //驱动事件
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
				window.CppCall('driverframe', 'pauseinstall', 'drivertype');
			}else{
				window.CppCall('driverframe', 'resumeinstall', 'drivertype');
			}
        })

    }
    //添加本地游戏弹框
    function addGameFn(){
        //全选或全不选
        var select = [];
        //删除数组某一个特定值；
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
                $('.in-foot .addSelect').addClass('cn')
            }else if($(this).find('.selected').length <0){
                $('.in-foot .addSelect').removeClass('cn')
            };
            if($(this).hasClass('cur')){
                select.push($(this).index());
                //console.dir(select);
            }else{
                select.remove($(this).index());
               // console.dir(select);
            }
            //
        });
        //弹框关闭按钮
        $('.close').click(function(){
            $('.bounced_drag').hide();
        });
        //点击取消
        $('.cancel ').on('click',function(){
            $('.bounced_drag').hide();
        });
        //点击添加游戏
        $('.addSelect').on('click',function(){
            $('.bounced_drag').hide();
            window.CppCall('gamelistframe', 'addgame_confirm',JSON.stringify(select));
        });
        //点击浏览
        $('.browse ').on('click',function(){
            window.CppCall('gamelistframe', 'addgame_browser','');
        });
    };
    //弹窗设置
    function setBindFn(){
        //点击设置语言
        $('.language_set').on('click',function(e){
            $('.set_language').toggle();
            e.stopPropagation();
        });
        $(window).on('click',function(){
            $('.set_lalognguage').hide();
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
        $('.set_bounced .browse').on('click',function(){
            var sure_ste ={
                'languageState':2052,
                'selected':1,
                'miniSelected':1,
                'dir':'D:/'
            };
            if($('.selected_btn li').eq(0).hasClass('selected')){
                sure_ste.selected = 0;
            }else{
                sure_ste.selected = 1;
            };
            if($('.selected_btn .min').hasClass('selected')){
                sure_ste.miniSelected = 0;
            }else{
                sure_ste.miniSelected = 1;
            }

            if($('.language_selected').attr('data-name') == 'English'){
                sure_ste.languageState = 2052 ;
            }else{
                sure_ste.languageState = 1033 ;
            }
            sure_ste.dir = $('.download_path input').val();
            $('.set_bounced').hide();
            window.CppCall('mainframe', 'set_confirm',JSON.stringify(sure_ste));
            //console.dir(sure_ste)
        });
        //点击恢复初始设置
        $('.renew').on('click',function(){
            $('.set_bounced').hide();
            window.CppCall('mainframe', 'set_restore','');
        })
        //点击浏览按钮
        $('.amend').on('click',function(){
            window.CppCall('mainframe', 'set_modify','');
        });
        //点击打开
        $('.open').on('click',function(){
            window.CppCall('mainframe', 'set_open','');
        });
    }
    //评论事件
    function commentFn(){
        //点击最新
        $('.splendid').on('click',function(){
            $(this).addClass('cur').siblings().removeClass('cur');
        });
        //点击最新
        $('.newComment').on('click',function(){
            $(this).addClass('cur').siblings().removeClass('cur');

        });
        //点击好评
        $('.goodComment').on('click',function(){
            $(this).addClass('cur').siblings().removeClass('cur');
        });
        //点击差评
        $('.badComment').on('click',function(){
            $(this).addClass('cur').siblings().removeClass('cur');
        });
        //点击我的评论
        $('.myComment').on('click',function(){
            $(this).addClass('cur').siblings().removeClass('cur');
        });
        //点赞
        $('.comment_comment .like').one('click',function(){
            if(!$(this).parent().find('.unlike').hasClass('cur')){
                var num =parseInt($(this).find('b').text()) + 1;
                //console.dir(num+1);
                $(this).addClass('cur');
                $(this).find('b').text(num);
            }

        });
        //点倒彩
        $('.comment_comment .unlike').one('click',function(){
            if(!$(this).parent().find('.like').hasClass('cur')){
                var num =parseInt($(this).find('b').text()) + 1;
                //console.dir(num+1);
                $(this).addClass('cur');
                $(this).find('b').text(num);
            }
        });
        //点删除
        $('.comment_comment .comment_delete').on('click',function(){
            $(this).parents('.comment_list').detach();
        });
        //评分
        $('.grade_mouse').mousemove(function(e){
            var x = (e.clientX - $(this).offset().left)/15;
            var num = x.toString();
            if((num.substring(num.indexOf('.'))+1) <.5){
                n = 0.5
            }else{
                n = 1;
            }
            var left = parseInt(x) + n;
            //console.dir(left+n);
            $('.comment_grade li').css('width',left*16);
            $('.comment_grade .game_score b').text(left);
            $(this).click(function(){
                $('.grade_mouse').unbind('mousemove')
            });
        });
        //点击确定评分；
        $('.grade_mouse').click(function(){
            $(this).unbind('mousemove');
            $(this).addClass('click')
        });
        //点击发送
        $('.comment_btn .send').on('click',function(){
            if($('.grade_mouse').hasClass('click')){
                //获取当前内容
                console.dir($('.add_comment textarea').val())
                //获取评分
                console.dir($('.game_score').text());
                //
            }else{
                //现在每评分弹框
                $('.comment .no_score').show();
            }
        })
        //点击是否喜欢
        $('.comment_btn ul li').on('click',function(){
            $(this).addClass('cur').siblings().removeClass('cur')
        })
        //点击未评分按钮
        $('.comment .no_score .cancel').on('click',function(){
            $('.comment .no_score').hide();
        })
        //点击确定
        $('.comment .no_score .sure').on('click',function(){
            $('.comment .no_score').hide();
        })
    }



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
        }else{
            $('.login_enter_erro').text(data.txt);
        }
    }
    //注册判断
    function registerSucData(data){
        if(data.state == 1){
            $('.success_register').show();

        }else{
            $('.erro_register').show();
        }
        $('.login_mask').hide();
    }
    //用户名数据
    function userMsgData(data){
        $('.user img').attr('src',data.useImg);
        $('.user span.name').text(data.useName);
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
        if(data. rem_password== 1){
            $('.login_enter_sel .password i').addClass('selected');
        }else{
            $('.login_enter_sel .password i').removeClass('selected');
        };
        if(data. rem_password== 1){
            $('.login_enter_sel .automatic i').addClass('selected');
        }else{
            $('.login_enter_sel .automatic i').removeClass('selected');
        };
    }
    /*注册登录*/
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
    function loginInFn(){
        //注册失去焦点
        $('#registerForm input').each(function(){
            $(this).blur(function () {
                var errmsg = register_check(this);
                var valid = $(this).siblings(".Validform_checktip");
                if(errmsg !== ''){
                    valid.addClass('error_msg').html(errmsg);
                }else{
                    valid.removeClass('error_msg').html('');
                }
            });
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
                        errmsg ='手机号/邮箱不能为空';
                        break;
                    }
                    var rs = /^(13|14|15|17|18)[0-9]{9}$/;
                    var reg = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/;
                    if(!rs.test(value) && !reg.test(value)){
                        errmsg = '请填写正确的手机号/请填写正确的邮箱地址';
                        break;
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
                    if (a < 6 || a > 24) {
                        errmsg = "昵称长度只能6~24个字符";
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
                    $('.login_enter_erro').html('账号不能为空');
                    return '账号不能为空';
                }
            };
            if(name == 'login_in_password'){
                if (typeof (value) == 'undefined' || value == "") {
                    obj.addClass('bdcol-red');
                    $('.login_enter_erro').html('密码不能为空');
                    return '密码不能为空';
                }
            };
        }
        /*账号注册*/
        /*账号注册*/
        //点击关闭
        $('.login_close ').on('click',function(){
            $('.login_mask ').hide();
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
           var phoneNum = $('#registerForm input[name="phoneNumber"]').val();
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
            console.dir(userPhoneNum);
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
            var phoneNum = $('.in_login_input input').val($(this).find('b').text());
            window.CppCall('loginframe', 'select_item', phoneNum);
        });
        //点击关闭提示
        $('.input_close').on('click',function(){
            $(this).parent('li').detach();
        });
        //点击登录
        $('.login_enter_btn').on('click',function(){
            var login_in = {
                'account':'',
                'password':'',
                'state_password':'',
                'state_auto':''
            }
            //获取电话号码
            login_in.account = $('.in_login_input input').val();
            //获取密码
            login_in.password =$('.login_enter_password input').val();
            //是否记住密码
            if($('.password i').hasClass('selected')){
                login_in.state_password = 1;
            }else{
                login_in.state_password = 0;
            }
            //是否自动登录
            if($('.automatic i').hasClass('selected')){
                login_in.state_auto = 1;
            }else{
                login_in.state_auto = 0;
            }
            //console.dir(login_in);
            //调用数据
            window.CppCall('loginframe', 'login',JSON.stringify(login_in));
        });
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
            }
            $('#registerForm p').find('.send_btn ').val('发送验证码')
            $('.login_mask').show();
            $('.login_enter_mask').hide();
            $('#login_phoneNum').focus();
        })
        //新加的事件
        //点击注册 弹出注册完成
        $('.login .register').on('click',function(){
            var register_msg ={
                'account':121,
                'useName':'',
                'password':'',
                'identifying':''
            };
            //获取数据
            register_msg.account = $('#registerForm input[name="phoneNumber"]').val();
            register_msg.useName = $('#registerForm input[name="nickName"]').val();
            register_msg.password = $('#registerForm input[name="loginPassword"]').val();
            register_msg.identifying = $('#registerForm input[name="verifyCode"]').val();
            if(!$('.login_agreement i.login_sel').hasClass('selected')){
                alert('请认真阅读相关协议，并勾选');
            }
            window.CppCall('loginframe', 'register',JSON.stringify(register_msg));
        });
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
        $('#verify_drag').drag();
    }
    //事件绑定
    function bindEvent(){
        //主面板
        //点击头像登录
        $('.user').on('click',function(){
            if($('.user .name').html() == ''){
                //未登录
                $('.login_enter_erro ').text('');
                $('.login_enter_mask').show();
                $('#login_in_phoneNum').focus();
                window.CppCall('loginframe', 'prelogin', '');
            }else{
                //已登录
                //右键退出
            }

        });
        //点击注册
        $('.registerBtn').on('click',function(){
            $('.login_mask').show();
            $('#login_phoneNum').focus();
            $('.login_enter_mask').hide();
        });
        //点击马上登录
        $('.log_in').on('click',function(){
            $('.login_mask').hide();
            $('.login_enter_mask').show();

        });
        //菜单切换
        $('.add_title').on('click','li',function(){
            //
            $(this).addClass('cur').siblings().removeClass('cur');
            $('.in_side_list li').each(function(i, el) {
                $(this).removeClass('cur');
            });
            if($(this).hasClass('game')){
                //列表显示，商城加载
                leftListStatus();
                $(document.body).css({"background":'#1d222c'});
                $('.list_con').show();
                $('.video_container').hide();
                $('.video_label').hide();
                $('.detail_container').hide();
                $('.list_container ').show();
                $('.add_game').show();
                $('.game_list_con').show();
                $('.video_list_con').hide();
                if($('.valiantPhoto ').find('video')){
                    $('.valiantPhoto ').find('video').attr('src','')
                }
            }else if($(this).hasClass('drive')){
                $('.drive ').show();
                $('.video_container').hide();
                $('.video_label').hide();
                $('.list_con ').hide();
				 $(document.body).css({
                    "background":'#1d222c'
                })
                if($('.valiantPhoto ').find('video')){
                    $('.valiantPhoto ').find('video').attr('src','')
                }
            }else if($(this).hasClass('video')){
                //$('.no_game').hide();
                //$('.in_side_list .overview li').detach();
                $('.drive ').hide();
                $('.list_container').hide();
                $('.detail_container').hide();
                $('.video_container').show();
                $('.video_label').show();
                $('.add_game').hide();
                $('.video_list').show();
                $('.video_detail').hide();
                $('.video_history_con').hide();
                $('.video_play').hide();
                if($('.valiantPhoto ').find('video')){
                    $('.valiantPhoto ').find('video').attr('src','')
                }
                $('.in_video_container').hide();
                $('.game_list_con').hide();
                $('.video_list_con').show();
                $('.no_game').hide();
                //videoListData(videoData)
                videoPauseBtn()


            };
        })
        //菜单按钮
        //vr按钮
        $('.manager .vrBtn').on('click', function() {
            window.CppCall('mainframe', 'vrBtn','');
            /* Act on the event */
        });
        $('.manager .mini').on('click',function(){
            //
            window.CppCall('mainframe', 'min','');
        });
        $('.manager .max').on('click',function(){
            //点击最大化
            //如果是最大化添加类名
            window.CppCall('mainframe', 'max','');
        });
        $('.manager .close').on('click',function(){
            //点击最大化
            //如果是最大化添加类名
            window.CppCall('mainframe', 'close','');
        });
        //点击设置按钮
        //点击设置按钮
        $('.manager ul li.setting').click(function(){
            /*$('.set_bounced').toggle();*/
            window.CppCall('mainframe', 'menu_itemclicked','item_set');
        });
        //点击意见反馈按钮
        $('.manager ul li.idea').click(function(){
           $('.bounced_advice').show();
        });
        //意见反馈事件
        $('.bounced_advice .close ').click(function(){
            $('.bounced_advice').hide();
        });
        $('.bounced_advice .browse').click(function(){
            $('.bounced_advice').hide();
        });
        $('.bounced_advice .cancel ').click(function(){
            $('.bounced_advice').hide();
        });
        //选择本地
        /*$(".a-upload").on("change","input[type='file']",function(){
            $('.in_con_file ').text($(this).val());
        });*/
        //点击反馈意见

        $('.language_list').on('click','li',function(){
            //切换中文
            $('.language_list').hide();
            if($(this).hasClass('chinese')){
                window.CppCall('mainframe', 'menu_itemclicked','item_chglang_2052');
            }else if(($(this).hasClass('english'))){
                window.CppCall('mainframe', 'menu_itemclicked','item_chglang_1033');
            }
        })
        //添加本地游戏;
        $('.add_game').on('click',function(){
            $('.addGame .in-con-body .localGameList li').detach();
            $('.bounced_drag').show();
            resizeFn();
            //获取本地数据
            window.CppCall('mainframe', 'addlocalgame', '');
        });
    }
    //视频事件

    function videoFn(){

        //点击全景视频打开本地事件
        $('.fullscreen_video').on('click',function(){
            $('.video_play .valiantPhoto').attr('data-video-src','');
            $('.video_play').show();
            $('.video_list').hide();
            $('.video_history_con').hide();
            $('.add_local_video').show();
            $('.video_content').hide();
            $('.video_intro').hide();
            $('.video_detail').hide();
            videoPauseBtn()
        });
        //点击列表显示视频播放
        $('.video_list_container li').on('click',function(){
            if($('.valiantPhoto ').find('video')){
                $('.valiantPhoto ').find('video').attr('src','')
            }
            var videoSrc =$(this).data('src');
            console.dir(videoSrc)
            $('.video_play').show();
            $('.video_list').hide();
            $('.video_detail').hide();
            $('.video_content').show();
            $('.add_local_video').hide();
            $('.video_intro').show();
            $('.video_play .valiantPhoto').attr('data-video-src',videoSrc);
            $('.valiantPhoto ').find('video').attr('src',videoSrc);
            $('.valiantPhoto').Valiant360();
            videoBtnFn();
            videoPlayBtn();
        });
        //点击历史记录显示
        $('.history_video').on('click',function(){
           $('.video_list').hide();
            $('.video_detail').hide();
           $('.video_history_con').show();
            $('.video_play').hide();
            if($('.valiantPhoto ').find('video')){
                $('.valiantPhoto ').find('video').attr('src','')
            }
            videoPauseBtn();
            resizeFn();
        });
        //点击精选进入精选详情页
        $('.video_list_con ul li').on('click',function(){
            var i = $(this).index();
            $('.video_list').hide();
            $('.video_detail').show();
            //console.dir(i)
            $('.detailListCon li.list').eq(i).show().siblings().hide();
            $('.scrollbar ').scrollTop(0);
            $('.video_history_con').hide();
            $('.video_play').hide();
            if($('.valiantPhoto ').find('video')){
                $('.valiantPhoto ').find('video').attr('src','')
            }
            videoPauseBtn();
        })
        //点击更多进入列表详情
        $('.video_list .button_more').on('click',function(){
            $('.video_list').hide();
            $('.video_detail').show();
            var i = $(this).parents('li').index();
            $('.video_list').hide();
            $('.detailListCon li.list').eq(i).show().siblings().hide();
            $('.scrollbar ').scrollTop(0);
        });
        //点击视频列表详情进入视频播放
        //点击列表显示视频播放
        $('.video_detail .video_detail_con li').on('click',function(){
            if($('.valiantPhoto ').find('video')){
                $('.valiantPhoto ').find('video').attr('src','')
            }
            var videoSrc =$(this).data('src');
            console.dir(videoSrc)
            $('.video_play').show();
            $('.video_list').hide();
            $('.video_detail').hide();
            $('.video_content').show();
            $('.add_local_video').hide();
            $('.video_intro').show();
            $('.video_play .valiantPhoto').attr('data-video-src',videoSrc);
            $('.valiantPhoto ').find('video').attr('src',videoSrc);
            $('.valiantPhoto').Valiant360();
            videoBtnFn();
            videoPlayBtn();
        });
        //点击like
        $('.in_video_information .like').on('click',function(){
            var num =$(this).find('b').text();
            var num = parseInt(num)+1;
            if(!$('.in_video_information .unlike').hasClass('cur')){
                if(!$(this).hasClass('cur')){
                    //console.dir(num)
                    $(this).find('b').text(num);
                    $(this).addClass('cur');
                }
            }
        });
        $('.in_video_information .unlike').on('click',function(){
            var num =$(this).find('b').text();
            var num = parseInt(num)+1;
            if(!$('.in_video_information .like').hasClass('cur')){
                if(!$(this).hasClass('cur')){
                    //console.dir(num)
                    $(this).find('b').text(num);
                    $(this).addClass('cur');
                }
            }
        });
        //点击打开文件
        $('.add_local_video ').on('click',function(){
            alert('添加本地文件');
        });
    }

    //判断当视频播放器隐藏的时候暂时视频
    //视频播放器事件
    function videoBtnFn(){
        $('.valiantPhoto').find('video').attr('id','myVideo');
        var myVideo = document.getElementById('myVideo');
        var tol;
        myVideo.addEventListener("loadedmetadata", function(){
            tol = myVideo.duration;//获取总时长
            //console.dir(tol);
            var min = parseInt(tol/60);
            var sec =parseInt(tol - min*60) ;
            //console.dir(parseInt(min));
            //console.dir(parseInt(sec));
            $('.video_time i').text(min+':'+sec);
        });
        //播放时间点更新时
        myVideo.addEventListener("timeupdate", function(){
            var currentTime = myVideo.currentTime;//获取当前播放时间
            //console.dir(currentTime);
            $('.video_time b').text(parseInt(currentTime/60)+':'+parseInt(currentTime - parseInt(currentTime/60)*60));
            var wid =currentTime*942/tol;
            if(wid<18){
                wid = 18;
            }
            $('.video_controls .in_pro').css('width',wid);
        });
        //设置播放点
        function playBySeconds(num){
            myVideo.currentTime = num;
        }
        //音量改变时
        myVideo.addEventListener("volumechange", function(){
            var volume = myVideo.volume;//获取当前音量
            //console.log(volume);//在调试器中打印
        });
        //设置音量
        function setVol(num){
            myVideo.volume = num;
        }
        //
        //点击音量拖拽
        $('.controls_btn  a.voice_pro p i').mousedown(function(){
            $(document).mousemove(function(event){
                var mouseX = event.clientX;
                var btnX = $('.voice_pro p').offset().left;
                var widthBox = $('.voice_pro').width();
                var minX = mouseX - btnX;
                console.dir(minX);
                if(minX<14){
                    minX = 14;
                }else if(minX>widthBox){
                    minX = widthBox;
                }
                $('.voice_pro p').css('width',minX);
                setVol(minX/70);
            })
            $(document).mouseup(function (){
                $(this).unbind("mousemove");
            });
        })
        //视频进度拖拽
        $('.video_pro   .in_pro  i').mousedown(function(){
            $(document).mousemove(function(event){
                var mouseX = event.clientX;
                var btnX = $('.video_pro   .in_pro').offset().left;
                var widthBox = $('.video_pro').width();
                var minX = mouseX - btnX;
                //console.dir(minX);
                if(minX<18){
                    minX = 18;
                }else if(minX>widthBox){
                    minX = widthBox;
                }
                $('.video_pro   .in_pro').css('width',minX);
                playBySeconds(minX*tol/960);
            })
            $(document).mouseup(function (){
                $(this).unbind("mousemove");
            });
        })
    }
    //视频按钮事件
    function videoPlayBtn(){
            myVideo.play();
            $('.controls_btn .switch').addClass('fa-pause');
    }
    function videoPauseBtn(){
             myVideo.pause();
            $('.controls_btn .switch').addClass('fa-play');
    }
    videoFn();
    //注册登录
    loginInFn();
    //添加本地程序弹框
    addGameFn();
    bindEvent();
    leftListStatus();
    return {interface:interface}
};
var mainFn = new MainFn();



/*

 mainFn.interface('main_panel','changeLanguage', data11);
 mainFn.interface('main_panel','menu', data12);
 mainFn.interface('list','store',data2);
 mainFn.interface('list','left_item',data1);
 mainFn.interface('list','add_local',data2222);
 mainFn.interface('detail','detail_online_lick',data4);
 mainFn.interface('detail','game_comment',data13);
 mainFn.interface('main_panel','changeLanguage', data11);




 mainFn.interface('main_panel','changeLanguage', data11);
 mainFn.interface('main_panel','menu', data12);
 mainFn.interface('list','store',data2);
 mainFn.interface('list','left_item','');
 mainFn.interface('list','add_local',data2222);
 mainFn.interface('detail','detail_online_lick',data4);
 mainFn.interface('detail','game_comment',data13);
 mainFn.interface('main_panel','changeLanguage', data11);

 mainFn.interface('main_panel','changeLanguage', data11);
 mainFn.interface('main_panel','menu', data12);
 mainFn.interface('list','store',data2);
 mainFn.interface('list','left_item',data1);
 mainFn.interface('list','add_local',data2222);
 mainFn.interface('detail','detail_online_lick',data4);
 mainFn.interface('detail','game_comment',data13);
 mainFn.interface('main_panel','changeLanguage', data11);
 mainFn.interface('main_panel','menu', data12);
 mainFn.interface('list','store',data2);
 mainFn.interface('list','left_item',data1);
 mainFn.interface('list','add_local',data2222);
 mainFn.interface('detail','detail_online_lick',data4);
 mainFn.interface('detail','game_comment',data13);

 mainFn.interface('main_panel','changeLanguage', data11);
 mainFn.interface('main_panel','menu', data12);
 mainFn.interface('list','store',data2);
 mainFn.interface('list','left_item',data1);
 mainFn.interface('list','add_local',data2222);
 mainFn.interface('detail','detail_online_lick',data4);
 mainFn.interface('detail','game_comment',data13);




 mainFn.interface('detail','detail_click',data3);


 mainFn.interface('main_panel','changeLanguage', data11);
 mainFn.interface('main_panel','menu', data12);
 mainFn.interface('list','add_local',data2);
 mainFn.interface('list','store',data2);



mainFn.interface('main_panel','changeLanguage', data11);
mainFn.interface('main_panel','menu', data12);
mainFn.interface('list','add_local',data2);
mainFn.interface('list','store',data2);
mainFn.interface('list','left_item',data1);
mainFn.interface('detail','detail_click',data3);



 mainFn.interface('main_panel','changeLanguage', data11)
 mainFn.interface('list','store',data2);
 mainFn.interface('list','left_item',data1);
 mainFn.interface('detail','detail_click',data3);
 mainFn.interface('main_panel','changeLanguage', data11)





mainFn.interface('main_panel','changeLanguage', data11)

mainFn.interface('list','left_item',data1);
 mainFn.interface('detail','detail_click',data3);

mainFn.interface('drive','access_drive',data6);
mainFn.interface('drive','access_drive',data6);


mainFn.interface('detail','detail_downLoad_pro',data8);


mainFn.interface('drive','update_drive',data8);



  



mainFn.interface('main_panel','changeLanguage', data11)
mainFn.interface('detail','detail_online_lick',data4);
mainFn.interface('list','left_item',data1);
mainFn.interface('detail','start_game',data10);
*/

