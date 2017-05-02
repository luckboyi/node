(function($, PAY) {

    var urlconfig = PAY.urlconfig;

    var alipaybank = {};

    //初始化阿里支付模块
    alipaybank.mini_init = function() {

        var _this = this;
        var buttonhtml = '<div id="choice-bank" class="minipay clearfix">';

        var i = 0;
        $.each(PAY.bankConfig, function(index, val) {
            if (val.bank_id) {
                i++;
                if (i == 10) {
                    buttonhtml += '<div class="hide-banks" style="display:none">';
                }
                buttonhtml += '<span bank-id="' + val.bank_id + '" class="choice-bank-list"><i></i><span class="bank-icon-' + index + ' bank-icon"></span></span>';
            }
        });
        buttonhtml += "</div>";

        if (i > 9) {
            buttonhtml += '</div>';
            buttonhtml += '<div class="pay_hide_bar minipay"><i></i></div>';
        }

        buttonhtml += '<div class="pay-now show">';
        buttonhtml += '  <span class="hot1 submit_btn cud" href="javascript:;" id="payBtn">立即购买</span>';
        buttonhtml += '</div>';
        $("#button-container").html(buttonhtml);

        PAY.fn.scrollbar.update();

        $(".pay_hide_bar").click(function(event) {
            if ($(this).hasClass("cur")) {
                $(".hide-banks").hide();
                $(this).removeClass("cur");
                PAY.fn.scrollbar.update("relative");
            } else {
                $(".hide-banks").show();
                $(this).addClass("cur");
                PAY.fn.scrollbar.update("relative");
            }
        });

        $("#choice-bank .choice-bank-list").click(function(e) {
            $("#choice-bank .choice-bank-list").removeClass('cur');
            $(this).addClass("cur");
            _this.bank = $(this).attr("bank-id");
        });

        $("#payBtn").click(function(e) {
            if (!_this.bank) {
                PAY.dialog("提示", "请选择银行");
                return false;
            }
            _this.checkpay();
        });
    };

    alipaybank.web_init = function() {

        var _this = this;

        //生成支付按钮,待整合到pay中
        var i = 0;
        var buttonhtml = '<div id="choice-bank" class="clearfix">';
        $.each(PAY.bankConfig, function(index, val) {
            if (val.bank_id) {
                i++;
                if (i == 10) {
                    buttonhtml += '<div class="hide-banks" style="display:none">';
                }
                buttonhtml += '<span bank-id="' + val.bank_id + '" class="choice-bank-list"><i></i><span class="bank-icon-' + index + ' bank-icon"></span></span>';
            }
        });
        buttonhtml += "</div>";

        if (i > 9) {
            buttonhtml += '</div>';
            buttonhtml += '<div class="pay_hide_bar"><i></i></div>';
        }

        buttonhtml += '<input type="button" class="pay-button" value="支付宝充值">';
        $("#button-container").html(buttonhtml);

        $(".pay_hide_bar").click(function(event) {
            if ($(this).hasClass("cur")) {
                $(".hide-banks").hide();
                $(this).removeClass("cur");
            } else {
                $(".hide-banks").show();
                $(this).addClass("cur");
            }
        });

        $("#choice-bank .choice-bank-list").click(function(e) {
            $("#choice-bank .choice-bank-list").removeClass('cur');
            $(this).addClass("cur");
            _this.bank = $(this).attr("bank-id");
        });

        $(".pay-button").click(function(e) {
            if (!_this.bank) {
                PAY.dialog("提示", "请选择银行");
                return false;
            }
            _this.checkpay();
        });
    };

    //根据不同选择内容进行不同支付操作
    alipaybank.checkpay = function() {
        var _this = this;

        $("#hideParam input[name='channel']").val("alipaybank");

        _this.data = PAY.setData();

        var data = _this.data;
        if (!data) {
            return false;
        }
        data.bank = _this.bank;
        var checkUrl = PAY.getCheckUrl();
        if (!checkUrl) {
            return false;
        }

        if (PAY.paying == 1) {
            return false;
        } else {
            PAY.paying = 1;
        }

        var timestamp = Date.parse(new Date());
        _this.payTargetName = "targetName_" + timestamp;
        if (PAY.funType == "mini") {
            _this.payTarget = PAY.openNewWindow("", _this.payTargetName);
        } else {
            _this.payTarget = window.open("", _this.payTargetName);
        }

        $.post(checkUrl, data, function(obj) {
            if (obj.code == 0) {
                _this.data = $.extend({}, _this.data, obj.data);
                _this.gopay();
                //PAY.success("X币支付");
            } else {
                _this.payTarget.close();
                PAY.dialog("充值失败", obj.msg);
                PAY.paying = 0;
            }
        }, "json");
    }

    alipaybank.gopay = function() {

        var _this = this;

        var data = this.data;
        if (!data) {
            PAY.paying = 0;
            return false;
        }

        delete data.tradeid;
        delete data.orderid;

        if (PAY.funType == "web") {
            var callback = function() {
                location.href = location.href
            }
        } else if (PAY.funType == "mini") {
            var callback = function() {
                if (typeof window.CppCall == "function" && _this.from == "vrgame") {
                    window.CppCall('common', 'close', null);
                } else {
                    var msg = {
                        call: "closePay"
                    };
                    window.messenger.targets["gameCon"].send(JSON.stringify(msg));
                }
            }
        }

        var obj = {
            success: "确认充值成功",
            cancel: "付款遇到问题",
            sucCallback: callback
        }

        var url = urlconfig.pay + "/index.php?action=" + PAY.channels.alipaybank.action.form + "&resource_id=1282160";

        PAY.dialog("您确认要付款吗？", "付款完成前请不要关闭或者刷新此窗口。<br />完成付款后请根据您的情况点击下面的按钮。", obj);

        PAY.formSubmit(data, url, _this.payTargetName);
        PAY.paying = 0;
    }

    alipaybank[PAY.funType + "_init"]();

})(jQuery, PayFun);