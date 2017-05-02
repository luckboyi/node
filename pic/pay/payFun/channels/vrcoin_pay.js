(function($, PAY) {

    var urlconfig = PAY.urlconfig;

    var vrcoin = {};

    vrcoin.mini_init = function() {
        var _this = this;
        _this.from = $("input[name='from']").val();
        //生成支付按钮,待整合到pay中
        var buttonhtml = '<div class="pay-now show">';
        buttonhtml += '  <span class="hot1 submit_btn cud" href="javascript:;" id="payBtn">立即购买</span>';
        buttonhtml += '</div>';
        $("#button-container").html(buttonhtml);

        PAY.fn.scrollbar.update();

        $("#payBtn").click(function(e) {
            $("#hideParam input[name='channel']").val("vrcoin");
            _this.data = PAY.setData();
            if (!_this.data) {
                return false;
            }
            _this.gopay();
        });
    };

    vrcoin.web_init = function() {

        var _this = this;

        //生成支付按钮,待整合到pay中
        var buttonhtml = '<input type="button" class="cur" id="payBtn" value="立即支付">';

        $("#button-container").html(buttonhtml);

        $("#payBtn").click(function(e) {

            $("#hideParam input[name='channel']").val("vrcoin");
            _this.data = PAY.setData();
            if (!_this.data) {
                return false;
            }

            if (PAY.paying == 1) {
                return false;
            } else {
                PAY.paying = 1;
            }

            _this.gopay();
        });
    };

    vrcoin.gopay = function() {
        var _this = this;
        var data = this.data;
        if (!data) {
            return false;
        }

        $.post(urlconfig.payCheck + "/buy/buygame", data, function(obj) {
            if (typeof PAY.fn.payCallBack == "function") {
                PAY.fn.payCallBack(obj);
            }

            var dialogObj = {};
            if (PAY.funType == "mini") {
                dialogObj.sucCallback = function() {
                    if (typeof window.CppCall == "function" && _this.from == "vrgame") {
                        window.CppCall('common', 'close', null);
                    } else {
                        var msg = {
                            call: "closePay"
                        };
                        window.messenger.targets["gameCon"].send(JSON.stringify(msg));
                    }
                };
                dialogObj.erroCallback = dialogObj.sucCallback;
            } else {
                dialogObj.sucCallback = function() {
                    location.href = location.href;
                };
                dialogObj.success = "继续充值";
                dialogObj.btnState = 1;
            }
            if (obj.code == 0) {
                var money = data.money - data.pay_total * data.pay_rate;
                $(".balance_num").text(money);
                $("#hideParam input[name='money']").val(money);

                PAY.dialog("充值成功", "恭喜充值成功", dialogObj);
                //$("body").html("<div style='color:#fff; text-align:center; font-size:20px; margin-top:100px;'>充值完成后，请在游戏中查询充值结果</div>");
            } else {
                PAY.dialog("充值失败", obj.msg, dialogObj);
            }

            PAY.paying = 0;

        }, "json");
    }

    vrcoin[PAY.funType + "_init"]();

})(jQuery, PayFun);