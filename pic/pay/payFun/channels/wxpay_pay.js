(function($, PAY) {

    var urlconfig = PAY.urlconfig;

    var wxpay = {};

    /**
     * mini支付初始化
     */
    wxpay.mini_init = function() {
        var _this = this;

        var buttonhtml = '<div class="pay-now show">';
        buttonhtml += '  <span class="hot1 submit_btn cud" href="javascript:;" id="payBtn">立即购买</span>';
        buttonhtml += '</div>';
        $("#button-container").html(buttonhtml);

        PAY.fn.scrollbar.update();

        $("#payBtn").click(function(e) {
            _this.checkpay();
        });
    };

    /**
     * 平台支付初始化
     */
    wxpay.web_init = function() {

        var _this = this;

        //生成支付按钮,待整合到pay中
        var buttonhtml = '<input type="button" id="payBtn" value="微信支付">';

        $("#button-container").html(buttonhtml);

        $("#payBtn").click(function(e) {
            _this.checkpay();
        });
    };

    /**
     * 检查参数
     */
    wxpay.checkpay = function() {
        var _this = this;

        $("#hideParam input[name='channel']").val("wxshenzhoufumergevr");
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

        $.post(checkUrl, data, function(obj) {
            if (obj.code == 0) {
                _this.data = $.extend({}, _this.data, obj.data);
                _this.gopay();
                //PAY.success("X币支付");
            } else {
                PAY.dialog("充值失败", obj.msg);
                PAY.paying = 0;
            }
        }, "json");
    }

    /**
     * 提交支付
     */
    wxpay.gopay = function() {

        var _this = this;

        var data = this.data;
        if (!data) {
            PAY.paying = 0;
            return false;
        }

        delete data.tradeid;
        delete data.orderid;

        var url = urlconfig.pay + "/index.php?action=" + PAY.channels.wxpay.action.scan + "&resource_id=1282160";

        $.post(url, data, function(obj) {
            if (obj.ret == 0) {
                $("#payFrame").attr("src", obj.msg);
                $("#payFrameCon").show();
                //$("body").html("<div style='color:#fff; text-align:center; font-size:20px; margin-top:100px;'>充值完成后，请在游戏中查询充值结果</div>");
            } else {
                PAY.dialog("充值失败", obj.msg);
            }

            PAY.paying = 0;

        }, "json");
    }

    wxpay[PAY.funType + "_init"]();
})(jQuery, PayFun);