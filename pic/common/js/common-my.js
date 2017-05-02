/**
 * 常用 JS 封装
 * Kira
 */
var Kira = {
    // 禁止右键
    disbRigtMenu: function() {
        document.oncontextmenu = function() {
            return false;
        };
    },
    // 解析URL
    parseUrl: function() {
        var args = {},
            match = null;
        var search = decodeURIComponent(location.search.substring(1));
        var reg = /(?:([^&]+)=([^&]+))/g;
        while ((match = reg.exec(search)) !== null) {
            args[match[1]] = match[2];
        }
        return args;
    },
    // 获取浏览器信息
    getBrowser: function() {
        var agent = navigator.userAgent.toLowerCase(),
            opera = window.opera,
            browser = {
                ie: /(msie\s|trident.*rv:)([\w.]+)/.test(agent),
                opera: (!!opera && opera.version),
                webkit: (agent.indexOf(' applewebkit/') > -1),
                mac: (agent.indexOf('macintosh') > -1)
            };
        return browser;
    },
    // 设置滚动
    setScrollTo: function(container, scrollTo) {
        container.scrollTop(
            scrollTo.offset().top - container.offset().top + container.scrollTop()
        );
        container.animate({
            scrollTop: scrollTo.offset().top - container.offset().top + container.scrollTop()
        });
    },

    /**
     * 时间/日期
     */
    // 当前时间戳
    getTimeStr: function() {
        return Math.round(new Date().getTime() / 1000).toString();
    },
    // 当前时间戳(毫秒)
    getLongTimeStr: function() {
        return (new Date().getTime()).toString();
    },
    // 将日期时间戳化
    formatTime: function(str) {
        return Math.round(Date.parse(str) / 1000).toString();
    },
    // 将UTC时间转换为时间戳格式
    formatUtcTime: function(timeStr) {
        var utcReg = /^\d+$/;
        if (utcReg.test(timeStr)) {
            return timeStr;
        } else {
            var dateObj = new Date(Date.parse(timeStr));
            return Math.round(dateObj.getTime() / 1000).toString();
        }
    },
    // 格式化日期
    dateFormat: function(type, timeStamp) {
        if (typeof(type) == 'undefined') {
            var type = 'Y-m-d H:i:s';
        }
        var utcSReg = /^\d{10}$/,
            utcMReg = /^\d{13}$/;
        if (utcSReg.test(timeStamp)) {
            var dateStr = new Date(parseInt(timeStamp * 1000));
        } else if (utcMReg.test(timeStamp)) {
            var dateStr = new Date(parseInt(timeStamp));
        } else {
            var dateStr = new Date();
        }
        var dateItem = {
            'Y': dateStr.getFullYear(),
            'm': dateStr.getMonth() + 1,
            'd': dateStr.getDate(),
            'H': dateStr.getHours(),
            'i': dateStr.getMinutes(),
            's': dateStr.getSeconds()
        };
        var date = type.replace(/(\w)/g, function(c) {
            dateItem[c] < 10 && (dateItem[c] = '0' + dateItem[c]);
            return dateItem[c];
        });
        return date;
    },

    /**
     * 常用正则
     */
    isEmail: function(str) {
        var regStr = /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/;
        return regStr.test(str);
    },
    isNumber: function(str) {
        var regStr = /^\d+$/g;
        return regStr.test(str);
    },
    isUrl: function(str) {
        var regStr = /^[a-zA-z]+:\/\/(\w+(-\w+)*)(\.(\w+(-\w+)*))*(\?\S*)?$/;
        return regStr.test(str);
    },


    /**
     * 字符串操作
     */
    trim: function(str, reStr) {
        if (typeof(reStr) != 'undefined' && reStr) {
            return str.replace(eval('/(^' + reStr + '*)|(' + reStr + '*$)/g'), '');
        } else {
            return str.replace(/(^\s*)|(\s*$)/g, '');
        }
    },
    ltrim: function(str, reStr) {
        if (typeof(reStr) != 'undefined' && reStr) {
            return str.replace(eval('/(^' + reStr + '*)/g'), '');
        } else {
            return str.replace(/(^\s*)/g, '');
        }
    },
    rtrim: function(str, reStr) {
        if (typeof(reStr) != 'undefined' && reStr) {
            return str.replace(eval('/(' + reStr + '*$)/g'), '');
        } else {
            return str.replace(/(\s*$)/g, '');
        }
    },

    // JS转义
    addslashes: function(str) {
        return (str + '').replace(/[\\"\(\)\$\*']/g, '\\$&').replace(/\u0000/g, '\\0');
    },
    // 去除HTML标签
    removeHTMLTag: function(str) {
        str = str.replace(/<\/?[^>]*>/g, '');
        str = str.replace(/[ | ]*\n/g, '\n');
        str = str.replace(/&nbsp;/ig, '');
        return str;
    },
    // 格式化名称, 防止HTML错乱
    encodeHtml: function(str) {
        return str.replace(/[<>&"]/g, function(c) {
            return {
                '<': '&lt;',
                '>': '&gt;',
                '&': '&amp;',
                '"': '&quot;'
            }[c];
        });
    },

    /**
     * 数组操作
     **/
    //删除
    arrayPull: function(arr, item) {
        for (var i = 0; i < arr.length; i++) {
            var temp = arr[i];
            if (temp == item) {
                for (var j = i; j < arr.length; j++) {
                    arr[j] = arr[j + 1];
                }
                arr.length = arr.length - 1;
            }
        }
        return arr;
    },
    //查找
    arrayFind: function(arr, item) {
        var ret = arr.join().search(eval('/' + item + '/g'));
        return (ret == -1) ? false : true;
    },
    //去重
    arrayUniq: function(arr) {
        var ret = [];
        for (var i = 0; i < arr.length; i++) {
            if (ret.join().search(eval('/' + arr[i] + '/')) == -1) {
                ret.push(arr[i]);
            }
        }
        return ret;
    },
    /**
     * 按字段排序
     * dataObj : [{sortKey:sortValue},{sortKey:sortValue}]
     * dataObj.sort(keySort(sortKey));
     **/
    keySort: function(sortKey) {
        return function(objectOne, objectTwo) {
            var valueOne = objectOne[sortKey],
                valueTwo = objectTwo[sortKey];
            if (valueOne < valueTwo) {
                return -1;
            } else if (valueOne > valueTwo) {
                return 1;
            } else {
                return 0;
            }
        };
    },
    /*** end ***/
};

var pubApi = {
    "ajax": function(ajaxUrl, paramObj, succFunc, errorFunc) {
        console.log("Ajax Begin", paramObj);
        $.ajax({
            type: "get",
            async: false,
            url: ajaxUrl,
            data: paramObj,
            dataType: "json",
            success: function(retObj) {
                console.log("Ajax Result", retObj);
                if (retObj.errNum == "0") {
                    succFunc(retObj);
                } else {
                    errorFunc(retObj);
                }
            }
        });
    },
    "ajaxPost": function(ajaxUrl, paramObj, succFunc, errorFunc) {
        console.log("Ajax Begin", paramObj);
        $.ajax({
            type: "post",
            async: true,
            url: ajaxUrl,
            data: paramObj,
            dataType: "json",
            success: function(retObj) {
                console.log("Ajax Result", retObj);
                if (retObj.code == "0") {
                    succFunc(retObj);
                } else {
                    errorFunc(retObj);
                }
            }
        });
    },
    "showDomError": function(htmlDom, errorStr) {
        htmlDom.html(errorStr).removeClass("hide");
        setTimeout(function() {
            htmlDom.addClass("hide");
        }, 3000);
    },
    "showError": function(errorStr) {
        $(".errorBox").html(errorStr).removeClass("hide");
        setTimeout(function() {
            $(".errorBox").addClass("hide");
        }, 3000);
    },
    "showMsg": function(msgStr) {
        $(".msgBox").html(msgStr).removeClass("hide");
        setTimeout(function() {
            $(".msgBox").addClass("hide");
        }, 3000);
    },
    "jumpUrl": function(url) {
        if (/^http/i.test(url)) {
            location.href = url;
        } else {
            location.href = 'http://' + window.location.host + '/' + url;
        }
    },
    "urlReg": /^((http(s)?|ftp|telnet|news|rtsp|mms):\/\/)?(((\w(\-*\w)*\.)+[a-zA-Z]{2,4})|(((1\d\d|2([0-4]\d|5[0-5])|[1-9]\d|\d).){3}(1\d\d|2([0-4]\d|5[0-5])|[1-9]\d|\d).?))(:\d{0,5})?(\/+.*)*$/,
    "reload": function() {
        location.reload();
    },
    formatUtcTime: function(timeStr) {
        //格式化成时间戳
        var utcReg = /^\d+$/;
        if (utcReg.test(timeStr)) {
            return timeStr;
        } else {
            var dateObj = new Date(Date.parse(timeStr));
            return Math.round(dateObj.getTime() / 1000).toString();
        }
    },
    SetCookie: function(name, value) {
        //写COOKIE
        var Days = 2 * 7;
        var exp = new Date();
        exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
        document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString();
    },
    parseUrl: function() {
        //解析URL
        var args = {},
            match = null;
        var search = decodeURIComponent(location.search.substring(1));
        var reg = /(?:([^&]+)=([^&]+))/g;
        while ((match = reg.exec(search)) !== null) {
            args[match[1]] = match[2];
        }
        return args;
    },
    formatChart: function(titie, data, type) {
        if (typeof(type) == "undefined") {
            var type = "line";
        }
        var result = {
            name: titie,
            type: type,
            data: data,
            markPoint: {
                data: [{
                    type: 'max',
                    name: '最大值'
                }, {
                    type: 'min',
                    name: '最小值'
                }]
            },
            markLine: {
                data: [{
                    type: 'average',
                    name: '平均值'
                }]
            }
        };
        return result;
    }
};


var E = {
    /**
     * 折线图
     */
    lineParam: {
        'chartTitle': 'Demo',
        'chartUnit': '天',
        'chartType': 'line',
        'legend': ['One', 'Two', 'Three'],
        'xData': ['2016-04-03', '2016-04-04', '2016-04-05'],
        'data': [
            [88, 99, 236],
            [675, 38, 223],
            [324, 13, 164],
        ]
    },
    /**
     * 饼状图
     */
    pieParam: {
        'chartTitle': 'Demo',
        'chartUnit': '天',
        'chartType': 'line',
        'legend': ['One', 'Two', 'Three'],
        'xData': ['2016-04-03', '2016-04-04', '2016-04-05'],
        'data': [
            [88, 99, 236],
            [675, 38, 223],
            [324, 13, 164],
        ]
    },
    chartType: {
        'line': {
            'name': '折线图',
            'value': 'line',
        },
        'bar': {
            'name': '柱状图',
            'value': 'bar',
        }
    },
    // 画折线图
    drawLine: function(areaId, param) {
        if (typeof(param) == 'undefined') {
            var param = this.lineParam;
        }
        var chartTitle = param.chartTitle,
            chartUnit = param.chartUnit,
            chartType = param.chartType,
            legend = param.legend,
            xData = param.xData,
            data = param.data;
        if (typeof(chartType) == 'undefined') {
            var chartType = this.chartType.line.value;
        }
        var option = {
            title: {
                text: chartTitle
            },
            tooltip: {
                trigger: 'axis'
            },
            legend: {
                data: legend
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            toolbox: {
                show: true,
                feature: {
                    dataView: {
                        readOnly: false
                    },
                    magicType: {
                        type: ['line', 'bar']
                    },
                    saveAsImage: {}
                }
            },
            xAxis: {
                type: 'category',
                boundaryGap: false,
                data: xData
            },
            yAxis: {
                type: 'value',
                axisLabel: {
                    formatter: '{value} ' + chartUnit
                },
            },
            series: []
        };
        legend.forEach(function(item, key) {
            option.series.push({
                name: item,
                type: chartType,
                // stack: '总量',
                // 控制总量堆叠
                // areaStyle: {normal: {}},    
                // 控制区域是否覆盖颜色
                data: data[key],

                markPoint: {
                    data: [{
                        type: 'max',
                        name: '最大值'
                    }, {
                        type: 'min',
                        name: '最小值'
                    }]
                },
                markLine: {
                    data: [{
                        type: 'average',
                        name: '平均值'
                    }]
                }
            });
        });
        console.log(option);
        echarts.init(document.getElementById(areaId)).setOption(option);
    },
    // 画饼状图
    drawPie: function(areaId, param) {
        if (typeof(param) == 'undefined') {
            var param = this.pieParam;
        }
        var chartTitle = param.chartTitle,
            legend = param.legend,
            data = param.data;
        var option = {
            title: {
                text: chartTitle,
                subtext: '',
                x: 'center'
            },
            tooltip: {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            legend: {
                orient: 'vertical',
                left: 'left',
                data: legend
            },
            series: [{
                name: '访问来源',
                type: 'pie',
                radius: '55%',
                center: ['50%', '60%'],
                data: data,
                itemStyle: {
                    emphasis: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                },
            }]
        };
        echarts.init(document.getElementById(areaId)).setOption(option);
    }
};

var randomArr = {
    "getRandom": function(opt) { //从数组中获取随机元素的方法
        var old_arry = opt.arry,
            range = opt.range;
        //防止超过数组的长度
        range = range > old_arry.length ? old_arry.length : range;
        var newArray = [].concat(old_arry), //拷贝原数组进行操作就不会破坏原数组
            valArray = [];
        for (var n = 0; n < range; n++) {
            var r = Math.floor(Math.random() * (newArray.length));
            valArray.push(newArray[r]);
            //在原数组删掉，然后在下轮循环中就可以避免重复获取
            newArray.splice(r, 1);
        }
        return valArray;
    },
    "createHtml": function(state, title, msg, className, url) { //领取礼包的弹窗提示body=》createHtml(0,'失败','领取失败','erro'); //失败调用数据 createHtml(1,'领取成功','1246633','', url);  //领取成功
        var createHtml = '<div class="mask_layer success_get gift_get show">\
                    <div class="popup_window">\
                    <div class="in_popup">\
                    <p class="title pr"><i  class="' + className + ' pa" ></i><span class="f20">' + title + '</span></p>';
        if (state == 0) {
            createHtml += '<p>' + msg + '</p>'
        } else {
            createHtml += '<p class="">\
                    <span  class="clearfix">\
                    <b class="fl">礼包CDKEY：</b><i class="fl">' + msg + '</i>\
                    </span>\
                    </p>\
                    <p class="clearfix"><span class="fl">礼包记录，可至“</span><a href="' + url + '" class="fl">礼包中心</a><span class="fl">"-"</span><a href="' + url + '" class="fl">我的礼包</a><span class="fl">"查看</span></p>';

        }
        createHtml += '</div>\
                        <div class="popup_btn">\
                            <ul class="clearfix">\
                                <li class="fl sure" id="sureBtn">确定</li>\
                            </ul>\
                        </div>\
                    </div>\
                </div>';
        $('body').append(createHtml);
    },
    "areaHtml": function(ary, area) { //获取礼包的区块的Html
        var html = '';
        if (area == 'gift') {
            for (var k in ary) {
                console.log(ary[k]);
                html += '<li>';
                html += '<a href="javascript:;" class="clearfix">';
                html += '<div class="img_con fl start-web-game" game-id="' + ary[k]['appid'] + '" server-id=-1 game-name="' + ary[k]['name'] + '">';
                html += '<img src="' + static_image(ary[k]['image']['icon'], 226) + '">';
                html += '</div>';
                html += '<div class="gift_text fl">';
                html += '<p class="name">' + ary[k]['name'] + '</p>';
                html += '<p class="residue_gift"><span>仅剩</span>';
                html += '<span class="yellow_color">' + ary[k]['hasNum'] + '</span>';
                html += '<span>个礼包</span></p>';
                html += '</div><div class="get_gift_btn tac fr" data-appId="' + ary[k]['appid'] + '" data-gid="' + ary[k]['gid'] + '" data-gameName="' + ary[k]['name'] + '" data-serverId="0">领取</div></a></li>';
            }
        } else if (area == 'active') {
            for (var k in ary) {
                html += '<li class="fl start-web-game" game-id="' + ary[k]['id'] + '" server-id=-1 game-name="' + ary[k]['name'] + '">';
                html += '<a href="javascript:;" class="pr clearfix">';
                html += '<div class="fl img_con">';
                html += '<img src="' + static_image(ary[k]['image']['icon'], 226) + '">';
                html += '</div>';
                html += '<div class="fl text_con">';
                html += '<p class="title f14">' + ary[k]['name'] + '</p>';
                html += '<p class="play_num">' + ary[k]['play'] + '人在玩<p></div>';
                html += '<div class="go_btn pa"><p class="start_game cur start-web-game-server" game-id="' + ary[k]['id'] + '" server-id=-1 game-name="' + ary[k]['name'] + '">开始游戏</p><p class="go_detail show-webgame-detail" game-name="' + ary[k]['name'] + '" appid="' + ary[k]['id'] + '">进入专区</p></div>';
                html += '</a></li>';
            }
        }
        return html;
    }
};