(function(w, $, PayFun) {

    var miniPayFun = {
        /**
         * 允许购买的项目
         */
        items: {
            gameCoin: {
                maxAmount: 1000, //最大充值数量
                minAmount: 1, //最小充值数量
                multiple: 1 //充值数量倍数
            }
        },

        /**
         * 引入组件后的初始化方法
         */
        init: function() {

            var _this = this;

            //将自己赋值给PayFun，方便其他脚本进行调用
            PayFun.fn = this;

            //_this.unitPrice = $("#hideParam input[name='unit_price']").val();
            _this.moneyCon = $("#hideParam input[name='money']");
            _this.payCoinCon = $("#hideParam input[name='pay_coin']");
            _this.total = $("#hideParam input[name='total']").val();
            _this.errorinfo = $(".errorinfo");
            _this.pay_container = $("#pay-container");

            _this.item = "gameCoin";
            _this.useVr = 1;

            _this.rate = $("#hideParam input[name='pay_rate']").val();

            //获取当前充值项目可用的的支付渠道
            _this.channels = _this.items[_this.item].channels;
            //允许最大数量
            _this.maxAmount = _this.items[_this.item].maxAmount;
            //允许最小数量
            _this.minAmount = _this.items[_this.item].minAmount;
            //获取当前充值项目提交所需字段
            _this.multiple = _this.items[_this.item].multiple;

            //创建支付渠道 tab html 以及绑定事件
            _this.createChannels();

            var scrollbar = $('.charge_con').tinyscrollbar();
            _this.scrollbar = scrollbar.tinyscrollbar().data("plugin_tinyscrollbar");
            //_this.bind()
        },

        /**
         * 绑定页面相关事件
         */
        bind: function(obj) {
            var _this = this;

            $(".close-pay-con").click(function(event) {
                /* Act on the event */
                if (typeof w.CppCall == "function") {
                    w.CppCall('common', 'close', null);
                }
            });

            $("#payFrameCon .close-pay-frame").click(function(event) {
                $("#payFrame").attr("src", "");
                $("#payFrameCon").hide();
            });

            /**
             * 是否使用VR点支付
             */
            $('.choice_box').on('click', function() {

                $(this).toggleClass('selected');

                if ($(this).hasClass('selected')) {
                    _this.useVr = 1;
                } else {
                    _this.useVr = 0;
                }

                _this.checkParam();
            });

            w.messenger = new Messenger("minipay", 'vronline');
            messenger.addTarget(window.parent, 'gameCon');

        },

        /**
         * 构建支付渠道
         */
        createChannels: function() {
            var _this = this;
            var channelshtml = "";
            var i = 0;
            $.each(PayFun.channels, function(index, e) {
                e.value = index;
                //生成支付方式tab,配置中第一个支付渠道为默认支付渠道,后续根据需求进行调整
                if (i === 0) {
                    channelshtml += _this.createChannel(e, 1);
                    //加载默认支付渠道js
                    PayFun.loadChannelJs(index);
                    _this.choicedChannel = index;
                } else {
                    channelshtml += _this.createChannel(e, 0);
                }
                i++;
            });

            var channels_container = $("#pay-channels");

            channels_container.append(channelshtml);

            //为支付渠道绑定加载js的事件
            channels_container.delegate('.channel-tab', 'click', {
                pay: _this
            }, function(e) {
                if ($(this).hasClass("current")) {
                    return false;
                }
                var channel = $(this).attr('channel');
                e.data.pay.selectChannel(channel);
                _this.choicedChannel = channel;
                e.preventDefault();
            });
        },

        createChannel: function(option, current) {
            var html = '<span ';
            //默认支付渠道设置css样式
            if (current === 1) {
                html += "class='cud method_list channel-tab cur' ";
            } else {
                html += "class='cud method_list channel-tab' ";
            }
            html += "channel='" + option.value + "' ";
            html += ">";
            html += "  " + option.title;
            html += "</span> ";
            return html;
        },

        /**
         * 选择渠道事件
         */
        selectChannel: function(channel) {
            //选择渠道时,清楚微信图片定时加载
            if (this.reloadInterval) {
                clearInterval(this.reloadInterval);
            }
            $(".channel-tab[channel='" + channel + "']").addClass('cur').siblings().removeClass('cur');
            $("#payBtn").unbind('click');

            //加载不同的支付脚本
            PayFun.loadChannelJs(channel);
        },

        /**
         * 检查数据
         */
        checkParam: function() {
            var _this = this;

            var error = 0;

            _this.changeAmount();

            var money = _this.moneyCon.val();
            if (_this.choicedChannel == "vrcoin" && (_this.total * _this.rate) > money) {
                _this.errorinfo.text("余额不足，请使用其他付款方式");
                error = 1;
            } else {
                _this.errorinfo.text("");
            }

            if (error !== 0) {
                return false;
            }

            return true;
        },

        /**
         * 修改显示的金额
         */
        changeAmount: function() {

            var _this = this;

            var total = 1 * _this.total;

            total = total.toFixed(2);

            $("#hideParam input[name='pay_total']").val(total);

            var money = _this.moneyCon.val();
            var totalCoin = total * _this.rate;

            if (_this.useVr == 1) {
                $("#hideParam input[name='pay_vr']").val(1);
            } else {
                $("#hideParam input[name='pay_vr']").val(0);
            }

            if (_this.nowChannel == "vrcoin" && _this.choicedChannel == "vrcoin") {
                $("#showCoin").hide();
                $("#hideParam input[name='pay_rmb']").val(0);
                $(".pay-num .amount").text(totalCoin);
                $(".pay-num .unit").text("V点");
                _this.payCoinCon.val(totalCoin);
            } else {
                $("#showCoin").show();

                var needPay = 0;
                var payCoin = totalCoin;
                var needPayCoin = totalCoin - money;

                if (_this.useVr == 0 || needPayCoin > 0) {
                    if (_this.useVr == 1) {
                        $(".coin-amount").text(money);
                        payCoin = money;
                        needPay = needPayCoin / _this.rate;
                        needPay = needPay.toFixed(2);
                    } else {
                        payCoin = 0;
                        needPay = total;
                    }

                    if (_this.nowChannel != _this.choicedChannel) {
                        PayFun.loadChannelJs(_this.choicedChannel);
                    }
                } else {
                    $(".coin-amount").text(totalCoin);
                    if (_this.nowChannel != "vrcoin") {
                        PayFun.loadChannelJs("vrcoin");
                    }
                }

                $("#hideParam input[name='pay_rmb']").val(needPay);
                _this.payCoinCon.val(totalCoin);
                $(".pay-num .amount").text(needPay);
                $(".pay-num .unit").text("元");
            }
        },

        payCallBack: function(obj) {
            var _this = this;
            if (typeof w.CppCall == "function") {
                var json = {
                    code: -1
                };
                if (obj.ret) {
                    json.code = obj.ret;
                }
                window.CppCall('common', 'payres', json);
            }
            if (obj.code == 0) {
                var money = _this.moneyCon.val() - _this.payCoinCon.val();

                money = money >= 0 ? money : 0;
                $(".platformCoin").text(money);
                _this.moneyCon.val(money);
            }
        }

    };

    /**
     * 初始化
     */
    miniPayFun.init();

})(window, jQuery, PayFun);