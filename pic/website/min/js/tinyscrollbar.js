function banner(){function e(e){return document.getElementById(e)}function t(e,t){return e.currentStyle?e.currentStyle[t]:getComputedStyle(e,!1)[t]}function n(e,n){e.timer&&clearInterval(e.timer),e.timer=setInterval(function(){for(var i in n){var a=parseInt(t(e,i));a=a?a:0;var o=(n[i]-a)/5;o=o>0?Math.ceil(o):Math.floor(o),e.style[i]=a+o+"px",a==n[i]&&clearInterval(e.timer)}},50)}function i(){clearInterval(f.timer),clearInterval(g.timer)}function a(){n(f,{left:-$*v}),$<x?n(g,{left:0}):$+x<=m?n(g,{left:-($-x+1)*w}):n(g,{left:-(m-P+1)*w});for(var e=0;e<m;e++)h[e].className="",e==$&&(h[e].className="on",m>4&&(d.style.left=b*e+"px"))}var o=e("picBox"),s=e("listBox"),l=e("prev"),r=e("next"),c=e("center"),d=c.getElementsByTagName("em")[0],u=(c.offsetWidth-d.offsetWidth,o.getElementsByTagName("li")),h=s.getElementsByTagName("li"),p=u.length,m=h.length,f=o.getElementsByTagName("ul")[0],g=s.getElementsByTagName("ul")[0],v=u[0].offsetWidth,w=h[0].offsetWidth+5,b=470/(m-1);f.style.width=v*p+"px",g.style.width=(w+4)*m+"px";var $=0,P=5,x=Math.ceil(P/2),S=g.offsetWidth-o.offsetWidth;r.onclick=function(){$++,$=$==m?0:$,a()},l.onclick=function(){$--,$=$==-1?m-1:$,a()};for(var z=0;z<m;z++)h[z].index=z,h[z].onclick=function(){$=this.index,a()};var y=disY=0;if(m<5){var k=(w+4)*m;parseInt(310800/k)+4;d.style.width="518px"}else c.onmousedown=function(e){var t=e||t,n=t.clientX-c.offsetLeft-d.offsetWidth/2-270;n=n<0?0:n,n=n>470?470:n,d.style.left=n+"px";var a=S*n/470;i(),g.style.left=-a+"px"},d.onmousedown=function(e){var t=e||t;y=t.clientX-d.offsetLeft,document.onmousemove=function(e){var t=e||t,n=t.clientX-y;n=n<0?0:n,n=n>470?470:n,d.style.left=n+"px";var a=S*n/470;i(),g.style.left=-a+"px"},document.onmouseup=function(){document.onmousemove=null,document.onmouseup=null},e.preventDefault(),e.stopPropagation()}}!function(e){"function"==typeof define&&define.amd?define(["jquery"],e):"object"==typeof exports?module.exports=e(require("jquery")):e(jQuery)}(function(e){"use strict";function t(t,a){function o(){return m.update(),l(),m}function s(){b.css(z,m.thumbPosition),g.css(z,-m.contentPosition),v.css(S,m.trackSize),w.css(S,m.trackSize),b.css(S,m.thumbSize)}function l(){$&&(f[0].ontouchstart=function(e){1===e.touches.length&&(e.stopPropagation(),d(e.touches[0]))}),b.bind("mousedown",function(e){e.stopPropagation(),d(e)}),w.bind("mousedown",function(e){d(e,!0)}),e(window).resize(function(){m.update("relative")}),m.options.wheel&&window.addEventListener?t[0].addEventListener(P,u,!1):m.options.wheel&&(t[0].onmousewheel=u)}function r(){return m.contentPosition>0}function c(){return m.contentPosition<=m.contentSize-m.viewportSize-5}function d(t,i){m.hasContentToSroll&&(e("body").addClass("noSelect"),y=i?b.offset()[z]:x?t.pageX:t.pageY,$&&(document.ontouchmove=function(e){(m.options.touchLock||r()&&c())&&e.preventDefault(),e.touches[0][n+"Touch"]=1,h(e.touches[0])},document.ontouchend=p),e(document).bind("mousemove",h),e(document).bind("mouseup",p),b.bind("mouseup",p),w.bind("mouseup",p),h(t))}function u(n){if(m.hasContentToSroll){var i=n||window.event,a=-(i.deltaY||i.detail||-1/3*i.wheelDelta)/40,o=1===i.deltaMode?m.options.wheelSpeed:1;m.contentPosition-=a*o*m.options.wheelSpeed,m.contentPosition=Math.min(m.contentSize-m.viewportSize,Math.max(0,m.contentPosition)),m.thumbPosition=m.contentPosition/m.trackRatio,t.trigger("move"),b.css(z,m.thumbPosition),g.css(z,-m.contentPosition),(m.options.wheelLock||r()&&c())&&(i=e.event.fix(i),i.preventDefault())}n.stopPropagation()}function h(e){if(m.hasContentToSroll){var i=x?e.pageX:e.pageY,a=e[n+"Touch"]?y-i:i-y,o=Math.min(m.trackSize-m.thumbSize,Math.max(0,m.thumbPosition+a));m.contentPosition=o*m.trackRatio,t.trigger("move"),b.css(z,o),g.css(z,-m.contentPosition)}}function p(){m.thumbPosition=parseInt(b.css(z),10)||0,e("body").removeClass("noSelect"),e(document).unbind("mousemove",h),e(document).unbind("mouseup",p),b.unbind("mouseup",p),w.unbind("mouseup",p),document.ontouchmove=document.ontouchend=null}this.options=e.extend({},i,a),this._defaults=i,this._name=n;var m=this,f=t.find(".viewport"),g=t.find(".overview"),v=t.find(".scrollbar"),w=v.find(".track"),b=v.find(".thumb"),$="ontouchstart"in document.documentElement,P="onwheel"in document.createElement("div")?"wheel":void 0!==document.onmousewheel?"mousewheel":"DOMMouseScroll",x="x"===this.options.axis,S=x?"width":"height",z=x?"left":"top",y=0;return this.contentPosition=0,this.viewportSize=0,this.contentSize=0,this.contentRatio=0,this.trackSize=0,this.trackRatio=0,this.thumbSize=0,this.thumbPosition=0,this.hasContentToSroll=!1,this.update=function(e){var t=S.charAt(0).toUpperCase()+S.slice(1).toLowerCase();switch(this.viewportSize=f[0]["offset"+t],this.contentSize=g[0]["scroll"+t],this.contentRatio=this.viewportSize/this.contentSize,this.trackSize=this.options.trackSize||this.viewportSize,this.thumbSize=Math.min(this.trackSize,Math.max(this.options.thumbSizeMin,this.options.thumbSize||this.trackSize*this.contentRatio)),this.trackRatio=(this.contentSize-this.viewportSize)/(this.trackSize-this.thumbSize),this.hasContentToSroll=this.contentRatio<1,v.toggleClass("disable",!this.hasContentToSroll),e){case"bottom":this.contentPosition=Math.max(this.contentSize-this.viewportSize,0);break;case"relative":this.contentPosition=Math.min(Math.max(this.contentSize-this.viewportSize,0),Math.max(0,this.contentPosition));break;default:this.contentPosition=parseInt(e,10)||0}return this.thumbPosition=this.contentPosition/this.trackRatio,s(),m},o()}var n="tinyscrollbar",i={axis:"y",wheel:!0,wheelSpeed:40,wheelLock:!0,touchLock:!0,trackSize:!1,thumbSize:!1,thumbSizeMin:20};e.fn[n]=function(i){return this.each(function(){e.data(this,"plugin_"+n)||e.data(this,"plugin_"+n,new t(e(this),i))})}}),function(e){"use strict";e.movingBoxes=function(t,n){var i,a=this;a.$el=e(t).addClass("mb-slider"),a.el=t,a.$el.data("movingBoxes",a),a.init=function(){a.options=i=e.extend({},e.movingBoxes.defaultOptions,n),a.$el.wrap('<div class="movingBoxes mb-wrapper"><div class="mb-scroll" /></div>'),a.$window=a.$el.parent(),a.$wrap=a.$window.parent().prepend('<a class="mb-scrollButtons mb-left"></a>').append('<a class="mb-scrollButtons mb-right"></a><div class="mb-left-shadow"></div><div class="mb-right-shadow"></div>'),a.$panels=a.$el.children().addClass("mb-panel"),a.runTime=e(".mb-slider").index(a.$el)+1,a.regex=new RegExp("slider"+a.runTime+"=(\\d+)","i"),a.initialized=!1,a.currentlyMoving=!1,a.curPanel=i.initAnimation?1:a.getHash()||i.startPanel,a.width=i.width?parseInt(i.width,10):a.$el.width(),a.pWidth=i.panelWidth?i.panelWidth<=2?i.panelWidth*a.width:i.panelWidth:a.$panels.eq(0).width(),a.$left=a.$wrap.find(".mb-left").click(function(){return a.goBack(),!1}),a.$right=a.$wrap.find(".mb-right").click(function(){return a.goForward(),!1}),a.update({},!1),a.setWrap(a.curPanel),a.$el.delegate(".mb-panel","click",function(t){e(this).hasClass(i.currentPanel)||(t.preventDefault(),a.change(a.$panels.index(e(this))+a.adj,{},!0))}),a.$wrap.click(function(){a.$wrap.hasClass("mb-active-slider")||a.active()}),a.$panels.delegate("a","focus",function(t){t.preventDefault();var n=a.$panels.index(e(this).closest(".mb-panel"))+a.adj;n!==a.curPanel&&a.change(n,{},!0)}),e(document).keyup(function(e){if(!e.target.tagName.match("TEXTAREA|INPUT|SELECT"))switch(e.which){case 39:case 32:a.$wrap.is(".mb-active-slider")&&a.goForward();break;case 37:a.$wrap.is(".mb-active-slider")&&a.goBack()}}),e.each("preinit initialized initChange beforeAnimation completed".split(" "),function(t,n){e.isFunction(i[n])&&a.$el.bind(n+".movingBoxes",i[n])}),a.$el.trigger("preinit.movingBoxes",[a,a.curPanel])},a.update=function(t,n){a.$el.children(".cloned").remove(),a.$panels=a.$el.children(),a.adj=i.wrap&&a.$panels.length>1?0:1,a.width=i.width?parseInt(i.width,10):a.width,a.$wrap.css("width",a.width),i.wrap&&a.$panels.length>1&&(a.$el.prepend(a.$panels.filter(":last").clone().addClass("cloned")),a.$el.append(a.$panels.filter(":first").clone().addClass("cloned")),a.$el.find(".cloned").each(function(){e(this).find("a,input,textarea,select,button,area").removeAttr("name").attr("disabled","disabled"),e(this).find("[id]").andSelf().removeAttr("id")})),a.$panels=a.$el.children().addClass("mb-panel").each(function(){0===e(this).find(".mb-inside").length&&e(this).wrapInner('<div class="mb-inside" />')}),a.totalPanels=a.$panels.filter(":not(.cloned)").length,a.totalPanels<=1&&(a.curPanel=1),a.setSizes(n),a.buildNav(),a.change(a.curPanel,t,n),a.imagesLoaded(function(){a.setSizes(!1),a.setWrap(a.curPanel),a.initialized||setTimeout(function(){a.initialized=!0,a.change(a.getHash()||i.startPanel,{},!1),a.$el.trigger("initialized.movingBoxes",[a,a.curPanel])},2*i.speed)})},a.setSizes=function(t){a.padding=parseInt(a.$panels.css("padding-left"),10)+parseInt(a.$panels.css("margin-left"),10),a.curWidth=i.panelWidth?i.panelWidth<=2?i.panelWidth*a.width:i.panelWidth:a.pWidth,a.regWidth=.9*a.curWidth,a.$panels.css({width:a.curWidth,marginTop:"12"}),a.$panels.eq(a.curPanel-a.adj).addClass(i.currentPanel),a.heights=a.$panels.css("height","auto").map(function(t,n){return e(n).outerHeight(!0)}).get(),a.returnToNormal(a.curPanel,0),a.growBigger(a.curPanel,0,t),a.updateArrows(a.curPanel),a.$el.css({position:"absolute",width:(a.curWidth+2*a.padding)*a.$panels.length+(a.width-a.curWidth)/2,height:Math.max.apply(this,a.heights)+10,"padding-left":(a.width-a.curWidth)/2}),a.$window.css({height:i.fixedHeight?Math.max.apply(this,a.heights):a.heights[a.curPanel-a.adj]})},a.buildNav=function(){if(a.$nav?a.$nav.find(".mb-links").empty():a.$nav=e('<div class="mb-controls"><span class="mb-links"></span></div>').appendTo(a.$wrap),i.buildNav&&a.totalPanels>1){var t,n,o,s="";a.$panels.filter(":not(.cloned)").each(function(l){n=l+1,s='<a class="mb-link mb-panel'+n+'" href="#"></a>',o=e(s),e.isFunction(i.navFormatter)?(t=i.navFormatter(n,e(this)),"string"==typeof t?o.html():o=e("<a/>",t)):o.html(),o.appendTo(a.$nav.find(".mb-links")).addClass("mb-link mb-panel"+n).data("index",n)}),a.$nav.find("a.mb-link").bind("click",function(){return a.change(e(this).data("index")),!1})}},a.returnToNormal=function(e,t){var n=a.$panels.not(":eq("+(e-a.adj)+")").removeClass(i.currentPanel);1===i.reducedSize?n.css({width:a.regWidth}):n.stop(!0,!1).animate({width:a.regWidth,marginTop:"12"},0===t?0:i.speed)},a.growBigger=function(e,t,n){var o=a.$panels.eq(e-a.adj);1===i.reducedSize?(o.css({width:a.curWidth}),setTimeout(function(){a.completed(e,n)},0===t?0:i.speed)):o.stop(!0,!1).animate({width:a.curWidth,marginTop:"0"},0===t?0:i.speed,function(){a.completed(e,n)})},a.setWrap=function(e){if(a.totalPanels>=1){a.growBigger(e,0,!1);var t=a.$panels.eq(e-a.adj).position().left-(a.width-a.curWidth)/2+a.padding;a.$window.scrollLeft(t)}},a.completed=function(e,t){var n=a.$panels.eq(e-a.adj);n.hasClass("cloned")||n.addClass(i.currentPanel),t!==!1&&a.$el.trigger("completed.movingBoxes",[a,e])},a.goForward=function(e){a.initialized&&a.change(a.curPanel+1,e)},a.goBack=function(e){a.initialized&&a.change(a.curPanel-1,e)},a.change=function(t,n,o){if(a.totalPanels<1)return void("function"==typeof n&&n(a));var s,l,r=!1;o=o!==!1,t=e(""+t).length||t instanceof e&&e(t).length?e(t).closest(".mb-panel").index()+a.adj:parseInt(t,10),a.initialized&&o&&(a.$wrap.hasClass("mb-active-slider")||a.active(),a.$el.trigger("initChange.movingBoxes",[a,t])),i.wrap&&(t>a.totalPanels?(r=!0,t=1,a.returnToNormal(0,0),a.setWrap(0)):0===t&&(r=!1,t=a.totalPanels,a.setWrap(t+1))),t<a.adj&&(t=i.wrap?a.totalPanels:1),t>a.totalPanels-a.adj&&(t=i.wrap?1:a.totalPanels),a.curPanel===t||a.currentlyMoving&&a.initialized?a.endAnimation():(a.currentlyMoving=!i.stopAnimation,a.$curPanel=a.$panels.eq(t-a.adj),l=a.$curPanel.position().left-(a.width-a.curWidth)/2+a.padding,a.initialized&&(t>a.curPanel||r)&&(l-=a.curWidth-a.regWidth),s=i.fixedHeight?{scrollLeft:l}:{scrollLeft:l,height:a.heights[t-a.adj]},a.curPanel=t,a.initialized&&o&&a.$el.trigger("beforeAnimation.movingBoxes",[a,t]),i.delayBeforeAnimate?setTimeout(function(){a.animateBoxes(t,s,o,n)},parseInt(i.delayBeforeAnimate,10)||0):a.animateBoxes(t,s,o,n))},a.animateBoxes=function(e,t,n,o){a.$window.scrollTop(0).stop(!0,!1).animate(t,{queue:!1,duration:i.speed,easing:i.easing,complete:function(){a.initialized&&a.$window.scrollTop(0),a.currentlyMoving=!1,"function"==typeof o&&o(a)}}),a.returnToNormal(e),a.growBigger(e,i.speed,n),a.updateArrows(e),i.hashTags&&a.initialized&&a.setHash(e),a.endAnimation()},a.endAnimation=function(){i.buildNav&&a.$nav.length&&a.$nav.find("a.mb-link").removeClass(i.currentPanel).eq(a.curPanel-1).addClass(i.currentPanel)},a.updateArrows=function(e){a.$left.toggleClass(i.disabled,!i.wrap&&e===a.adj||a.totalPanels<=1),a.$right.toggleClass(i.disabled,!i.wrap&&e===a.totalPanels||a.totalPanels<=1)},a.getHash=function(){var t=window.location.hash,n=t.indexOf("&"),o=t.match(a.regex);return null!==o||/^#&/.test(t)||/#!?\//.test(t)?null!==o&&(o=i.hashTags?parseInt(o[1],10):null):(t=t.substring(0,n>=0?n:t.length),o=e(t).length&&e(t).closest(".mb-slider")[0]===a.el?e(t).closest(".mb-panel").index()+a.adj:null),o>a.totalPanels?null:o},a.setHash=function(e){var t="slider"+a.runTime+"=",n=window.location.hash;"undefined"!=typeof n&&(window.location.hash=n.indexOf(t)>0?n.replace(a.regex,t+e):n+"&"+t+e)},a.active=function(){e(".mb-active-slider").removeClass("mb-active-slider"),a.$wrap.addClass("mb-active-slider")},a.currentPanel=function(e,t){return"undefined"!=typeof e&&a.change(e,t),a.curPanel},a.imagesLoaded=function(t,n){var i,o,s=!0,l=n?e(n):a.$panels.find("img"),r=l.length;for(n=n||[],i=0;i<r;i++)"IMG"===l[i].tagName&&(o="fileSize"in l[i]&&l[i].fileSize<0&&l[i].count>10||l[i].complete,s=s&&o&&0!==l[i].height,o===!1&&(n.push(l[i]),l[i].count=(l[i].count||0)+1));s?"function"==typeof t&&t():setTimeout(function(){a.imagesLoaded(t,n)},200)},a.init()},e.movingBoxes.defaultOptions={startPanel:1,reducedSize:.8,fixedHeight:!1,initAnimation:!0,stopAnimation:!1,hashTags:!0,wrap:!1,buildNav:!1,navFormatter:null,easing:"swing",speed:500,delayBeforeAnimate:0,currentPanel:"current",tooltipClass:"tooltip",disabled:"disabled",preinit:null,initialized:null,initChange:null,beforeAnimation:null,completed:null},e.fn.movingBoxes=function(t,n,i){var a;return this.each(function(){a=e(this).data("movingBoxes"),(typeof t).match("object|undefined")?a&&t instanceof e&&t.length?a.change(t,n,i):a?a.update(n,i):new e.movingBoxes(this,t):a&&a.change(t,n,i)})},e.fn.getMovingBoxes=function(){return this.data("movingBoxes")}}(jQuery);