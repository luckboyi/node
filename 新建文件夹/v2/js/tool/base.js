$(function(){
    resizeFn();
    $(this).addClass('open').removeClass('close');
    //设置
    $('.set').click(function(e){
        $('.manager ul.setting_list').toggle();
        /*$('.changeLanguage').click(function(){
            $('ul.language_list').toggle();
        })*/
        
        e.stopPropagation();
    });
    dragFn();
$('.changeLanguage').hover(function() {
            $('ol.language_list').show();
        }, function() {
            $('ol.language_list').hide();
        });
        $('ol.language_list li').hover(function() {
            $('ol.language_list').show();
        }, function() {
            $('ol.language_list').hide();
        });
    $(window).resize(function() {
        resizeFn();
        resize_store();
        resize_video_list();
        resize_videoDetail_list();
        dragFn();
    });
    $(window).click(function(){
        $('.manager ul').hide();
        $('.delete').hide();
    });
    /*获取标签的距离左侧的距离*/
    var tips1 = $('.add_title .game').position().left-20;
    var tips2 = $('.add_title .video').position().left-30;
    var tips4 = $('.add_title .pageGame').position().left-15;
    $('.new_course').find('.tips1').css('left',tips1);
    $('.new_course').find('.tips2').css('left',tips2);
    $('.new_course').find('.tips4').css('left',tips4);

})
//ie下选择文件夹
function browseFolder(path){
    try {
        var Message = "\u8bf7\u9009\u62e9\u6587\u4ef6\u5939"; //选择框提示信息
        var Shell = new ActiveXObject("Shell.Application");
        var Folder = Shell.BrowseForFolder(0, Message, 64, 17); //起始目录为：我的电脑
        //var Folder = Shell.BrowseForFolder(0, Message, 0); //起始目录为：桌面
        if (Folder != null) {
            Folder = Folder.items(); // 返回 FolderItems 对象
            Folder = Folder.item(); // 返回 Folderitem 对象
            Folder = Folder.Path; // 返回路径
            if (Folder.charAt(Folder.length - 1) != "\\") {
                Folder = Folder + "\\";
            }
            document.getElementById(path).value = Folder;
            return Folder;
        }
    }
    catch (e) {
        alert(e.message);
    }
};

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
                        title = $(this).attr('value');
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

//图片预览
function previewFile1(){
    var preview = document.querySelector('img.image1');
    var file  = document.querySelector('input.file1').files[0];
    var reader = new FileReader();
    var url =$('.image1').attr('src') ;
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
    // var
}
function previewFile2(){
    var preview = document.querySelector('img.image2');
    var url =$('.image2').attr('src') ;
    var file  = document.querySelector('input.file2').files[0];
    var reader = new FileReader();
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
function previewFile3(){
    var preview = document.querySelector('img.image3');
    var file  = document.querySelector('input.file3').files[0];
    var url =$('.image3').attr('src') ;
    var reader = new FileReader();
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
function previewFile4(){
    var preview = document.querySelector('img.image4');
    var file  = document.querySelector('input.file4').files[0];
    var reader = new FileReader();
    var url =$('.image4').attr('src') ;
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
function previewFile5(){
    var preview = document.querySelector('img.image5');
    var file  = document.querySelector('input.file5').files[0];
    var reader = new FileReader();
    var url =$('.image5').attr('src') ;
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
//删除已上传的图片
$(function(){
    function imgFileHide(obj){
        obj.hide();
        obj.parents('div.fl').find('img').attr('src','');
        obj.parents('div.fl').find('img').hide();
    }
    $('.advice_close1').on('click',function(){
        imgFileHide($(this))
    });
    $('.advice_close2').on('click',function(){
        imgFileHide($(this))
    });
    $('.advice_close3').on('click',function(){
        imgFileHide($(this))
    });
    $('.advice_close4').on('click',function(){
        imgFileHide($(this))
    });
    $('.advice_close5').on('click',function(){
        imgFileHide($(this))
    });
    //点击确定
    $('.bounced_advice').find('.in-foot .browse').on('click',function(){
        //alert(1);
        var json ={
            uId:'',
            txt:'',
            phoneNum:'',
            qq:'',
            src:[]
        };
        var uId = $('.header .user').attr('u-id');
        var txt = $('.bounced_advice').find('textarea').val();
        var phoneNum =$('.bounced_advice').find('input[name="phoneNum"]').val();
        var qq = $('.bounced_advice').find('input[name="qq"]').val();
        var arr = new Array();
        var src1 = $('.bounced_advice').find('.image1').attr('src');
        var src2 = $('.bounced_advice').find('.image2').attr('src');
        var src3 = $('.bounced_advice').find('.image3').attr('src');
        var src4 = $('.bounced_advice').find('.image4').attr('src');
        var src5 = $('.bounced_advice').find('.image5').attr('src');
        arr[0] = src1 ;
        arr[1] = src2;
        arr[2] = src3;
        arr[3] =src4;
        arr[4] = src5;
        json.uId = uId;
        json.txt = txt;
        json.phoneNum = phoneNum;
        json.qq = qq;
        json.src = arr;
        feedback(json);
    });
    $('.success_bounced_msg').on('click','.close_btn ',function(){
        $(this).parents('.success_bounced_msg').hide();
    });
    $('.success_bounced_msg').on('click','.sure ',function(){
        $(this).parents('.success_bounced_msg').hide();
    });
})
//提交服务器
function feedback(json){
    $.ajax({
        url:'http://www.kingopr.com/index.php?uri=feedBack/feedBack',
        async:true,
        type:'POST',
        dataType:'json',
        data:json,
        success:function(data){
            console.dir('提交成功');
        }
    })
}
//监听list高度
function resizeFn(){
    var winHeight;
    if (window.innerHeight){
        winHeight = window.innerHeight;
    }else if ((document.body) && (document.body.clientHeight))
    { winHeight = document.body.clientHeight;}
    //console.log(winHeight);
    //调用滚动事件

    $('.js_list_hei').height((winHeight-51)+'px');
    /*$('.side_list').height((winHeight-81)+'px');*/
    $('.js_scr_hei').height((winHeight-51-28)+'px');
    $('.js_store_scr_hei').height((winHeight-1-12)+'px');
    $('.js_store_hei').height((winHeight-58)+'px');
    $('.js_detail_hei').height((winHeight-61-100)+'px');
    setTimeout(function(){
        $('#scrollbar1').tinyscrollbar();
        $('#scrollbar2').tinyscrollbar();
        $('#scrollbar3').tinyscrollbar();
        $('#scrollbar4').tinyscrollbar();
        $('#scrollbar5').tinyscrollbar();
        $('#scrollbar6').tinyscrollbar();
        $('#scrollbar7').tinyscrollbar();
    }, 10);
    resize_store();
    resize_video_list();
    resize_videoDetail_list();

    //hover的头像效果
}
//轮播
function banner(){
    //轮播
    function G(s) {
        return document.getElementById(s);
    }
    function getStyle(obj, attr) {
        if (obj.currentStyle) {
            return obj.currentStyle[attr];
        } else {
            return getComputedStyle(obj, false)[attr];
        }
    }
    function Animate(obj, json) {
        if (obj.timer) {
            clearInterval(obj.timer);
        }
        obj.timer = setInterval(function(){
            for (var attr in json) {
                var iCur = parseInt(getStyle(obj, attr));
                iCur = iCur ? iCur : 0;
                var iSpeed = (json[attr] - iCur) / 5;
                iSpeed = iSpeed > 0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);
                obj.style[attr] = iCur + iSpeed + 'px';
                if(iCur == json[attr]){
                    clearInterval(obj.timer);
                }
            }
        }, 50);
    }
    function clearAnimate () {
        clearInterval(oPicUl.timer);
        clearInterval(oListUl.timer);
    }

    var oPic = G("picBox");
    var oList = G("listBox");
    var oPrev = G("prev");
    var oNext = G("next");
    var oCenter = G('center');
    var oCenEm = oCenter.getElementsByTagName('em')[0];
    var oWidth = oCenter.offsetWidth - oCenEm.offsetWidth;
    var oPicLi = oPic.getElementsByTagName("li");
    var oListLi = oList.getElementsByTagName("li");
    var len1 = oPicLi.length;
    var len2 = oListLi.length;
    var oPicUl = oPic.getElementsByTagName("ul")[0];
    var oListUl = oList.getElementsByTagName("ul")[0];
    var w1 = oPicLi[0].offsetWidth;
    var w2 = oListLi[0].offsetWidth+5;
    var oLeft = 470/(len2-1);
    oPicUl.style.width = w1 * len1 + "px";
    oListUl.style.width = (w2+4) * len2+ "px";
    /*var oUlWidth = (w2+4) * len2;
     var oCenEmWidth = parseInt(310800/oUlWidth)+4
     oCenEm.style.width = oCenEmWidth+'px';*/
    var index = 0;

    var num = 5;
    var num2 = Math.ceil(num / 2);
    var picWidth = oListUl.offsetWidth - oPic.offsetWidth;
    function Change() {

        Animate(oPicUl, {left: - index * w1});

        if(index < num2){
            Animate(oListUl, {left: 0});
        }else if(index + num2 <= len2){
            Animate(oListUl, {left: - (index - num2 + 1) * w2});
        }else{
            Animate(oListUl, {left: - (len2 - num+ 1) * w2});
        }

        for (var i = 0; i < len2; i++) {
            oListLi[i].className = "";
            if(i == index){
                oListLi[i].className = "on";
                if(len2>4){ oCenEm.style.left = oLeft*i+'px';}
            }
        }
    }
    oNext.onclick = function(){
        index ++;
        index = index == len2 ? 0 : index;
        Change();

    }
    oPrev.onclick = function(){
        index --;
        index = index == -1 ? len2 -1 : index;
        Change();

    }
    for (var i = 0; i < len2; i++) {
        oListLi[i].index = i;
        oListLi[i].onclick = function(){
            index = this.index;
            Change();
        }
    }
    var disX = disY = 0 ;

    if(len2<5){
        var oUlWidth = (w2+4) * len2;
        var oCenEmWidth = parseInt(310800/oUlWidth)+4;
        oCenEm.style.width = 518+'px';
    }else{
        oCenter.onmousedown = function(e) {
            var event = e || event ;
            var x = event.clientX - oCenter.offsetLeft - oCenEm.offsetWidth / 2-270;
            x = ( x<0) ? 0 : x ;
            x = (x > 470) ? 470 : x ;
            oCenEm.style.left = x + 'px';
            var left = picWidth * x /470;
            clearAnimate();
            oListUl.style.left = -left + 'px';
        }
        oCenEm.onmousedown = function(e){
            var event = e || event ;
            disX = event.clientX - oCenEm.offsetLeft ;
            document.onmousemove = function(e){
                var event = e || event ;
                var x = event.clientX - disX ;
                x = ( x<0) ? 0 : x ;
                x = (x > 470) ? 470 : x ;
                oCenEm.style.left = x + 'px';
                var left = picWidth * x /470;
                clearAnimate();
                oListUl.style.left = -left + 'px';
            }
            document.onmouseup = function(){
                document.onmousemove = null;
                document.onmouseup = null;
            }
            e.preventDefault();
            e.stopPropagation();
        }
    }
}


//拖拽

function dragFn(){
   /* drag($('#drag1'),'.in_confirmation');
    drag($('#setDrag'),'.addGame-header');
    drag($('#addGameDrag'),'.addGame-header');
    drag($('#dragVer'),'.verification_head');
    /!*drag($('#login'),'.login_head');*!/
    drag($('#success_register'),'.verification_head');*/
    /*drag($('#login_enter'),'.login_in_header');*/
}
//拖拽封装
function drag(obj,moveObj){
    var left, top, $this;
    $(document).delegate(moveObj, 'mousedown', function (e) {
        left = e.clientX, top = e.clientY, $this = $(this).css('cursor', 'default');
        this.setCapture ? (this.setCapture(), this.onmousemove = function(ev) {
            mouseMove(ev);
        }, this.onmouseup = mouseUp(ev)) : $(document).bind("mousemove", mouseMove).bind("mouseup", mouseUp);
    });
    function mouseMove(e) {
        var target = obj;
        var l = Math.max((e.clientX - left + Number(target.css('margin-left').replace(/px$/, ''))  ), -target.position().left);
        var t = Math.max((e.clientY - top + Number(target.css('margin-top').replace(/px$/, '')) ), -target.position().top);
        l = Math.min(l, $(window).width() - target.width() - target.position().left);
        t = Math.min(t, $(window).height() - target.height() - target.position().top);
        left = e.clientX;
        top = e.clientY;
        target.css({ 'margin-left': l, 'margin-top': t });
    }
    function mouseUp(e) {
        var el = $this.css('cursor', 'default').get(0);
        el.releaseCapture ? (el.releaseCapture(), el.onmousemove = el.onmouseup = null) : $(document).unbind("mousemove", mouseMove).unbind("mouseup", mouseUp);
    }
}

/*分页插件*/
;!function(){"use strict";function a(d){var e="laypagecss";new f(d),a.dir&&!b[c](e)&&f.use(a.dir,e)}a.v="1.3";var b=document,c="getElementById",d="getElementsByTagName",e=0,f=function(a){var b=this,c=b.config=a||{};c.item=e++,b.render(!0)};f.on=function(a,b,c){return a.attachEvent?a.attachEvent("on"+b,function(){c.call(a,window.even)}):a.addEventListener(b,c,!1),f},f.getpath=function(){var a=document.scripts,b=a[a.length-1].src;return b.substring(0,b.lastIndexOf("/")+1)}(),f.use=function(c,e){var f=b.createElement("link");f.type="text/css",f.rel="stylesheet",f.href=a.dir,e&&(f.id=e),b[d]("head")[0].appendChild(f),f=null},f.prototype.type=function(){var a=this.config;return"object"==typeof a.cont?void 0===a.cont.length?2:3:void 0},f.prototype.view=function(){var b=this,c=b.config,d=[],e={};if(c.pages=0|c.pages,c.curr=0|c.curr||1,c.groups="groups"in c?0|c.groups:5,c.first="first"in c?c.first:"&#x9996;&#x9875;",c.last="last"in c?c.last:"&#x5C3E;&#x9875;",c.prev="prev"in c?c.prev:"&#x4E0A;&#x4E00;&#x9875;",c.next="next"in c?c.next:"&#x4E0B;&#x4E00;&#x9875;",c.pages<=1)return"";for(c.groups>c.pages&&(c.groups=c.pages),e.index=Math.ceil((c.curr+(c.groups>1&&c.groups!==c.pages?1:0))/(0===c.groups?1:c.groups)),c.curr>1&&c.prev&&d.push('<a href="javascript:;" class="laypage_prev" data-page="'+(c.curr-1)+'">'+c.prev+"</a>"),e.index>1&&c.first&&0!==c.groups&&d.push('<a href="javascript:;" class="laypage_first" data-page="1"  title="&#x9996;&#x9875;">'+c.first+"</a><span>&#x2026;</span>"),e.poor=Math.floor((c.groups-1)/2),e.start=e.index>1?c.curr-e.poor:1,e.end=e.index>1?function(){var a=c.curr+(c.groups-e.poor-1);return a>c.pages?c.pages:a}():c.groups,e.end-e.start<c.groups-1&&(e.start=e.end-c.groups+1);e.start<=e.end;e.start++)e.start===c.curr?d.push('<span class="laypage_curr" '+(/^#/.test(c.skin)?'style="background-color:'+c.skin+'"':"")+">"+e.start+"</span>"):d.push('<a href="javascript:;" data-page="'+e.start+'">'+e.start+"</a>");return c.pages>c.groups&&e.end<c.pages&&c.last&&0!==c.groups&&d.push('<span>&#x2026;</span><a href="javascript:;" class="laypage_last" title="&#x5C3E;&#x9875;"  data-page="'+c.pages+'">'+c.last+"</a>"),e.flow=!c.prev&&0===c.groups,(c.curr!==c.pages&&c.next||e.flow)&&d.push(function(){return e.flow&&c.curr===c.pages?'<span class="page_nomore" title="&#x5DF2;&#x6CA1;&#x6709;&#x66F4;&#x591A;">'+c.next+"</span>":'<a href="javascript:;" class="laypage_next" data-page="'+(c.curr+1)+'">'+c.next+"</a>"}()),'<div name="laypage'+a.v+'" class="laypage_main laypageskin_'+(c.skin?function(a){return/^#/.test(a)?"molv":a}(c.skin):"default")+'" id="laypage_'+b.config.item+'">'+d.join("")+function(){return c.skip?'<span class="laypage_total"><label>&#x5230;&#x7B2C;</label><input type="number" min="1" onkeyup="this.value=this.value.replace(/\\D/, \'\');" class="laypage_skip"><label>&#x9875;</label><button type="button" class="laypage_btn">&#x786e;&#x5b9a;</button></span>':""}()+"</div>"},f.prototype.jump=function(a){if(a){for(var b=this,c=b.config,e=a.children,g=a[d]("button")[0],h=a[d]("input")[0],i=0,j=e.length;j>i;i++)"a"===e[i].nodeName.toLowerCase()&&f.on(e[i],"click",function(){var a=0|this.getAttribute("data-page");c.curr=a,b.render()});g&&f.on(g,"click",function(){var a=0|h.value.replace(/\s|\D/g,"");a&&a<=c.pages&&(c.curr=a,b.render())})}},f.prototype.render=function(a){var d=this,e=d.config,f=d.type(),g=d.view();2===f?e.cont.innerHTML=g:3===f?e.cont.html(g):b[c](e.cont).innerHTML=g,e.jump&&e.jump(e,a),d.jump(b[c]("laypage_"+e.item)),e.hash&&!a&&(location.hash="!"+e.hash+"="+e.curr)},"function"==typeof define?define(function(){return a}):"undefined"!=typeof exports?module.exports=a:window.laypage=a}();
