window.Messenger = (function() {

    // 消息前缀, 建议使用自己的项目名, 避免多项目之间的冲突
    // !注意 消息前缀应使用字符串类型
    var prefix = "[PROJECT_NAME]",
        supportPostMessage = 'postMessage' in window;

    // Target 类, 消息对象
    function Target(target, name, prefix) {
        var errMsg = '';
        if (arguments.length < 2) {
            errMsg = 'target error - target and name are both required';
        } else if (typeof target != 'object') {
            errMsg = 'target error - target itself must be window object';
        } else if (typeof name != 'string') {
            errMsg = 'target error - target name must be string type';
        }
        if (errMsg) {
            throw new Error(errMsg);
        }
        this.target = target;
        this.name = name;
        this.prefix = prefix;
    }

    // 往 target 发送消息, 出于安全考虑, 发送消息会带上前缀
    if (supportPostMessage) {
        // IE8+ 以及现代浏览器支持
        Target.prototype.send = function(msg) {
            this.target.postMessage(this.prefix + '|' + this.name + '__Messenger__' + msg, '*');
        };
    } else {
        // 兼容IE 6/7
        Target.prototype.send = function(msg) {
            var targetFunc = window.navigator[this.prefix + this.name];
            if (typeof targetFunc == 'function') {
                targetFunc(this.prefix + msg, window);
            } else {
                throw new Error("target callback function is not defined");
            }
        };
    }

    // 信使类
    // 创建Messenger实例时指定, 必须指定Messenger的名字, (可选)指定项目名, 以避免Mashup类应用中的冲突
    // !注意: 父子页面中projectName必须保持一致, 否则无法匹配
    function Messenger(messengerName, projectName) {
        this.targets = {};
        this.name = messengerName;
        this.listenFunc = [];
        this.prefix = projectName || prefix;
        this.initListen();
    }

    // 添加一个消息对象
    Messenger.prototype.addTarget = function(target, name) {
        var targetObj = new Target(target, name, this.prefix);
        this.targets[name] = targetObj;
    };

    // 初始化消息监听
    Messenger.prototype.initListen = function() {
        var self = this;
        var generalCallback = function(msg) {
            if (typeof msg == 'object' && msg.data) {
                msg = msg.data;
            }

            var msgPairs = msg.split('__Messenger__');
            var msg = msgPairs[1];
            var pairs = msgPairs[0].split('|');
            var prefix = pairs[0];
            var name = pairs[1];

            for (var i = 0; i < self.listenFunc.length; i++) {
                if (prefix + name === self.prefix + self.name) {
                    self.listenFunc[i](msg);
                }
            }
        };

        if (supportPostMessage) {
            if ('addEventListener' in document) {
                window.addEventListener('message', generalCallback, false);
            } else if ('attachEvent' in document) {
                window.attachEvent('onmessage', generalCallback);
            }
        } else {
            // 兼容IE 6/7
            window.navigator[this.prefix + this.name] = generalCallback;
        }
    };

    // 监听消息
    Messenger.prototype.listen = function(callback) {
        var i = 0;
        var len = this.listenFunc.length;
        var cbIsExist = false;
        for (; i < len; i++) {
            if (this.listenFunc[i] == callback) {
                cbIsExist = true;
                break;
            }
        }
        if (!cbIsExist) {
            this.listenFunc.push(callback);
        }
    };
    // 注销监听
    Messenger.prototype.clear = function() {
        this.listenFunc = [];
    };
    // 广播消息
    Messenger.prototype.send = function(msg) {
        var targets = this.targets,
            target;
        for (target in targets) {
            if (targets.hasOwnProperty(target)) {
                targets[target].send(msg);
            }
        }
    };

    return Messenger;
})();


/**
 * 加载minipay
 */
(function(w, $) {

    var minipay = {

        id: "vr_minipay" + new Date().getTime(),

        url: "http://webgame.vronline.com/minipay",

        src: "",

        params: {},

        initParams: {},

        ready: function() {
            var _this = this;
            $(function() {
                _this.buildSrc();
                $("body").append(_this.iframeTemp());
                $("body").delegate(".close_btn", 'click', function(event) {
                    _this.closePay();
                });
            });
        },

        iframeTemp: function() {
            var _this = this;
            return '<div id="' + _this.id + '" style="z-index: 10; width: 576px;height: 400px; left: 50%; top:50%; margin-left:-288px; margin-top:-200px;position: absolute;display:none;background:#1c202a;"><div style="position: absolute;display: block;width: 18px;height: 20px;right: 14px;top: 10px;background: url(http://pic.vronline.com/common/images/icon.png) no-repeat -96px -200px; cursor:pointer;" class="close_btn"></div><iframe src="" name="minipay" id="minipay" frameborder="0" width="100%" height="100%"></iframe></div>';
        },

        buildSrc: function() {
            var _this = this;
            var params = [];
            if (_this.params) {
                $.each(_this.params, function(i, e) {
                    params.push(i + "=" + e);
                });
            }
            _this.src = encodeURI(_this.url + "?" + params.join("&"));
        },

        open: function(params) {
            var _this = this;
            if (typeof params == "object") {
                _this.params = $.extend({}, _this.initParams, params);
            }

            _this.buildSrc();

            if (!$("#" + _this.id).length > 0) {
                $("body").append(_this.iframeTemp());
            }

            $("#" + this.id).find("iframe").attr("src", _this.src);
            $("#" + this.id).show();
        },

        closePay: function() {
            $("#" + this.id).find("iframe").attr("src", "");
            $("#" + this.id).hide();
        },
    };

    minipay.ready();

    window.VRminipay = minipay;

    var messenger = new Messenger('gameCon', 'vronline');
    messenger.listen(function(msg) {
        obj = $.parseJSON(msg);
        if (obj.call) {
            if (typeof minipay[obj.call] == "function") {
                minipay[obj.call]();
            }
        }
    });

})(window, jQuery);