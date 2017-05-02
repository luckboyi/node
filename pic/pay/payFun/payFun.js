//相关url配置
(function(w, $) {

    /**
     * 支付控制组件，控制加载不同类型的支付组件webPayFun/miniPayFun
     */
    var payFun = {
        bankConfig: {},
        config: {
            funType: "web", //支付组件类型,默认是web
            paramCon: "#hideParam", //数据存放的容器，用input name value来存放需要提交的数据，方便取出
            formDataCon: "#formData", //使用form方式提交的数据存放的容器
            url: { //设置urlConfig
                js: "http://pic.vronline.com",
                payCheck: "http://pay.vronline.com",
                pay: "http://pay3.xy.com"
            },
            channel: "", //预留的渠道，传入默认渠道
            //其他参数，可拓展，在具体支付页面的脚步中进行使用
            version: "0.13",
            banks: ""
        },

        /**
         * 默认url配置，可通过init方法传入
         */
        urlconfig: {
            js: "http://pic.vronline.com",
            payCheck: "http://pay.vronline.com",
            pay: "http://pay3.xy.com"
        },

        /**
         * 渠道配置，配置一些渠道通用的内容
         */
        channels: {},

        /**
         * 初始化组件，传入属性
         */
        init: function(config) {
            var _this = this;
            $.ajaxSetup({
                error: function() {
                    _this.dialog("充值失败", "提交失败");
                    _this.paying = 0;
                }
            });
            if (typeof config == "object") {
                this.config = $.extend({}, this.config, config);
            }
            if (typeof this.config.url == "object") {
                this.urlconfig = $.extend({}, this.urlconfig, this.config.url);
            }
            if (typeof this.config.channels == "object") {
                this.channels = $.extend({}, this.channels, this.config.channels);
            }
            if (typeof this.config.banks == "object") {
                this.bankConfig = $.extend({}, this.bankConfig, this.config.banks);
            }

            var env = $(this.config.paramCon).find("input[name='env']").val();

            if (env == "product") {
                this.urlconfig.payCheck = "https://pay.vronline.com";
            } else {
                this.urlconfig.pay = "http://dev3.pay.xy.com";
            }

            this.loadFunTypeJs();
        },

        /**
         * 异步加载脚本
         */
        getScript: function(url, options, callback) {
            if (typeof options === 'function') {
                callback = options;
                options = undefined;
            }
            options = $.extend({}, {
                cache: true,
                scriptCharset: 'utf-8'
            }, options, {
                url: url,
                success: callback,
                dataType: 'script'
            });
            return $.ajax(options);
        },

        /**
         * 载入支付组件类型脚本
         */
        loadFunTypeJs: function() {
            //每次加载是,清除之前的支付渠道
            var _this = this;
            var funType = _this.config.funType;
            this.getScript(this.urlconfig['js'] + "/pay/payFun/funType/" + funType + "pay.js?v=" + _this.config.version, function() {
                //脚步类型
                _this.funType = funType;
                //在脚步初始化时将具体对象绑定到PayFun.fn中,默认调用一个绑定事件，一个检查参数的事件
                _this.fn.bind();

            });
        },

        /**
         * 载入支付支付渠道脚本
         */
        loadChannelJs: function(_channel) {
            //每次加载是,清除之前的支付渠道
            var _this = this;

            this.getScript(this.urlconfig['js'] + "/pay/payFun/channels/" + _channel + "_pay.js?v=" + _this.config.version, function() {

                _this.fn.nowChannel = _channel;

                _this.fn.checkParam();

            });
        },

        /**
         * 根据paramCon中的input=>value设置数据对象
         * 没有通过检查的不能进行设置
         */
        setData: function() {
            var _this = this;

            //优先验证数据合法性
            if (!_this.fn.checkParam()) {
                return false;
            }

            var data = {};
            $(this.config.paramCon).find('input').each(function() {
                var name = $(this).attr("name");
                var value = $(this).val() == null ? "" : $(this).val();
                data[name] = value;
            });


            return data;
        },

        /**
         * 根据购买物品类型获取创建订单的地址
         * 
         * @return {[type]} [description]
         */
        getCheckUrl: function() {

            var checkUrl = this.urlconfig.payCheck;
            if (PayFun.fn.item == "gameCoin") {
                checkUrl += "/create/buygame";
            } else if (PayFun.fn.item == "platformCoin") {
                checkUrl += "/create/buyplantb";
            }

            return checkUrl;
        },

        /**
         * 使用form表单的方式进行数据提交
         */
        formSubmit: function(data, url, target) {
            target = target || "_blank";

            if ($(this.config.formDataCon)) {
                $(this.config.formDataCon).remove();
            }
            var formhtml = "<form id='formData' target='" + target + "' style='display:none' method='post' action='" + url + "'>";
            for (var i in data) {
                // var name = this.formData[i];
                // if (data[name] !== undefined) {
                //     formhtml += "<input tpye='hidden' name='" + name + "' value='" + data[name] + "'>";
                // }
                formhtml += "<input tpye='hidden' name='" + i + "' value='" + data[i] + "'>";
            }
            formhtml += "</form>";
            $("body").append(formhtml);
            $(this.config.formDataCon).submit();
        },

        /**
         * 通用的弹出框
         */
        dialog: function(title, content, obj) {

            var config = {
                headerMsg: title,
                msg: content,
                model: "tips"
            }

            if (typeof obj == "object") {
                config = $.extend({}, config, obj);
            }

            tipsFn.init(config);
        },
        openNewWindow: function(src, name) {
            var iWidth = 1000; //弹出窗口的宽度;
            var iHeight = 700; //弹出窗口的高度;
            var iTop = (window.screen.availHeight - 30 - iHeight) / 2; //获得窗口的垂直位置;
            var iLeft = (window.screen.availWidth - 10 - iWidth) / 2; //获得窗口的水平位置;
            return window.open(src, name, "height=" + iHeight + ", width=" + iWidth + ", top=" + iTop + ", left=" + iLeft);
        }
    }

    w.PayFun = payFun;

})(window, jQuery);