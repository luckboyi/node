(function($, PAY) {

    var urlconfig = PAY.urlconfig;

    var alipay = {};

    //初始化阿里支付模块
    alipay.mini_init = function() {

        var _this = this;

        _this.method = "scan";

        var buttonhtml = '<div class="pay-now show">';
        buttonhtml += '  <span class="hot1 submit_btn cud" href="javascript:;" id="payBtn">立即购买</span>';
        buttonhtml += '</div>';
        $("#button-container").html(buttonhtml);

        PAY.fn.scrollbar.update();

        $("#payBtn").click(function(e) {
            _this.checkpay();
        });
    };

    alipay.web_init = function() {

        var _this = this;

        //生成支付按钮,待整合到pay中
        var buttonhtml = '<input type="button" class="pay-button" method="scan" value="手机扫码支付">';
        buttonhtml += ' <input type="button" value="登录支付宝账号" method="form" class="pay-button">';

        $("#button-container").html(buttonhtml);

        $(".pay-button").click(function(e) {

            _this.method = $(this).attr("method");

            _this.checkpay();

        });
    };

    //根据不同选择内容进行不同支付操作
    alipay.checkpay = function() {
        var _this = this;

        if (_this.method == "scan") {
            $("#hideParam input[name='channel']").val("alipayscanvr");
        } else {
            $("#hideParam input[name='channel']").val("alipayvr");
        }

        _this.data = PAY.setData();

        var data = _this.data;
        if (!data) {
            return false;
        }

        var checkUrl = PAY.getCheckUrl();
        if (!checkUrl) {
            return false;
        }

        if (PAY.paying == 1) {
            return false;
        } else {
            PAY.paying = 1;
        }
        if (_this.method == "form") {
            var timestamp = Date.parse(new Date());
            _this.payTargetName = "targetName_" + timestamp;
            if (PAY.funType == "mini") {
                _this.payTarget = PAY.openNewWindow("", _this.payTargetName);
            } else {
                _this.payTarget = window.open("", _this.payTargetName);
            }
        }
        $.post(checkUrl, data, function(obj) {
            if (obj.code == 0) {
                _this.data = $.extend({}, _this.data, obj.data);
                _this.gopay();
                //PAY.success("X币支付");
            } else {
                if (_this.method == "form") {
                    _this.payTarget.close();
                }
                PAY.dialog("充值失败", obj.msg);
                PAY.paying = 0;
            }
        }, "json");
    }

    alipay.gopay = function() {

        var _this = this;

        var data = this.data;
        if (!data) {
            PAY.paying = 0;
            return false;
        }

        delete data.tradeid;
        delete data.orderid;

        var url = urlconfig.pay + "/index.php?action=" + PAY.channels.alipay.action[_this.method] + "&resource_id=1282160";

        if (_this.method == "scan") {
            $.post(url, data, function(obj) {
                if (obj.ret == 0) {
                    $("#payFrame").attr("src", obj.msg);
                    $("#payFrameCon").show();
                    //$("body").html("<div style='color:#fff; text-align:center; font-size:20px; margin-top:100px;'>充值完成后，请在游戏中查询充值结果</div>");
                } else {
                    if (_this.method == "form") {
                        _this.payTarget.close();
                    }
                    PAY.dialog("充值失败", obj.msg);
                }

                PAY.paying = 0;

            }, "json");
        } else if (_this.method == "form") {
            PAY.formSubmit(data, url, _this.payTargetName);
            PAY.paying = 0;
        }
    }

    alipay[PAY.funType + "_init"]();

})(jQuery, PayFun);