!function(e){"use strict";e.movingBoxes=function(n,i){var t,a=this;a.$el=e(n).addClass("mb-slider"),a.el=n,a.$el.data("movingBoxes",a),a.init=function(){a.options=t=e.extend({},e.movingBoxes.defaultOptions,i),a.$el.wrap('<div class="movingBoxes mb-wrapper"><div class="mb-scroll" /></div>'),a.$window=a.$el.parent(),a.$wrap=a.$window.parent().prepend('<a class="mb-scrollButtons mb-left"></a>').append('<a class="mb-scrollButtons mb-right"></a><div class="mb-left-shadow"></div><div class="mb-right-shadow"></div>'),a.$panels=a.$el.children().addClass("mb-panel"),a.runTime=e(".mb-slider").index(a.$el)+1,a.regex=new RegExp("slider"+a.runTime+"=(\\d+)","i"),a.initialized=!1,a.currentlyMoving=!1,a.curPanel=t.initAnimation?1:a.getHash()||t.startPanel,a.width=t.width?parseInt(t.width,10):a.$el.width(),a.pWidth=t.panelWidth?t.panelWidth<=2?t.panelWidth*a.width:t.panelWidth:a.$panels.eq(0).width(),a.$left=a.$wrap.find(".mb-left").click(function(){return a.goBack(),!1}),a.$right=a.$wrap.find(".mb-right").click(function(){return a.goForward(),!1}),a.update({},!1),a.setWrap(a.curPanel),a.$el.delegate(".mb-panel","click",function(n){e(this).hasClass(t.currentPanel)||(n.preventDefault(),a.change(a.$panels.index(e(this))+a.adj,{},!0))}),a.$wrap.click(function(){a.$wrap.hasClass("mb-active-slider")||a.active()}),a.$panels.delegate("a","focus",function(n){n.preventDefault();var i=a.$panels.index(e(this).closest(".mb-panel"))+a.adj;i!==a.curPanel&&a.change(i,{},!0)}),e(document).keyup(function(e){if(!e.target.tagName.match("TEXTAREA|INPUT|SELECT"))switch(e.which){case 39:case 32:a.$wrap.is(".mb-active-slider")&&a.goForward();break;case 37:a.$wrap.is(".mb-active-slider")&&a.goBack()}}),e.each("preinit initialized initChange beforeAnimation completed".split(" "),function(n,i){e.isFunction(t[i])&&a.$el.bind(i+".movingBoxes",t[i])}),a.$el.trigger("preinit.movingBoxes",[a,a.curPanel])},a.update=function(n,i){a.$el.children(".cloned").remove(),a.$panels=a.$el.children(),a.adj=t.wrap&&a.$panels.length>1?0:1,a.width=t.width?parseInt(t.width,10):a.width,a.$wrap.css("width",a.width),t.wrap&&a.$panels.length>1&&(a.$el.prepend(a.$panels.filter(":last").clone().addClass("cloned")),a.$el.append(a.$panels.filter(":first").clone().addClass("cloned")),a.$el.find(".cloned").each(function(){e(this).find("a,input,textarea,select,button,area").removeAttr("name").attr("disabled","disabled"),e(this).find("[id]").andSelf().removeAttr("id")})),a.$panels=a.$el.children().addClass("mb-panel").each(function(){0===e(this).find(".mb-inside").length&&e(this).wrapInner('<div class="mb-inside" />')}),a.totalPanels=a.$panels.filter(":not(.cloned)").length,a.totalPanels<=1&&(a.curPanel=1),a.setSizes(i),a.buildNav(),a.change(a.curPanel,n,i),a.imagesLoaded(function(){a.setSizes(!1),a.setWrap(a.curPanel),a.initialized||setTimeout(function(){a.initialized=!0,a.change(a.getHash()||t.startPanel,{},!1),a.$el.trigger("initialized.movingBoxes",[a,a.curPanel])},2*t.speed)})},a.setSizes=function(n){a.padding=parseInt(a.$panels.css("padding-left"),10)+parseInt(a.$panels.css("margin-left"),10),a.curWidth=t.panelWidth?t.panelWidth<=2?t.panelWidth*a.width:t.panelWidth:a.pWidth,a.regWidth=a.curWidth*t.reducedSize,a.$panels.css({width:a.curWidth,marginTop:"50"}),a.$panels.eq(a.curPanel-a.adj).addClass(t.currentPanel),a.heights=a.$panels.css("height","auto").map(function(n,i){return e(i).outerHeight(!0)}).get(),a.returnToNormal(a.curPanel,0),a.growBigger(a.curPanel,0,n),a.updateArrows(a.curPanel),a.$el.css({position:"absolute",width:(a.curWidth+2*a.padding)*a.$panels.length+(a.width-a.curWidth)/2,height:Math.max.apply(this,a.heights)+10,"padding-left":(a.width-a.curWidth)/2}),a.$window.css({height:t.fixedHeight?Math.max.apply(this,a.heights):a.heights[a.curPanel-a.adj]})},a.buildNav=function(){if(a.$nav?a.$nav.find(".mb-links").empty():a.$nav=e('<div class="mb-controls"><span class="mb-links"></span></div>').appendTo(a.$wrap),t.buildNav&&a.totalPanels>1){var n,i,l,s="";a.$panels.filter(":not(.cloned)").each(function(d){i=d+1,s='<a class="mb-link mb-panel'+i+'" href="#"></a>',l=e(s),e.isFunction(t.navFormatter)?(n=t.navFormatter(i,e(this)),"string"==typeof n?l.html(n):l=e("<a/>",n)):l.html(i),l.appendTo(a.$nav.find(".mb-links")).addClass("mb-link mb-panel"+i).data("index",i)}),a.$nav.find("a.mb-link").bind("click",function(){return a.change(e(this).data("index")),!1})}},a.returnToNormal=function(e,n){var i=a.$panels.not(":eq("+(e-a.adj)+")").removeClass(t.currentPanel);1===t.reducedSize?i.css({width:a.regWidth}):i.stop(!0,!1).animate({width:a.regWidth,marginTop:"12"},0===n?0:t.speed)},a.growBigger=function(e,n,i){var l=a.$panels.eq(e-a.adj);1===t.reducedSize?(l.css({width:a.curWidth}),setTimeout(function(){a.completed(e,i)},0===n?0:t.speed)):l.stop(!0,!1).animate({width:a.curWidth,marginTop:"0"},0===n?0:t.speed,function(){a.completed(e,i)})},a.setWrap=function(e){if(a.totalPanels>=1){a.growBigger(e,0,!1);var n=a.$panels.eq(e-a.adj).position().left-(a.width-a.curWidth)/2+a.padding;a.$window.scrollLeft(n)}},a.completed=function(e,n){var i=a.$panels.eq(e-a.adj);i.hasClass("cloned")||i.addClass(t.currentPanel),n!==!1&&a.$el.trigger("completed.movingBoxes",[a,e])},a.goForward=function(e){a.initialized&&a.change(a.curPanel+1,e)},a.goBack=function(e){a.initialized&&a.change(a.curPanel-1,e)},a.change=function(n,i,l){if(a.totalPanels<1)return void("function"==typeof i&&i(a));var s,d,r=!1;l=l!==!1,n=e(""+n).length||n instanceof e&&e(n).length?e(n).closest(".mb-panel").index()+a.adj:parseInt(n,10),a.initialized&&l&&(a.$wrap.hasClass("mb-active-slider")||a.active(),a.$el.trigger("initChange.movingBoxes",[a,n])),t.wrap&&(n>a.totalPanels?(r=!0,n=1,a.returnToNormal(0,0),a.setWrap(0)):0===n&&(r=!1,n=a.totalPanels,a.setWrap(n+1))),n<a.adj&&(n=t.wrap?a.totalPanels:1),n>a.totalPanels-a.adj&&(n=t.wrap?1:a.totalPanels),a.curPanel===n||a.currentlyMoving&&a.initialized?a.endAnimation():(a.currentlyMoving=!t.stopAnimation,a.$curPanel=a.$panels.eq(n-a.adj),d=a.$curPanel.position().left-(a.width-a.curWidth)/2+a.padding,a.initialized&&(n>a.curPanel||r)&&(d-=a.curWidth-a.regWidth),s=t.fixedHeight?{scrollLeft:d}:{scrollLeft:d,height:a.heights[n-a.adj]},a.curPanel=n,a.initialized&&l&&a.$el.trigger("beforeAnimation.movingBoxes",[a,n]),t.delayBeforeAnimate?setTimeout(function(){a.animateBoxes(n,s,l,i)},parseInt(t.delayBeforeAnimate,10)||0):a.animateBoxes(n,s,l,i))},a.animateBoxes=function(e,n,i,l){a.$window.scrollTop(0).stop(!0,!1).animate(n,{queue:!1,duration:t.speed,easing:t.easing,complete:function(){a.initialized&&a.$window.scrollTop(0),a.currentlyMoving=!1,"function"==typeof l&&l(a)}}),a.returnToNormal(e),a.growBigger(e,t.speed,i),a.updateArrows(e),t.hashTags&&a.initialized&&a.setHash(e),a.endAnimation()},a.endAnimation=function(){t.buildNav&&a.$nav.length&&a.$nav.find("a.mb-link").removeClass(t.currentPanel).eq(a.curPanel-1).addClass(t.currentPanel)},a.updateArrows=function(e){a.$left.toggleClass(t.disabled,!t.wrap&&e===a.adj||a.totalPanels<=1),a.$right.toggleClass(t.disabled,!t.wrap&&e===a.totalPanels||a.totalPanels<=1)},a.getHash=function(){var n=window.location.hash,i=n.indexOf("&"),l=n.match(a.regex);return null!==l||/^#&/.test(n)||/#!?\//.test(n)?null!==l&&(l=t.hashTags?parseInt(l[1],10):null):(n=n.substring(0,i>=0?i:n.length),l=e(n).length&&e(n).closest(".mb-slider")[0]===a.el?e(n).closest(".mb-panel").index()+a.adj:null),l>a.totalPanels?null:l},a.setHash=function(e){var n="slider"+a.runTime+"=",i=window.location.hash;"undefined"!=typeof i&&(window.location.hash=i.indexOf(n)>0?i.replace(a.regex,n+e):i+"&"+n+e)},a.active=function(){e(".mb-active-slider").removeClass("mb-active-slider"),a.$wrap.addClass("mb-active-slider")},a.currentPanel=function(e,n){return"undefined"!=typeof e&&a.change(e,n),a.curPanel},a.imagesLoaded=function(n,i){var t,l,s=!0,d=i?e(i):a.$panels.find("img"),r=d.length;for(i=i||[],t=0;t<r;t++)"IMG"===d[t].tagName&&(l="fileSize"in d[t]&&d[t].fileSize<0&&d[t].count>10||d[t].complete,s=s&&l&&0!==d[t].height,l===!1&&(i.push(d[t]),d[t].count=(d[t].count||0)+1));s?"function"==typeof n&&n():setTimeout(function(){a.imagesLoaded(n,i)},200)},a.init()},e.movingBoxes.defaultOptions={startPanel:1,reducedSize:.8,fixedHeight:!1,initAnimation:!0,stopAnimation:!1,hashTags:!0,wrap:!1,buildNav:!1,navFormatter:null,easing:"swing",speed:500,delayBeforeAnimate:0,currentPanel:"current",tooltipClass:"tooltip",disabled:"disabled",preinit:null,initialized:null,initChange:null,beforeAnimation:null,completed:null},e.fn.movingBoxes=function(n,i,t){var a;return this.each(function(){a=e(this).data("movingBoxes"),(typeof n).match("object|undefined")?a&&n instanceof e&&n.length?a.change(n,i,t):a?a.update(i,t):new e.movingBoxes(this,n):a&&a.change(n,i,t)})},e.fn.getMovingBoxes=function(){return this.data("movingBoxes")}}(jQuery);