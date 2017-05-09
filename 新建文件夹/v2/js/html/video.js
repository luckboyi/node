//视频列表
function videoLeftListHtml(val) {
    html = '<li class="in_side_con clearfix" vt-id="'+val.vt_id+'">\
                    <div class="lise_content clearfix">\
                    <img src="' + val.imgSrc + '" />\
                    <div class="fl">\
                    <p class="title" title=' + val.title +'>' + val.title + '</p>';
    html += ' <span>' + val.tag + '</span>';
    html += '</div>\
                    </div>\
            </li>';
    $('.in_side_list .overview.video_list_con ul').append(html);
    resizeFn();
}
//获取视频列表数据
function videoLeftListData(data){
    $(data).each(function(key,val){
        videoLeftListHtml(val);
    });
    resizeFn();
}
//视频首页结构
function videoHomePageHtml(val){
    html='<li  class="videoList" video-id="'+val.video_id+'" vt-id="'+val.vt_id+'">\
            <div class="video_list_header clearfix">\
                <h4 class="fl">'+val.title+'</h4>\
                <b class="fl language" data-name="">共</b><span class="fl">'+val.sum+'</span><b class="fl language" data-name="video_num">部视频</b>\
                <div class="button_more fr language" data-name="more" onclick="btnMoreFn('+val.vt_id+')">更多</div>\
            </div>\
            <div class="video_list_container">\
                <ul class=" clearfix">\
                    <li class="fl pr" title="'+val.recomName+'" data-src="'+val.url+'" video-id="'+val.video_id+'" vt-id="'+val.vt_id+'"   explain="'+val.explain+'">\
                        <a href="javascript:;">\
                            <img src="'+val.recomImg+'">\
                            <span class="pa">'+val.recomVideoTime+'</span>\
                            <div class="video_hover pa center"></div>\
                        </a>\
                        <p class="clearfix"><i class="fl">'+val.recomName+'</i><span class="fr clearfix"><em class="fl">'+val.peopleNum+'</em></span></p>\
                    </li>';
    for(var i=0;i<val.list.length ; i++){
        html += ' <li class="fl pr" title="'+val.list[i].videoName+'" data-src="'+val.list[i].url+'" video-id="'+val.list[i].video_id+'" vt-id="'+val.list[i].vt_id+'"  explain="'+val.list[i].explain+'">\
                        <a href="javascript:;">\
                            <img src="'+val.list[i].showImg+'">\
                            <span class="pa">'+val.list[i].videoTime+'</span>\
                            <div class="video_hover pa center video_hover_small"></div>\
                        </a>\
                        <p class="clearfix"><i class="fl video_name">'+val.list[i].videoName+'</i><span class="fr clearfix"><em class="fl">'+val.list[i].peopleNum+'</em></span></p>\
                 </li>';
    }
    html +='</ul></div></li>';
    html = changeLanguage(languageDate, $(html));
    $('.video_list ol').append(html);
}
//首页数据
function videoHomePageData(data){
    $(data).each(function(key,val){
        videoHomePageHtml(val);
    });
    resize_video_list();
}
//banner页
function  bannerHtml(val){
    html ='<li class="poster-item"><a href="javascript:;" data-src="'+val.url+'" video-id="'+val.video_id+'"  vt-id="'+val.vt_id+'"    explain="'+val.explain+'" video-name="'+val.title+'"><img src="'+val.bannerImg+'" width="100%" height="100%"></a></li>'
    $('#videoBanner').append(html);
}
//获取banner页数据
function bannerDate(data){
    $(data).each(function(key,val){
        bannerHtml(val);
    });
    bannerVideo();
}
//视频详细列表头部内容
function videoRightHeaderHtml(val){
    html='<div><h4 class="fl">'+val.title+'</h4><b class="fl language" data-name="">共</b><span class="fl">'+val.sum+'</span><b class="fl language" data-name="language">部视频</b></div>';
    $('.video_detail .video_list_header').append(html);
}
function videoRightHeaderData(data){
    $(data).each(function(key,val){
        videoRightHeaderHtml(val);
    });
}
//视频详细列表内容
function videoRightListHtml(val){
    html ='<li class="fl"  data-src="'+val.url+'" video-id="'+val.video_id+'"  vt-id="'+val.vt_id+'"    explain="'+val.explain+'">\
                    <div class="img_contain pr">\
                        <img src="'+val.imgSrc+'">\
                        <p class="video_timer pa">'+val.videoTime+'</p>\
                        <div class="video_hover pa center video_hover_small"></div>\
                    </div>\
                    <p class="clearfix"><i class="fl">'+val.title+'</i><span class="fr clearfix"><em class="fl">'+val.peopleNum+'</em></span></p>\
                </li>';
    $('.video_detail .video_detail_con ul').append(html);
};
//视频详细列表数据
function videoRightListData(data){
    $(data).each(function(key,val){
        videoRightListHtml(val);
    });
    resize_videoDetail_list();
}
//观看历史记录标题
function videoLookHistoryHeader(val){
    html='<li vt-id="'+val.id+'">\
        <div class="video_list_header clearfix">\
        <div><h4 class="fl">'+val.title+'</h4><b class="fl language" data-name="total">共</b><span class="fl">'+val.sum+'</span><b class="fl language" data-name="video_num">部视频</b></div></div>\
        <div class="video_detail_con">\
        <ul class="clearfix"></ul>\
        </div>\
        <li>';
    html = changeLanguage(languageDate, $(html));
    $('.video_history_con ol').append(html);
}
function videoLookHistoryHeaderData(data){
    $(data).each(function(key,val){
        videoLookHistoryHeader(val);
    });

}
//视频观看历史记录
function videoLookHistoryHtml(val,key){
    html ='<li class="fl"   data-src="'+val.url+'" video-id="'+val.video_id+'"  id="'+val.id+'"    explain="'+val.explain+'">\
                    <div class="img_contain pr">\
                        <img src="'+val.imgSrc+'">\
                        <p class="video_timer pa">'+val.videoTime+'</p>\
                        <div class="video_hover pa center video_hover_small"></div>\
                    </div>\
                    <p class="clearfix"><i class="fl">'+val.title+'</i><span class="fr clearfix"><em class="fl">'+val.peopleNum+'</em></span></p>\
                </li>';
    $('.video_history_con li').eq(key).find('.video_detail_con ul').append(html);
}
//视频观看历史记录数据
function videoLookHistoryData(data){
    $(data).each(function(key,val){
        for(var i=0 ; i<$('.video_history_con ol li').length; i++){
            if(val.id == $('.video_history_con ol li').eq(i).attr('vt-id')){
                videoLookHistoryHtml(val,i);
            }
        }
    })
};
//视频描述信息数据
function videoInformationData(data){
    $('.video_play .video_content_head p b').text(data.watchTimes);
    $('.video_play .video_content_head .unlike b').text(data.unlike);
    $('.video_play .video_content_head .like b').text(data.like);
}

//添加视频源
function addVideoSource(data){
   /* $('.add_local_video').hide();
    $('.video_play .valiantPhoto').attr('data-video-src',data.src);
    $('.video_play .valiantPhoto').find('video').attr('src',data.src);
    $('.valiantPhoto').Valiant360();
    videoBtnFn();
    videoPlayBtn();*/

}
//首页事件
function homePageFn(){
    //点击首页列表进入视频播放
    $('.video_list').on('click','.video_list_container  ul li',function(){
        emptyVideo();
        var video_id = $(this).attr('video-id');
        var video_src = $(this).attr('data-src');
        var title = $(this).attr('title');
        var explain = $(this).attr('explain');
        var vt_id = $(this).attr('vt-id');
        if(vt_id == 13){
            location.href = '#sceneryPlay';
            var hash = location.hash;
            getGameInfo(hash);
            var html='<iframe width="100%" height="100%" scrolling="no" frameborder="0" src="'+video_src+'" ></iframe>';
            $('.scenery_play').html('').html(html);
        }else{
            $('.video_play .video_content_head h4').text(title);
            $('.video_play .video_intro').text(explain);
            $('.video_play').attr('video-id',video_id);
            $('.video_play .valiantPhoto').attr('video-id',video_id);
            $('.video_play .valiantPhoto').attr('data-video-src',video_src);
            $('.video_play .valiantPhoto').find('video').attr('src',video_src);
            $('.valiantPhoto').Valiant360();
            location.href = '#videoPlay';
            var hash = location.hash;
            getGameInfo(hash);
            //添加视频数据
            window.CppCall('videoframe', 'videoclicked', video_id);
        }
        videoBtnFn();
        videoPlayBtn();
        resizeFn();
    });
}
//banner事件
function bannerListFn(){
    //点击banner进行视频播放
    $('.video_detail #videoBanner').on('click','li',function(){
        emptyVideo();
        var video_id = $(this).attr('video-id');
        var video_src = $(this).attr('data-src');
        var title = $(this).attr('video-name');
        var explain = $(this).attr('explain');
        var vt_id = $(this).attr('vt-id');
        //alert(vt_id)
        if($(this).hasClass('current')){
            if(vt_id == 13){
                location.href = '#sceneryPlay';
                var hash = location.hash;
                getGameInfo(hash);
                var html='<iframe width="100%" height="100%" scrolling="no" frameborder="0" src="'+video_src+'" ></iframe>';
                $('.scenery_play').text('').text(html);
            }else{
                $('.video_play .video_content_head h4').text(title);
                $('.video_play .video_intro').text(explain);
                $('.video_play').attr('video-id',video_id);
                $('.video_play .valiantPhoto').attr('data-video-src',video_src);
                $('.video_play .valiantPhoto').attr('video-id',video_id);
                $('.video_play .valiantPhoto').find('video').attr('src',video_src);
                $('.valiantPhoto').Valiant360();
                location.href = '#videoPlay';
                var hash = location.hash;
                getGameInfo(hash);
                //添加视频数据
                window.CppCall('videoframe', 'videoclicked', video_id);
            }
        }
        videoBtnFn();
        videoPlayBtn();
        resizeFn();
    });
}
//视频列表事件
function videoListFn(){
    //点击详情进入视频播放
    $('.video_detail .video_detail_con ul').on('click','li',function(){
        emptyVideo();
        var video_id = $(this).attr('video-id');
        var video_src = $(this).attr('data-src');
        var title = $(this).attr('title');
        var explain = $(this).attr('explain');
        var vt_id = $(this).attr('vt-id');
        if(vt_id == 13){
            location.href = '#sceneryPlay';
            var hash = location.hash;
            getGameInfo(hash);
            var html='<iframe width="100%" height="100%" scrolling="no" frameborder="0" src="'+video_src+'" ></iframe>';
            $('.scenery_play').text('').text(html);
        }else{
            $('.video_play .video_content_head h4').text(title);
            $('.video_play .video_intro').text(explain);
            $('.video_play').attr('video-id',video_id);
            $('.video_play .valiantPhoto').attr('data-video-src',video_src);
            $('.video_play .valiantPhoto').find('video').attr('src',video_src);
            $('.valiantPhoto').Valiant360();
            location.href = '#videoPlay';
            var hash = location.hash;
            getGameInfo(hash);
            //添加视频数据
            window.CppCall('videoframe', 'videoclicked', video_id);

        }
        videoBtnFn();
        videoPlayBtn();
        resizeFn();
    });

}
//视频历史记录事件
function historyFn(){
    //点击历史记录进行视频播放
    $('.video_history_con ').on('click','.video_detail_con ul li',function(){
        emptyVideo();

        var video_id = $(this).attr('video-id');
        var video_src = $(this).attr('data-src');
        var title = $(this).find('i.video_name').text();
        var vt_id = $(this).attr('vt-id');
        if(vt_id == 13){
            location.href = '#sceneryPlay';
            var hash = location.hash;
            getGameInfo(hash);
            var html='<iframe width="100%" height="100%" scrolling="no" frameborder="0" src="'+video_src+'" ></iframe>';
            $('.scenery_play').text('').text(html);
        }else{

            $('.video_play .video_content_head h4').text(title);
            $('.video_play .video_intro').text(explain);
            $('.valiantPhoto').Valiant360();
            $('.video_play').attr('video-id',video_id);
            $('.video_play .valiantPhoto').attr('data-video-src',video_src);
            $('.video_play .valiantPhoto').find('video').attr('src',video_src);
            $('.valiantPhoto').Valiant360();
            location.href = '#videoPlay';
            var hash = location.hash;
            getGameInfo(hash);
            //添加视频数据
            window.CppCall('videoframe', 'videoclicked', video_id);
        }
        videoBtnFn();
        videoPlayBtn();
        resizeFn();
    });
}
function btnMoreFn(val){
    //$('.video_detail .dg-wrapper').empty();
    $('.poster-list').empty();
    $('.video_detail .in_video_detail .video_list_header').empty();
    $('.video_detail .in_video_detail .video_detail_con ul').empty();
    emptyVideo();
    $('.video_list').hide();
    $('.video_detail').show();
    $('.video_history_con').hide();
    $('.video_play').hide();
    $('.iframe_close').hide();
    $('.scenery_play').hide();
    if($('.valiantPhoto ').find('video')){
        $('.valiantPhoto ').find('video').attr('src','');
    }
    window.CppCall('videoframe', 'videotypeclicked',''+val+'');
    resizeFn();
    bannerVideo();
}
function bannerVideo(){
    $('#videoBanner').movingBoxes({
        startPanel   : 1,
        reducedSize  : .9,
        wrap         : true,
        buildNav     : true,
        navFormatter : function(){ return ""; } // 指示器格式，为空即会显示123
    });
}
//视频初始化
function emptyVideo(){
    $('.valiantPhoto').Valiant360();
    $('.video_play .valiantPhoto').attr('data-video-src','');
    if($('.valiantPhoto ').find('video')){
        $('.valiantPhoto ').find('video').attr('src','')
    }
    /*if($('.valiantPhoto ').find('canvas')){
     var c=document.getElementById("myCanvas");

     }*/
    $('.video_time ').find('i').text('00:00');
    $('.video_time ').find('b').text('00:00');
    $('.add_local_video').hide();
}
//视频页事件
function videoFn(){
    //点击退出 退全景播放
    $('div.iframe_close').on('click',function(){
        $(this).hide();
        $('.scenery_play').hide();
    });
    //点击全景视频打开本地事件
    $('.fullscreen_video').on('click',function(){
        emptyVideo();
        location.href = '#localVideoPlay';
        var hash = location.hash;
        getGameInfo(hash);
        //点击打开本地文件
        $('.open_local_file').on('click',function(e){
            $('.add_local_video').hide();
            window.CppCall('videoframe', 'videoopendir', '');
            e.stopPropagation();
        });
        resizeFn();
    });
    //点击历史记录显示
    $('.history_video').on('click',function(){
        emptyVideo();
        /*判断是否登录*/
        if($('.user .name').text() != ''){
            location.href = '#videoHistoryTypeShow';
            var hash = location.hash;
            getGameInfo(hash);
            window.CppCall('videoframe', 'videoshowhistory', '');
        }else{
            tipsFn.init({
                model:'tips',
                headerMsg:'提示',
                msg:'您还未登录,请先登录！',
                sucCallback:function(){
                    $('.login_enter_mask').show();
                }
            });
        }

        videoPauseBtn();
        resizeFn();
    });

    //点击左侧列表进入精选详情页
    $('.video_list_con ul').on('click','li',function(){
        /*mainFn.interface('login','login_state',loginData);*/
        $('#videoBanner').empty();
        $('.video_detail .in_video_detail .video_list_header').empty();
        $('.video_detail .in_video_detail .video_detail_con ul').empty();
        $(this).addClass('cur').siblings().removeClass('cur');
        var videoTitle =  $(this).find('.title').html();
        var vt_id= $(this).attr('vt-id');
        if(vt_id == 1){
            location.href = '#video';
            window.onhashchange = function() {
                var hash = location.hash;
                getGameInfo(hash);
            };
            $('.video_list_con').find('.in_side_con').eq(0).addClass('cur').siblings().removeClass('cur')
            var title = $('.add_title').find('.video').attr('data-name');
            window.CppCall('mainframe', 'main_tab_changed', title);
            resizeFn();
        }else{
            location.href = '#videoTypeShow';
            window.onhashchange = function() {
                var hash = location.hash;
                getGameInfo(hash);
            };
            window.CppCall('videoframe', 'videotypeclicked', vt_id);
            mainFn.interface('video','listBanner',videoBanner);
            setTimeout(function(){
                resizeFn();
            },10)
        }
    });
    //点击like
    $('.in_video_information .like').on('click',function(){
        var json ={}
        var video_id = $(this).parents('.video_play').attr('video-id');
        json.video_id = video_id;
        json.state = 1;
        //判断是否登录
        if($('.header  .user').attr('u-id') == ''){
            alert('请先登录')
        }else{
            if(!$('.in_video_information .unlike').hasClass('cur')){
                if(!$(this).hasClass('cur')){
                    //console.dir(num)
                    $(this).addClass('cur');
                }
            }
            window.CppCall('videoframe', 'videorated', JSON.stringify(json));
        }

    });
    $('.in_video_information .unlike').on('click',function(){
        var json ={}
        var video_id = $(this).parents('.video_play').attr('video-id');
        json.video_id = video_id;
        json.state = 1;
        if($('.header  .user').attr('u-id') == ''){
            alert('请先登录')
        }else{
            if(!$('.in_video_information .like').hasClass('cur')){
                if(!$(this).hasClass('cur')){
                    //console.dir(num)
                    $(this).addClass('cur');
                }
            }
        }
        //console.dir(json);
        window.CppCall('videoframe', 'videorated', JSON.stringify(json));
    });
    //点击打开文件
    $('.add_local_video').on('click',function(){
        $('.open_local_file').hide();
        //$(this).hide();
        window.CppCall('videoframe', 'videoopendir', '');
    });
}

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
        if(min<10){
            min = '0'+min+'';
        };
        if(sec<10){
            sec = '0'+sec+'';
        };
        //console.dir(parseInt(min));
        //console.dir(parseInt(sec));
        $('.video_time i').text(min+':'+sec);
    });
    //播放时间点更新时
    var currentTime;
    myVideo.addEventListener("timeupdate", function(){
        currentTime = myVideo.currentTime;//获取当前播放时间
        var min = parseInt(currentTime/60);
        var sec = parseInt(currentTime - parseInt(currentTime/60)*60);
        if(min<10){
            min = '0'+min+'';
        };
        if(sec<10){
            sec = '0'+sec+'';
        };
        //console.dir(currentTime);
        $('.video_time b').text(min+':'+sec);
        var wid =currentTime*960/tol;
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
    //点击音量拖拽
    $('.controls_btn  a.voice_pro p i').mousedown(function(e){
        $(document).mousemove(function(event){
            var mouseX = event.clientX;
            var btnX = $('.voice_pro p').offset().left;
            var widthBox = $('.voice_pro').width();
            var minX = mouseX - btnX;
            //console.dir(minX);
            if(minX<14){
                minX = 14;
                $('.controls_btn  .voice ').addClass('fa-volume-off').removeClass('fa-volume-up');
                setVol(0);
            }else if(minX>widthBox){
                $('.controls_btn  .voice ').removeClass('fa-volume-off').addClass('fa-volume-up');
                minX = widthBox;
            }
            $('.voice_pro p').css('width',minX);
            setVol(minX/70);
        })
        $(document).mouseup(function (){
            $(this).unbind("mousemove");
        });
        e.stopPropagation();
    });
    //设置音量进度
    $('.voice_pro').on('click',function(e){
        var mouseX = e.clientX;
        var btnX = $(this).offset().left;
        var minX  = mouseX - btnX;
        $('.voice_pro p').css('width',minX);
        setVol(minX/70);
    })
    //视频进度拖拽
    $('.video_pro  .in_pro  i').mousedown(function(){
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
    });
    //设置视频播放的位置
    $('.video_pro').on('click',function(e){
        var mouseX = e.clientX;
        var btnX = $(this).offset().left;
        var minX  = mouseX - btnX;
        $('.video_pro   .in_pro').css('width',minX);
        playBySeconds(minX*tol/960);

    })

    //点击播放暂停按钮禁止
    $('a.playButton ').on('click',function(e){
        //通知
        e.stopPropagation();
    })
    //点击vr
    $('a.vrBtn').on('click',function(e){
        //通知
        var vrJson ={
            url:'',
            time:''
        };
        vrJson.url = $(this).parents('.valiantPhoto').attr('data-video-src');
        vrJson.time =currentTime;
        videoPauseBtn();
        window.CppCall('videoframe', 'video_vr_open', JSON.stringify(vrJson));
        e.stopPropagation();
    });
    $('.video_controls ').on('click',function(e){
        e.stopPropagation();
    })
}
//视频按钮事件
function videoPlayBtn(){
    myVideo.play();
    $('.controls_btn .switch').addClass('fa-pause').removeClass('fa-play');
}
function videoPauseBtn(){
    myVideo.pause();
    $('.controls_btn .switch').addClass('fa-play').removeClass('fa-pause');
}