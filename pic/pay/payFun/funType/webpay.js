(function(w, $, PayFun, ClientConfig) {

    var webPayFun = {
        /**
         * 购买的项目
         */
        items: {
            gameCoin: {
                maxAmount: 5000, //最大充值数量
                minAmount: 1, //最小充值数量
                multiple: 1 //充值数量倍数
            },
            platformCoin: {
                maxAmount: 5000, //最大充值数量
                minAmount: 1, //最小充值数量
                multiple: 1 //充值数量倍数
            }
        },

        /**
         * 初始化
         */
        init: function() {

            var _this = this;

            PayFun.fn = this;

            _this.channel = PayFun.config.channel;

            _this.payNumCon = $("#pay-num");
            _this.needNumCon = $("#need-num");

            _this.moneyCon = $("#hideParam input[name='money']");
            _this.rate = $("#hideParam input[name='pay_rate']").val();

            _this.item = "platformCoin";

            var initAppid = $("#hideParam input[name='appid']").val();
            if (initAppid > 0) {
                _this.item = "gameCoin";
                $(".pay-rate").hide();
                $(".pageGame_charge").addClass('cur').siblings().removeClass('cur');
                $('.paymentCenter .pageGame_sel').show();
            }

            _this.errorinfo = $(".erro_tips");

            _this.gameCon = $("#gameSelect");
            _this.serverCon = $("#serverSelect");
            _this.appid = _this.gameCon.val();

            var initSid = _this.serverCon.attr("init");
            _this.getServers(initSid);

            _this.useVr = 0;

            _this.pay_container = $("#pay-container");

            //默认加载传入渠道的支付脚本
            PayFun.loadChannelJs(_this.channel);

        },

        /**
         * 绑定页面事件
         */
        bind: function(obj) {

            var _this = this;

            /**
             * 支付提示信息
             */
            $('.other_pay_num i').hover(function() {
                $('.pay_num_tips').show();
            }, function() {
                $('.pay_num_tips').hide();
            });

            /**
             * 切换购买内容
             */
            $('.paymentCenter .select-item').on('click', 'span', function() {

                $(this).addClass('cur').siblings().removeClass('cur');

                _this.item = $(this).attr("item");
                if (_this.item == "gameCoin") {
                    $('.paymentCenter .pageGame_sel').show();
                    $(".pay-rate").hide();
                } else {
                    $('.paymentCenter .pageGame_sel').hide();
                    $(".pay-rate").show();
                }

                if (typeof resizeFn == "function") {
                    resizeFn();
                }
                _this.checkParam(1);
            });

            /**
             * 标签选择支付金额
             */
            $('.payment_num span').on('click', function() {
                $(this).addClass('cur').siblings().removeClass('cur');
                var num = $(this).attr("num");
                num = parseInt(num);
                _this.payNumCon.val(num);
                _this.checkParam(1);
            });

            /**
             * 网页游戏充值时选择游戏
             */
            _this.gameCon.change(function() {
                _this.appid = $(this).val();
                _this.getServers();
            });

            /**
             * 网页游戏充值时选择区服
             */
            _this.serverCon.change(function() {
                $("#hideParam input[name='sid']").val($(this).val());
                _this.serverid = $(this).val();
                _this.hasRole();
            });

            /**
             * 支付金额输入框失去焦点
             */
            _this.payNumCon.blur(function() {
                _this.checkParam(1);
            });

            /**
             * 支付金额输入框输入内容时
             */
            _this.payNumCon.keyup(function(e) {
                _this.checkParam(1);
            });

            /**
             * 是否使用VR点支付
             */
            $('.choice_box').on('click', function() {

                $(this).toggleClass('choiced');

                if ($(this).hasClass('choiced')) {
                    _this.useVr = 1;
                } else {
                    _this.useVr = 0;
                }

                _this.checkParam(1);
            });

            /**
             * 关闭支付弹出层
             */
            $('.mask_layer .close').on('click', function() {
                $('.ali_window').hide();
                $("#payFrame").attr("src", "");
            });

        },

        /**
         * 改变可以获得的游戏币数量
         */
        changeGetGameCoin: function() {
            var _this = this;
            var money = _this.payNumCon.val();

            var rate = $(".scale_num").text();
            rate = parseInt(rate);
            $("#getGameCon").text(money * rate);
        },

        /**
         * 改变充值相关的显示内容已经表单数据、切换支付脚本
         */
        changeAmount: function(num) {

            var _this = this;
            var paymentNumSpan = $('.payment_num span[num="' + num + '"]')
            if (paymentNumSpan.length > 0) {
                paymentNumSpan.addClass('cur').siblings().removeClass('cur');
            } else {
                $('.payment_num span').removeClass('cur');
            }
            _this.needNumCon.text(num);


            var needPay = num;

            if (_this.item == "gameCoin") {
                _this.changeGetGameCoin();
                var rate = $(".scale_num").text();
                rate = parseInt(rate);
                var price = rate ? parseFloat(1 / rate).toFixed(2) : 0;
                var buyNum = parseInt(num * rate);
            }

            if (_this.useVr == 1) {

                var money = _this.moneyCon.val();

                needPay = num - (money / _this.rate);
                var useVrCoin = money;
                $('.choice_box').parents('.pageGame_pay').height(150);

                if (needPay <= 0) {
                    needPay = 0;
                    useVrCoin = num * _this.rate;
                    //切换成vr支付脚本
                    if (_this.nowChannel != "vrcoin") {
                        $("#button-container").html("");
                        PayFun.loadChannelJs("vrcoin");
                    }
                } else {
                    //切换成默认支付脚本
                    if (_this.nowChannel == "vrcoin") {
                        $("#button-container").html("");
                        PayFun.loadChannelJs(_this.channel);
                    }
                }

                $(".total_num").text(num);
                $(".user_num").text(useVrCoin);
                _this.needNumCon.text(needPay);

                $(".choice_vr_pay").show();

            } else {
                //切换成默认支付脚本
                if (_this.nowChannel == "vrcoin") {
                    $("#button-container").html("");
                    PayFun.loadChannelJs(_this.channel);
                }
                $('.choice_box').parents('.pageGame_pay').height(100);
                $(".choice_vr_pay").hide();
            }

            $('#hideParam input[name="pay_total"]').val(num);
            $('#hideParam input[name="pay_rmb"]').val(needPay);
            $('#hideParam input[name="price"]').val(price);
            $('#hideParam input[name="num"]').val(buyNum);
        },

        /**
         * 检查参数
         */
        checkParam: function(type) {

            var _this = this;
            var num = _this.payNumCon.val();
            var error = 0;

            if (!num) {
                _this.errorinfo.text("充值金额不能为空，请填写充值金额");
                error = 1
            }

            var sid = $("#hideParam input[name='sid']").val();
            //游戏币充值时必须选择区服
            if (_this.item == "gameCoin" && sid == 0) {
                _this.errorinfo.text("请选择服务器");
                error = 1;
            }

            var hasRole = $("#hideParam input[name='hasRole']").val();
            if (!type && _this.item == "gameCoin" && hasRole != 1) {
                if (hasRole == 0) {
                    _this.errorinfo.text("该服务器中不存在角色，请重新选择服务器");
                } else if (hasRole == -1) {
                    _this.errorinfo.text("正在确认该服务器中是否存在角色，请稍后重试");
                }
                error = 1;
            }

            var re = /^\d+$/;
            !re.test(num) //整数限制
            if (!re.test(num)) {
                //必须为整数
                _this.errorinfo.text("金额填写1~5000之间的整数，不含小数点");
                error = 1;
            } else if (num % _this.items[_this.item].multiple) {
                //必须为设定值的倍数
                //_this.errorinfo.text("充值数量必须为" + _this.items[_this.item].multiple + "的倍数");
                _this.errorinfo.text("金额填写1~5000之间的整数，不含小数点");
                error = 1;
            } else if (num > _this.items[_this.item].maxAmount) {
                //不可大于允许最大充值数量
                //_this.errorinfo.text("充值数量不能大于" + _this.items[_this.item].maxAmount);
                _this.errorinfo.text("金额填写1~5000之间的整数，不含小数点");
                error = 1;
            } else if (num < _this.items[_this.item].minAmount) {
                //不可小于允许最大充值数量
                //_this.errorinfo.text("充值数量不能小于" + _this.items[_this.item].minAmount);
                _this.errorinfo.text("金额填写1~5000之间的整数，不含小数点");
                error = 1;
            } else {
                num = parseInt(num);
            }

            if (error == 1) {
                _this.errorinfo.show();
                $('.payment_num span').removeClass('cur');
                return false;
            }
            _this.errorinfo.text("");
            _this.changeAmount(num);
            _this.errorinfo.hide();

            return true;

        },

        /**
         * ajax请求服务器信息
         */
        getServers: function(initSid) {
            var _this = this;

            //将服务器信息制空，防止切换时提交
            $("#hideParam input[name='sid']").val("");
            _this.serverCon.html("<option>正在载入中...</option>");

            if (!_this.appid) {
                _this.errorinfo.text("请正确选择游戏");
                _this.errorinfo.show();
                return false;
            }

            $(".scale_num").text("");
            $("#hideParam input[name='game_type']").val(_this.appid);
            $("#hideParam input[name='sid']").val(0);

            $.ajax({
                    url: ClientConfig.Host + "/getServers",
                    type: 'GET',
                    dataType: 'JSON',
                    data: {
                        appid: _this.appid
                    }
                })
                .done(function(obj) {

                    $(".hasSevers").show();

                    if (obj.code != 0) {
                        _this.serverCon.html("<option>" + obj.msg + "</option>");
                        $(".hasSevers").hide();
                        return;
                    }
                    if (obj.data.servers.length < 1) {
                        _this.serverCon.html("<option>没有获取到服务器</option>");
                        return;
                    }

                    var option = "";
                    $(".unit").text(obj.data.gameb_name);
                    $(".scale_num").text(obj.data.rmb_rate);

                    $.each(obj.data.servers, function(index, el) {
                        var selected = "";
                        if (index == 0) {
                            $("#hideParam input[name='sid']").val(el.serverid);
                            _this.serverid = el.serverid;
                            _this.hasRole();
                        }
                        if (el.serverid == initSid) {
                            selected = "selected='selected'";
                        }
                        option += "<option value='" + el.serverid + "'' " + selected + " >" + el.name + "</option>";
                    });
                    _this.checkParam(1);
                    _this.serverCon.html(option);
                })
                .fail(function() {
                    _this.serverCon.html("<option>请求失败，请稍后再试</option>");
                    return;
                });
        },
        hasRole: function() {
            var _this = this;

            //将服务器信息制空，防止切换时提交
            $("#hideParam input[name='hasRole']").val(-1);

            if (!_this.appid) {
                return false;
            }

            if (!_this.serverid) {
                return false;
            }

            $.ajax({
                    url: ClientConfig.Host + "/hasrole",
                    type: 'GET',
                    dataType: 'JSON',
                    data: {
                        appid: _this.appid,
                        serverid: _this.serverid
                    }
                })
                .done(function(obj) {
                    if (obj.code != 0) {
                        $("#hideParam input[name='hasRole']").val(0);
                        return false;
                    }
                    $("#hideParam input[name='hasRole']").val(1);
                })
                .fail(function() {
                    _this.errorinfo.text("发生错误，请重新选择服务器");
                    _this.errorinfo.show();
                    return false;
                });
        },
        changeChannel: function(channel) {
            this.channel = channel;
            PayFun.loadChannelJs(channel);
        }
    };

    webPayFun.init();

})(window, jQuery, PayFun, ClientConfig);