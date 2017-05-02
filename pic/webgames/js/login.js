/**
 * 需要提前引入jquery
 */
(function($, Messenger) {
    var login = {
        config: { //配置信息
            type: "popup", //popup弹出层，bind绑定输入框
            popid: "login-popup", //登入弹出窗口标示
            popBind: "", //type为popup时启用，弹出框相关对象绑定，详细参考popBind参数
            loginBind: "", //type为bind时启用，绑定的登入的输入框对象,详细参考loginBind
            loginError: "", //登入错误信息对应的显示容器,详细参考loginError,默认绑定对象名称后加上-error
            loginCaptchaCon: "#login-captacha-con", //显示登录二维码的容器
            regBind: "", //type为bind时启用，绑定注册的输入框对象，详细参考regBind
            regError: "", //注册错误信息对应的显示容器,详细参考loginError,默认绑定对象名称后加上-error
            regCaptchaCon: "#reg-captacha-con", //显示注册二维码的容器
            captchaWidth: 84, //验证码宽度
            captchaHeight: 35, //验证码高度
            thirdBind: "", //type为bind时启用，第三方相关绑定
            errorCallBack: "", //错误信息回调，类型function
            showLoginCaptcha: "", //自定义显示登录二维码方法,类型function
            showRegCaptcha: "", //自定义显示登录二维码方法,类型function
            successCallBack: "", //登入、注册成功后回调方法,类型function
            rememberBind: "", //绑定"记住我",的事件,类型function
            // errorType: "single", //single单一的错误信息，oneToOne一一对应的错误提示信息，后续拓展用
            //commonError: "#common-error-info",//统一错误显示容器，后续拓展用
            debug: true
        },
        popBind: { //弹出框事件绑定对象设置
            showRegBtn: "#regShowBtn", //显示注册弹出框
            showBtn: "#loginShowBtn", //显示弹出框
            closeBtn: "#loginCloseBtn" //关闭弹出框
        },
        loginBind: { //登录对应输入框，按钮绑定
            name: "#login-username", //用户名
            pwd: "#login-pwd", //密码
            captcha: "#login-captcha", //验证码
            loginBtn: "#loginBtn", //登录按钮
            remember: "#remember" //记住我
        },
        loginError: {
            // name: "#login-username-error",
            // pwd: "#login-pwd-error",
            // captcha: "#login-captcha-error"
        },
        thirdBind: {
            qq: "#login-qq",
            wx: "#login-wx",
            wb: "#login-wb"
        },
        regBind: { //注册对应输入框，按钮绑定
            name: "#reg-username", //用户名
            pwd: "#reg-pwd", //密码
            pwd_confirm: "#reg-pwd-confirm", //密码确认
            captcha: "#reg-captcha", //验证码
            agreement: "#agreement", //同意协议
            regBtn: "#regBtn" //注册按钮
        },
        regError: {
            // name: "#reg-username-error",
            // pwd: "#reg-pwd-error",
            // pwd_confirm: "#reg-pwd-confirm-error",
            // captcha: "#reg-captcha-error",
            // agreement: "#agreement-error"
        },
        hasError: {
            login: {},
            reg: {}
        },
        needLoginCaptcha: 0,
        needRegCaptcha: 0,
        init: function(config) {
            if (config) {
                this.config = $.extend({}, this.config, config);
            }

            var _this = this;
            var _config = this.config;

            if (this.config.type == "popup") {
                if (typeof _config.popBind == "object") {
                    this.popBind = $.extend({}, this.popBind, _config.popBind);
                }
                $(this.popBind.showBtn).click(function() {
                    _this.showLogin();
                });
                $(this.popBind.showRegBtn).click(function() {
                    _this.showLogin("reg");
                });
            }

            if (typeof _config.loginBind == "object") {
                this.loginBind = $.extend({}, this.loginBind, _config.loginBind);
            }
            if (typeof _config.loginError == "object") {
                this.loginError = $.extend({}, this.loginError, _config.loginError);
            }
            if (typeof _config.thirdBind == "object") {
                this.thirdBind = $.extend({}, this.thirdBind, _config.thirdBind);
            }
            if (typeof _config.regBind == "object") {
                this.regBind = $.extend({}, this.regBind, _config.regBind);
            }
            if (typeof _config.regError == "object") {
                this.regError = $.extend({}, this.regError, _config.regError);
            }

            this.bind();
        },
        showLogin: function(type) {
            if (!this.config.popid) {
                this.log("没有配置弹出层id");
                return false
            }
            if (this.popupShwo) {
                this.log("弹出层已经展示，请关闭弹出层");
                return false;
            }
            var url = "http://web.vronline.com/user/minilogin"
            if (type) {
                url += "?type=" + type;
            }
            var content = '<iframe id="' + this.config.popid + '" frameborder="no" border="0" src="' + url + '" style="position: fixed; top: 0px; left: 0px; width: 100%; height: 100%; z-index: 99999;"></iframe>';
            $("body").append(content);

            this.popupShwo = 1;
        },
        closeLogin: function() {
            if (!this.popupShwo) {
                this.log("未展示弹出层，不需要关闭");
                return false;
            }
            $("#" + this.config.popid).remove();
            this.popupShwo = 0;
        },
        bind: function() {
            this.doLoginBind();
            this.doRegBind();
            this.doThirdBind();
        },
        doLoginBind: function() {
            var _this = this;
            $.each(this.loginBind, function(i, e) {
                if (i == "remember") {
                    _this.remember = 0;
                    if (typeof _this.config.rememberBind == "function") {
                        _this.config.rememberBind(e);
                        return true;
                    }
                    $(e).change(function(event) {
                        if ($(this).is(':checked')) {
                            _this.remember = 1;
                        } else {
                            _this.remember = 0;
                        }
                        _this.log(_this.remember);
                    });
                    return true;
                }
                if (i == "loginBtn") {
                    $(e).click(function(event) {
                        _this.doLogin();
                    });
                    return true;
                }
                $(e).blur(function() {
                    _this.checkLogin(i, $(this));
                });
            });
            $(this.config.loginCaptchaCon + ' img').click(function() {
                var src = $(this).attr('src');
                var i = src.indexOf('v=');
                if (i < 0) {
                    src = src + '&v=' + Math.random();
                    $(this).attr('src', src);
                } else {
                    var v = src.substr(i, src.length);
                    src = src.replace(v, "v=" + Math.random());
                    $(this).attr('src', src);
                }
            });
        },
        doLogin: function() {
            var _this = this;
            this.log("do login");
            var data = this.checkLoginData()
            if (!data) {
                this.log("未通过登入检查");
                return false;
            }
            this.log(data);
            this.log("通过登入检查");
            if (this.remember && this.remember == 1) {
                data.remember = 1;
            }
            if (data.captcha) {
                data.code = data.captcha;
            }
            $.post('/api/login', data, function(data) {
                if (data.code == 0) {
                    if (typeof _this.config.successCallBack == "function") {
                        _this.config.successCallBack("login");
                    } else {
                        _this.successCallBack("login");
                    }
                } else {
                    if (data.code == 1115 || data.code == 2006) {
                        if (!_this.needLoginCaptcha) {
                            _this.needLoginCaptcha = 1;
                        } else {
                            _this.handleError("login", "captcha", data.msg);
                        }
                        _this.showLoginCaptcha(data.data.img);
                        return false;
                    }
                    if (_this.needLoginCaptcha) {
                        var CaptchaCon = $(this.config.loginCaptchaCon + " img");
                        var src = CaptchaCon.attr('src');
                        var i = src.indexOf('v=');
                        if (i < 0) {
                            src = src + '&v=' + Math.random();
                            CaptchaCon.attr('src', src);
                        } else {
                            var v = src.substr(i, src.length);
                            src = src.replace(v, "v=" + Math.random());
                            CaptchaCon.attr('src', src);
                        }
                    }
                    _this.handleError("login", "name", data.msg);
                }
            }, "json");
        },
        showLoginCaptcha: function(captchaImg) {
            if (typeof this.config.showLoginCaptcha == "function") {
                this.config.showLoginCaptcha(captchaImg, this.config.loginCaptchaCon);
                return true;
            }
            $(this.config.loginCaptchaCon + " img").attr('src', captchaImg + "?w=" + this.config.captchaWidth + "&h=" + this.config.captchaHeight + "&v=" + Math.random());
            $(this.config.loginCaptchaCon + " input").val('');
            $(this.config.loginCaptchaCon).show();
        },
        checkLoginData: function() {
            var _this = this;
            var data = {};
            var check = true;
            $.each(this.loginBind, function(i, e) {
                _this.log(_this.needLoginCaptcha);
                if (i == "loginBtn" || i == "remember") {
                    return true;
                }
                if (i == "captcha" && !_this.needLoginCaptcha) {
                    return true;
                }
                _this.checkLogin(i, $(e));
                if (_this.hasError.login[i] == 1) {
                    _this.log("检查" + i + "有错误");
                    check = false;
                } else {
                    data[i] = $(e).val();
                }
            });
            if (!check) {
                return false;
            }
            return data;
        },
        checkLogin: function(name, obj) {
            this.log(name);
            this.log(obj);
            var value = obj.val();
            var error = false;
            this.log(name + ":" + value)
            switch (name) {
                case "name":
                    if (typeof(value) == 'undefined' || value == "") {
                        error = "用户名不能为空";
                    }
                    break;
                case "pwd":
                    if (typeof(value) == 'undefined' || value == "") {
                        error = "密码不能为空";
                    }
                    break;
                case "captcha":
                    if (typeof(value) == 'undefined' || value == "") {
                        error = "验证码不能为空";
                    }
                    break;
                default:
                    break;
            }
            this.handleError("login", name, error);
        },
        doRegBind: function() {
            var _this = this;
            $.each(this.regBind, function(i, e) {
                if (i == "agreement") {
                    _this.agreement = 1;
                    if (typeof _this.config.agreementBind == "function") {
                        _this.config.agreementBind(e);
                        return true;
                    }
                    $(e).click(function() {
                        if ($(this).hasClass("cur")) {
                            $(this).removeClass('cur');
                            _this.agreement = 0;
                        } else {
                            $(this).addClass("cur");
                            _this.agreement = 1;
                        }
                    });
                    return true;
                }
                if (i == "regBtn") {
                    $(e).click(function(event) {
                        _this.doReg();
                    });
                    return true;
                }
                $(e).blur(function() {
                    _this.checkReg(i, $(this));
                });
            });
            $(this.config.regCaptchaCon + ' img').click(function() {
                var src = $(this).attr('src');
                var i = src.indexOf('v=');
                if (i < 0) {
                    src = src + '&v=' + Math.random();
                    $(this).attr('src', src);
                } else {
                    var v = src.substr(i, src.length);
                    src = src.replace(v, "v=" + Math.random());
                    $(this).attr('src', src);
                }
            });
        },
        doReg: function() {
            var _this = this;
            this.log("do reg");
            var data = this.checkRegData();
            if (!data) {
                this.log("未通过注册检查");
                return false;
            }
            this.log(data);
            this.log("通过注册检查");

            data.account = data.name;
            data.confirmPwd = data.pwd_confirm
            if (data.captcha) {
                data.code = data.captcha;
            }
            $.post('/api/register', data, function(data) {
                if (data.code == 0) {
                    if (typeof _this.config.successCallBack == "function") {
                        _this.config.successCallBack("reg");
                    } else {
                        _this.successCallBack("reg");
                    }
                } else {
                    if (data.code == 1115 || data.code == 2006) {
                        if (!_this.needRegCaptcha) {
                            _this.needRegCaptcha = 1;
                        } else {
                            _this.handleError("reg", "captcha", data.msg);
                        }
                        _this.showRegCaptcha(data.data.img);
                        return false;
                    }
                    if (_this.needRegCaptcha) {
                        var CaptchaCon = $(this.config.regCaptchaCon + " img");
                        var src = CaptchaCon.attr('src');
                        var i = src.indexOf('v=');
                        if (i < 0) {
                            src = src + '&v=' + Math.random();
                            CaptchaCon.attr('src', src);
                        } else {
                            var v = src.substr(i, src.length);
                            src = src.replace(v, "v=" + Math.random());
                            CaptchaCon.attr('src', src);
                        }
                    }
                    _this.handleError("reg", "name", data.msg);
                }
            }, "json");
        },
        showRegCaptcha: function(captchaImg) {
            if (typeof this.config.showRegCaptcha == "function") {
                this.config.showRegCaptcha(captchaImg, this.config.regCaptchaCon);
                return true;
            }
            $(this.config.regCaptchaCon + " img").attr('src', captchaImg + "?w=" + this.config.captchaWidth + "&h=" + this.config.captchaHeight + "&v=" + Math.random());
            $(this.config.regCaptchaCon + " input").val('');
            $(this.config.regCaptchaCon).show();
        },
        checkRegData: function() {
            var _this = this;
            var data = {};
            var check = true;
            $.each(this.regBind, function(i, e) {
                if (i == "regBtn") {
                    return true;
                }
                if (i == "captcha" && !_this.needRegCaptcha) {
                    return true;
                }
                _this.checkReg(i, $(e));
                if (_this.hasError.reg[i] == 1) {
                    _this.log("检查" + i + "有错误");
                    check = false;
                } else {
                    data[i] = $(e).val();
                }
            });
            if (!check) {
                return false;
            }
            return data;
        },
        checkReg: function(name, obj) {
            this.log(name);
            this.log(obj);
            if (name != "agreement") {
                var value = obj.val();
            }
            var error = false;
            switch (name) {
                case "name":
                    if (typeof(value) == 'undefined' || value == "") {
                        error = "用户名不能为空";
                    }
                    var rs = /^[a-zA-Z\u4E00-\u9FA50-9][a-zA-Z\u4E00-\u9FA50-9_]*$/;
                    if (!rs.test(value)) {
                        error = "只允许中英文、数字、下划线，且不能以下划线开头"
                        break;
                    }
                    var a = value.length;
                    if (value.match(/[^\x00-\xff]/ig) != null) {
                        var b = value.match(/[^\x00-\xff]/ig).length;
                        a = a + b * 2
                    }
                    if (a < 6 || a > 18) {
                        error = "账号长度只能6~18个字符";
                        break;
                    }
                    this.checkRegName(value);
                    break;
                case "pwd":
                    if (typeof(value) == 'undefined' || value == "") {
                        error = "密码不能为空";
                        break;
                    }
                    if (value.length < 6 || value.length > 16) {
                        error = "输入6-16位密码";
                        break;
                    }
                    break;
                case "pwd_confirm":
                    if (typeof(value) == 'undefined' || value == "") {
                        error = "密码不能为空";
                    } else if (value != $(this.regBind.pwd).val()) {
                        error = "两次密码不同";
                    }
                    break;
                case "captcha":
                    if (typeof(value) == 'undefined' || value == "") {
                        error = "验证码不能为空";
                    }
                    break;
                case "agreement":
                    if (!this.agreement) {
                        error = "请同意协议";
                    }
                    break;
                default:
                    break;
            }
            this.handleError("reg", name, error);
        },
        checkRegName: function(name) {
            var _this = this;
            $.post("/api/account", {
                account: name
            }, function(data) {
                if (data.code == 0) {
                    _this.log('用户名正确')
                } else {
                    _this.handleError("reg", "name", data.msg);
                }
            }, "json");
        },
        doThirdBind: function() {
            //qq登录
            if (this.thirdBind.qq) {
                $(this.thirdBind.qq).click(function() {
                    var url = top.location.href;
                    top.location.href = "http://passport.vronline.com/auth/qq?url=" + url;
                });
            }
            // 微信登录
            if (this.thirdBind.wx) {
                $(this.thirdBind.wx).click(function() {
                    var url = top.location.href;
                    top.location.href = "http://passport.vronline.com/auth/wx?url=" + url;
                });
            }
            // 微博登录
            if (this.thirdBind.wb) {
                $(this.thirdBind.wb).click(function() {
                    var url = top.location.href;
                    top.location.href = "http://passport.vronline.com/auth/weibo?url=" + url;
                });
            }
        },
        handleError: function(type, name, error) {
            if (!type) {
                this.log("错误处理失败，参数type错误");
                return false;
            }
            if (!name) {
                this.log("错误处理失败，参数name错误");
                return false;
            }
            if (!this[type + "Error"][name]) {
                this[type + "Error"][name] = this[type + "Bind"][name] + "-error";
            }
            if (typeof this.config.errorCallBack == "function") {
                this.config.errorCallBack(this[type + "Error"][name], error);
            } else {
                this.log(this[type + "Error"][name]);
                if (!error) {
                    $(this[type + "Error"][name]).html("");
                } else {
                    $(this[type + "Error"][name]).text(error);
                }
            }
            if (error) {
                this.hasError[type][name] = 1;
            } else {
                this.hasError[type][name] = 0;
            }
            this.log(this.hasError);
        },
        successCallBack(type) {
            top.location.reload();
        },
        log: function(msg) {
            if (this.config.debug && window["console"]) {
                console.log(msg);
            }
        }
    };

    window.webgameLogin = login;

    var messenger = new Messenger('loginOpener', 'web-vronline');
    messenger.listen(function(msg) {
        obj = $.parseJSON(msg);
        if (obj.call) {
            if (typeof login[obj.call] == "function") {
                login[obj.call]();
            }
        }
    });
})(jQuery, window.Messenger);