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
    var w3 = $('#listBox').find('li.on').width();
    var oLeft = 484/(len2-1);
    oPicUl.style.width = w1 * len1 + "px";
    oListUl.style.width = (w3+6) * len2+ "px";
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
            Animate(oListUl, {left: - (index - num2 + 1) * w3});
        }else{
            Animate(oListUl, {left: - (len2 - num+ 1) * w3});
        }

        for (var i = 0; i < len2; i++) {
            oListLi[i].className = "";
            if(i == index){
                oListLi[i].className = "on";
                if(len2>4){ 
                	oCenEm.style.left = oLeft*i+'px';
                }
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
        oCenEm.style.width = 532+'px';
    }else{
        oCenter.onmousedown = function(e) {
            var event = e || event ;
            var x = event.clientX - oCenter.offsetLeft - oCenEm.offsetWidth / 2-272;
            x = ( x<0) ? 0 : x ;
            x = (x > 484) ? 484 : x ;
            oCenEm.style.left = x + 'px';
            var left = picWidth * x /484;
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
                x = (x > 484) ? 484 : x ;
                oCenEm.style.left = x + 'px';
                var left = picWidth * x /484;
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