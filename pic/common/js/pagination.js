(function($) {
    var pagination = {};

    pagination.config = {
        type: "page", //type=page，普通翻页加载，scroll为滚动加载
        url: "", //ajaxType=ajax时为请求地址
        ajaxType: "post", //ajaxType=>post,get
        pageSize: 1, //默认一页显示数量
        page: 1, //默认从第几页开始
        first_get_num: 6,
        get_num: 6,
        ajaxData: {}, //其他需要专递参数
        jsonpCallback: "", //指定jsonpcallback函数
        allowAlert: true, //是否运行弹出错误信息
        pageHtmlContainer: "#page", //生成的分页html后存放的容器
        ajaxDataType: "json", //json：返回为json对象，根据模板进行替换，html:直接append到容器中
        contentHtmlTmp: "", //dataDataType为json或者jsonp时,对对象进行替换的模板
        beforeHtml: "", //自动构建页面前所需的html内容，默认为””
        afterHtml: "", //自动构建页面后所需的html内容，默认为””
        ifEmptyHtml: "", //如果数据会空时填入容器的html
        contentHtmlContainer: "#page-content", //生成html后存放的容器
        autoCreateHtml: true,
        getPageDataSuccess: "", //ajax获取数据成功后执行函数,默认执行在contentHtmlContainer替换生成的html
        handleData: "", //获取处理数据
        debug: false,
        //scroll相关的参数
        scrollContainer: window,
        scorllContent: document,
        offsetTop: 0,
        loadingTime: 200,
        showSpeed: "",
        addLoading: function() {
            console.log(pagination.config);
            $(pagination.config.contentHtmlContainer).parent().parent().append('<div class="pageLoadding" style="width:100%;text-align:center;display:none;clear:both"><img src="http://pic.vronline.com/website/images/loading.gif?v=1" style="width:32px;height:32px;"></div>' +
                '<div class="pageEnd" style="width:100%;border-top:1px solid #313a4a;display:none;text-align:center;clear:both;line-height:35px;color:#23a0bf">我们是有底线的</div>');
        },
        loadingObj: "",
        endObj: ""
    }

    pagination.init = function(config) {
        this.lock = {};
        var _this = this;
        //获取配置参数
        _this.config = $.extend({}, _this.config, config);

        _this.url = _this.config.url;
        _this.ajaxData = _this.config.ajaxData;
        _this.noMorePage = false;
        _this.loading = 0;
        _this.stop = 0;
        //发起获取数据次数
        _this.getDateTimes = 0;
        //得到数据的批次
        _this.checkGetDaateTimes = 0;

        _this.getMorePageSet = []; //滚动获取更多页面时次数的集合
        _this.timeOutSet = [];
        if (!_this.hasLoading) {
            _this.addLoading();
        }
        //获取设置初始页数据
        _this.switchPage(_this.config.page);

        //用delegate绑定,监听后续加入的元素
        if (_this.config.type == "page") {
            $(_this.config.pageHtmlContainer).undelegate('.switchPage:not(".cur")', 'click').delegate('.switchPage:not(".cur")', 'click', function(event) {
                var page = $(this).attr('page');
                _this.switchPage(page);
            });
        }

        if (_this.config.type == "scroll") {
            $(_this.config.scrollContainer).scroll(function() {
                _this.scrollLoadPage();
            });
        }

    };

    pagination.addLoading = function() {
        if (typeof this.config.addLoading == "function") {
            this.config.addLoading();
        }
        this.loadingObj = this.config.loadingObj ? this.config.loadingObj : $(".pageLoadding");
        this.endObj = this.config.endObj ? this.config.endObj : $(".pageEnd");
        this.hasLoading = 1;
    };

    /**
     * 滚动加载分页
     */
    pagination.scrollLoadPage = function() {
        var _this = window.pagination;

        if (_this.loading == 0) {
            var scrollTop = $(_this.config.scrollContainer).scrollTop();
            var scrollContentHeight = $(_this.config.scorllContent).height();
            var scrollContainerHeight = $(_this.config.scrollContainer).height();
            //console.log(scrollTop, scrollContainerHeight, scrollContentHeight, offsetTop);
            if (scrollTop + scrollContainerHeight - _this.config.offsetTop >= scrollContentHeight) {
                _this.switchPage(_this.page + 1);
            }
        } else {
            var timeout = setTimeout(_this.scrollLoadPage, 200);
            _this.timeOutSet.push(timeout);
        }
    };

    /**
     * 重新加载内容
     */
    pagination.reload = function(config) {
        var _this = this;
        var canReload = 0;
        $.each(config.ajaxData, function(i, e) {
            if (!_this.config.ajaxData[i] || _this.config.ajaxData[i] != e) {
                canReload = 1;
            }
        });
        if (!canReload) {
            return false;
        }
        _this.config = $.extend({}, _this.config, config);
        _this.url = _this.config.url;
        _this.ajaxData = _this.config.ajaxData;
        _this.reloadPage();
    };

    pagination.reloadPage = function() {
        var _this = window.pagination;
        $.each(_this.timeOutSet, function(i, e) {
            clearTimeout(e);
        });
        _this.stop = 1;
        if (_this.loading == 0) {
            _this.stop = 0;
            _this.isReload = 1;
            _this.endObj.hide();
            _this.noMorePage = false;
            _this.switchPage(1);
        } else {
            var timeout = setTimeout(_this.reloadPage, 200);
            _this.timeOutSet.push(timeout);
        }
    };

    //错误提示,后续拓展
    pagination.errorRetrun = function(errorinfo) {
        var _this = this;
        if (_this.config.allowAlert === true) {
            alert(errorinfo);
        }
        if (_this.config.debug == true) {
            //console.log(errorinfo);
        }
        return false;
    };

    //切换页面
    pagination.switchPage = function(page) {
        var _this = this;
        if (_this.noMorePage) {
            return false;
        }
        page = parseInt(page);
        _this.page = page;

        if (page < 1)
            return errorRetrun("页数不能小于1");

        _this.getPageData(page);
    };

    //构造分页的html
    pagination.createSwitchPageHtml = function(page, count) {

        var _this = this;
        var pageSize = _this.config.pageSize;

        if (count === 0) {
            return "";
        }

        var pageHtml = '<div class="paging_con tac"><div class="clearfix in_paging_con">';

        var pageNums = Math.ceil(count / pageSize);
        if (pageNums <= 1)
            return "";

        var lastPage = page - 1;
        var nextPage = page + 1;

        if (page > 1) {
            pageHtml += "<span page='1' class='fl switchPage'>首页</span> <span class='fl switchPage' page=" + lastPage + ">上一页</span> ";
        }

        pageHtml += "<ul class='clearfix fl' > ";

        var i = 0;
        for (i = page - 2; i <= page + 2 && i <= pageNums; i++) {
            if (i > 0) {
                if (i == page) {
                    pageHtml += "<li class='fl cur switchPage'>" + i + "</li> ";
                } else {
                    pageHtml += "<li page=" + i + " class='fl switchPage'>" + i + "</li> ";
                }
            }
        }

        if (pageNums > page + 10) {
            pageHtml += "<li class='fl'>...</li>";
            var pageNextMore = page + 10;
            pageHtml += "<li class='fl switchPage' href='javascript:;' page=" + pageNextMore + "'>" + pageNextMore + "</li>";
        }

        pageHtml += "</ul>";

        if (page < pageNums) {
            pageHtml += " <span page=" + nextPage + " class='fl switchPage'>下一页</span> <span page=" + pageNums + " class='fl switchPage'>尾页</span>";
        }

        pageHtml += "</div></div>";

        return pageHtml;

    };

    //ajax成功获取数据后执行
    pagination.getPageDataSuccess = function(page, data) {
        var _this = this;

        if (data.code !== 0) {
            return _this.errorRetrun(data.msg);
        }

        if (_this.config.type == "page") {
            if (data.data.count === undefined) {
                return _this.errorRetrun("缺少记录总数count");
            }

            var count = data.data.count;
        }

        //如果当前分页没有数据,则获取上一页的数据
        if (_this.config.type == "page" && data.data.data === false && page !== 1) {
            _this.switchPage(page - 1);
            return false;
        }
        if (_this.config.type == "scroll" && data.data.data === false) {
            if (_this.noMorePage) {
                return false
            }
            _this.noMorePage = true;
            _this.endObj.show();
            $(_this.config.contentHtmlContainer).append(_this.config.ifEmptyHtml);
            return false;
        }

        if (_this.config.type == "page") {
            //获取数据后调用构造分页html
            var pageHtml = _this.createSwitchPageHtml(page, count);

            $(_this.config.pageHtmlContainer).html(pageHtml);
        }

        if (_this.config.autoCreateHtml === true) {
            //根据获取数据调用构造分页内容html
            _this.createContentHtml(data.data);
        }

        if (_this.config.type == "scroll" && data.data.data.length < _this.ajaxData.num) {
            _this.noMorePage = true;
            _this.endObj.show();
            $(_this.config.contentHtmlContainer).append(_this.config.ifEmptyHtml);
            return false;
        }

        if (_this.config.type == "scroll") {
            _this.scrollLoadPage()
        }
        if (typeof _this.config.getPageDataSuccess === "function") {
            _this.config.getPageDataSuccess(data);
        }
    };

    pagination.createContentHtml = function(data) {
        var _this = this;
        if (data.count == 0) {

            $(_this.config.contentHtmlContainer).html(_this.config.ifEmptyHtml);

        } else {

            var contentHtml = _this.config.beforeHtml;

            var contentHtmlTmp = _this.config.contentHtmlTmp;
            var i = 0;
            var arr = data.data;
            for (i in arr) {

                var e = arr[i];

                if (typeof _this.config.handleData === "function") {
                    e = _this.config.handleData(e);
                }

                contentHtml += _this.tmpReplace(contentHtmlTmp, e);

            }
            contentHtml += _this.config.afterHtml;

            if (_this.config.type == "page") {
                //获取数据后调用构造分页html
                $(_this.config.contentHtmlContainer).html(contentHtml);
            } else if (_this.config.type == "scroll") {
                $(_this.config.contentHtmlContainer).append(contentHtml);
            }

        }
    };

    //ajax获取分页数据
    pagination.getPageData = function(page) {
        var _this = this;

        _this.loading = 1;

        //记录第几次发起请求
        _this.getDateTimes++;

        if (_this.isReload && _this.isReload == 1) {
            _this.getMorePageSet = [];
            $(_this.config.contentHtmlContainer).html("");
            _this.isReload = 0;
        } else {
            _this.getMorePageSet.push(_this.getDateTimes);
        }

        var data = _this.ajaxData;

        var contentHtmlContainer = _this.config.contentHtmlContainer;

        data.page = page;
        if (_this.config.type == "scroll") {
            if (page == 1) {
                data.start = 0
                data.num = _this.config.first_get_num;
            } else {
                data.num = _this.config.get_num;
                data.start = _this.config.first_get_num + (page - 2) * data.num;
            }

        }

        var dataType = _this.config.ajaxDataType;
        if (_this.config.showSpeed) {
            _this.loadingObj.show(_this.config.showSpeed);
        } else {
            _this.loadingObj.show();
        }
        //console.log(_this.getDateTimes, data);
        setTimeout(function() {
            var option = {
                url: _this.url,
                type: _this.config.ajaxType,
                dataType: dataType,
                data: data,
                success: function(data) {
                    _this.checkGetDaateTimes++;
                    if (_this.stop) {
                        _this.loading = 0;
                        return false;
                    }
                    if (_this.getDateTimes != _this.checkGetDaateTimes) {
                        if ($.inArray(_this.getDateTimes, _this.getMorePageSet) < 0) {
                            //console.log(_this.getDateTimes, _this.checkGetDaateTimes, "noDo");
                            _this.loading = 0;
                            return false;
                        }
                    }
                    //console.log(_this.getDateTimes, _this.checkGetDaateTimes, "do");

                    //如果有传参函数,调用传参的函数,直接传递data数据
                    if (dataType === "html") {
                        $(contentHtmlContainer).html(data);
                    } else if (dataType === "json" || dataType === "jsonp") {
                        _this.getPageDataSuccess(page, data);
                    }
                    _this.loadingObj.hide();
                    _this.loading = 0;
                },
                error: function() {
                    _this.checkGetDaateTimes++;
                    _this.loadingObj.hide();
                    _this.loading = 0;
                }
            }

            if (_this.config.jsonpCallback) {
                window[_this.config.jsonpCallback] = option.success;
                delete option.success;
                option.jsonpCallback = _this.config.jsonpCallback;
            }

            $.ajax(option);
        }, _this.config.loadingTime);
    };

    pagination.tmpReplace = function(tmp, data) {
        return tmp.replace(/\\?\{([^{}]+)\}/g, function(match, name) {
            return (data[name] === undefined) ? '' : data[name];
        });
    };

    window.pagination = pagination;
})(jQuery);