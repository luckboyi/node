$(function(){
    resizeFn();
    //设置
    $('.set').click(function(e){
        $('.manager ul.setting_list').toggle();
        /*$('.changeLanguage').click(function(){
         $('ul.language_list').toggle();
         })*/

        e.stopPropagation();
    });
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
    });
    $(window).click(function(){
        $('.manager ul').hide();
        $('.delete').hide()
    })
})
//监听list高度
function resizeFn(){
    var winHeight;
    if (window.innerHeight){
        winHeight = window.innerHeight;
    }else if ((document.body) && (document.body.clientHeight))
    { winHeight = document.body.clientHeight;}
    //console.log(winHeight);
    //调用滚动事件

    $('.js_list_hei').height((winHeight-81)+'px');
    /*$('.side_list').height((winHeight-81)+'px');*/
    $('.js_scr_hei').height((winHeight-81-40)+'px');
    $('.js_store_scr_hei').height((winHeight-81-12)+'px');
    $('.js_store_hei').height((winHeight-81-5)+'px');
    $('.js_detail_hei').height((winHeight-81-110)+'px');
    setTimeout(function(){
        $('#scrollbar1').tinyscrollbar();
        $('#scrollbar2').tinyscrollbar();
        $('#scrollbar3').tinyscrollbar();
        $('#scrollbar4').tinyscrollbar();
    }, 10)

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
        $('.detail_btn').hide();
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

//滚动条
(function(a) {
    a.tiny = a.tiny || {};
    a.tiny.scrollbar = {
        options: {
            axis: "y",
            wheel: 40,
            scroll: true,
            lockscroll: true,
            size: "auto",
            sizethumb: "auto",
            invertscroll: false
        }
    };
    a.fn.tinyscrollbar = function(d) {
        var c = a.extend({}, a.tiny.scrollbar.options, d);
        this.each(function() {
            a(this).data("tsb", new b(a(this), c))
        });
        return this
    };
    a.fn.tinyscrollbar_update = function(c) {
        return a(this).data("tsb").update(c)
    };

    function b(q, g) {
        var k = this,
            t = q,
            j = {
                obj: a(".viewport", q)
            }, h = {
                obj: a(".overview", q)
            }, d = {
                obj: a(".scrollbar", q)
            }, m = {
                obj: a(".track", d.obj)
            }, p = {
                obj: a(".thumb", d.obj)
            }, l = g.axis === "x",
            n = l ? "left" : "top",
            v = l ? "Width" : "Height",
            r = 0,
            y = {
                start: 0,
                now: 0
            }, o = {}, e = "ontouchstart" in document.documentElement;

        function c() {
            k.update();
            s();
            return k
        }
        this.update = function(z) {
            j[g.axis] = j.obj[0]["offset" + v];
            h[g.axis] = h.obj[0]["scroll" + v];
            h.ratio = j[g.axis] / h[g.axis];
            d.obj.toggleClass("disable", h.ratio >= 1);
            m[g.axis] = g.size === "auto" ? j[g.axis] : g.size;
            p[g.axis] = Math.min(m[g.axis], Math.max(0, (g.sizethumb === "auto" ? (m[g.axis] * h.ratio) : g.sizethumb)));
            d.ratio = g.sizethumb === "auto" ? (h[g.axis] / m[g.axis]) : (h[g.axis] - j[g.axis]) / (m[g.axis] - p[g.axis]);
            r = (z === "relative" && h.ratio <= 1) ? Math.min((h[g.axis] - j[g.axis]), Math.max(0, r)) : 0;
            r = (z === "bottom" && h.ratio <= 1) ? (h[g.axis] - j[g.axis]) : isNaN(parseInt(z, 10)) ? r : parseInt(z, 10);
            w()
        };

        function w() {
            var z = v.toLowerCase();
            p.obj.css(n, r / d.ratio);
            h.obj.css(n, -r);
            o.start = p.obj.offset()[n];
            d.obj.css(z, m[g.axis]);
            m.obj.css(z, m[g.axis]);
            p.obj.css(z, p[g.axis])
        }

        function s() {
            if (!e) {
                p.obj.bind("mousedown", i);
                m.obj.bind("mouseup", u)
            } else {
                j.obj[0].ontouchstart = function(z) {
                    if (1 === z.touches.length) {
                        i(z.touches[0]);
                        z.stopPropagation()
                    }
                }
            } if (g.scroll && window.addEventListener) {
                t[0].addEventListener("DOMMouseScroll", x, false);
                t[0].addEventListener("mousewheel", x, false);
                t[0].addEventListener("MozMousePixelScroll", function(z) {
                    z.preventDefault()
                }, false)
            } else {
                if (g.scroll) {
                    t[0].onmousewheel = x
                }
            }
        }

        function i(A) {
            a("body").addClass("noSelect");
            var z = parseInt(p.obj.css(n), 10);
            o.start = l ? A.pageX : A.pageY;
            y.start = z == "auto" ? 0 : z;
            if (!e) {
                a(document).bind("mousemove", u);
                a(document).bind("mouseup", f);
                p.obj.bind("mouseup", f)
            } else {
                document.ontouchmove = function(B) {
                    B.preventDefault();
                    u(B.touches[0])
                };
                document.ontouchend = f
            }
        }

        function x(B) {
            if (h.ratio < 1) {
                var A = B || window.event,
                    z = A.wheelDelta ? A.wheelDelta / 120 : -A.detail / 3;
                r -= z * g.wheel;
                r = Math.min((h[g.axis] - j[g.axis]), Math.max(0, r));
                p.obj.css(n, r / d.ratio);
                h.obj.css(n, -r);
                if (g.lockscroll || (r !== (h[g.axis] - j[g.axis]) && r !== 0)) {
                    A = a.event.fix(A);
                    A.preventDefault()
                }
            }
        }

        function u(z) {
            if (h.ratio < 1) {
                if (g.invertscroll && e) {
                    y.now = Math.min((m[g.axis] - p[g.axis]), Math.max(0, (y.start + (o.start - (l ? z.pageX : z.pageY)))))
                } else {
                    y.now = Math.min((m[g.axis] - p[g.axis]), Math.max(0, (y.start + ((l ? z.pageX : z.pageY) - o.start))))
                }
                r = y.now * d.ratio;
                h.obj.css(n, -r);
                p.obj.css(n, y.now)
            }
        }

        function f() {
            a("body").removeClass("noSelect");
            a(document).unbind("mousemove", u);
            a(document).unbind("mouseup", f);
            p.obj.unbind("mouseup", f);
            document.ontouchmove = document.ontouchend = null
        }
        return c()
    }
}(jQuery));

//拖拽
$(function(){
    /*function drag(obj){
        obj.mousedown(function(e){
            var disX = e.clientX - $(this).offset().left;
            var disY = e.clientY - $(this).offset().top ;
            $(document).mousemove(function(e){
                var left = e.clientX - disX;
                var top = e.clientY -disY ;
                console.dir(disX)
                if(left<0){
                    left = 0
                }else if(left> e.clientX){
                    left = e.clientX;
                }
                if(top<0){
                    top = 0
                }else if(top> e.clientY){
                    top = e.clientY;
                }
                obj.css('left',left);
                obj.css('top',top);
            })
            $(document).mouseup(function(){
                $(document).off();
            })
            e.stopPropagation();
            return false;
        })
    }*/

    function drag(obj){
        var disY=0;
        var disX=0;
        obj.mousedown(function(ev){
            disX=ev.pageX-$(this).offset().left;
            disY=ev.pageY-$(this).offset().top;

            /*console.dir(ev)*/
            $(document).mousemove(function(ev){
                var left = ev.pageX-disX;
                var top = ev.pageY-disY;
                /*left<0 ? left =0 :left ;
                 top < 0 ? top=0:top;
                 left>ev.pageX ? : left ;
                 top>ev.pageY ? top= ev.pageY: top ;*/
                if(left<0){
                    left = 0 ;
                }else if(left> ev.pageX ){
                    left= ev.pageX
                }else{
                    left = left;
                }
                if(top<0){
                    top = 0 ;
                }else if(top> ev.pageY ){
                    top= ev.pageY
                }else{
                    top = top;
                }
                obj.css('left',left);
                obj.css('top',top);
            })
            $(document).mouseup(function(){
                $(document).off();
            })
            return false;
        })
    }
    drag($('#confirmation_drag'))
    drag($('.bounced_drag'))

})
